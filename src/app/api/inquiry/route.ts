import { NextResponse } from "next/server";
import { inquiryOptions, siteConfig } from "@/data/site";
import { isInquiryDeliveryConfigured } from "@/lib/delivery";
import { inquirySpamReason, optionalChoice, readInquiry, validateInquiry } from "@/lib/inquiry";

const hits = new Map<string, { count: number; reset: number }>();

function clientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) return "unknown";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

function isLimited(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  if (isLimited(clientAddress(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many inquiries were sent from this connection. Your latest message was not sent." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "The inquiry could not be read. Your message was not sent." },
      { status: 400 },
    );
  }

  const inquiry = readInquiry(body);
  if (!inquiry || inquirySpamReason(inquiry)) {
    return NextResponse.json(
      { ok: false, error: "This submission could not be accepted. Your message was not sent." },
      { status: 400 },
    );
  }

  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!isInquiryDeliveryConfigured()) {
    const error = siteConfig.email
      ? `The inquiry form is not connected to a delivery service yet, so this message was not sent. You can email the studio at ${siteConfig.email}.`
      : "The inquiry form is not connected to a delivery service yet, so this message was not sent.";
    return NextResponse.json({ ok: false, error }, { status: 503 });
  }

  const size = optionalChoice(inquiry.size, inquiryOptions.sizes);
  const budget = optionalChoice(inquiry.budget, inquiryOptions.budgets);
  const contactMethod = optionalChoice(inquiry.contactMethod, inquiryOptions.contactMethods);
  const safeName = inquiry.fullName.replace(/[\r\n]/g, " ");

  const text = [
    "New project inquiry for Ascent Design Studios",
    "",
    `Name: ${safeName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Category: ${inquiry.category}`,
    `Location: ${inquiry.location}`,
    `Approximate size: ${size || "Not provided"}`,
    `Estimated budget: ${budget || "Not provided"}`,
    `Expected start: ${inquiry.startDate || "Not provided"}`,
    `Preferred contact: ${contactMethod || "Not provided"}`,
    "",
    "Project description:",
    inquiry.description,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.STUDIO_INQUIRY_EMAIL],
        reply_to: inquiry.email,
        subject: `Project inquiry from ${safeName}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Inquiry delivery failed", response.status);
      return NextResponse.json(
        { ok: false, error: "The inquiry could not be delivered. Your message was not sent. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Inquiry delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "The inquiry could not be delivered. Your message was not sent. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
