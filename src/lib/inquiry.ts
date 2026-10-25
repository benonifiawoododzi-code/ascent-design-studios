import { inquiryOptions } from "@/data/site";

export type InquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  size: string;
  budget: string;
  startDate: string;
  description: string;
  contactMethod: string;
  consent: boolean;
  companyWebsite: string;
  renderedAt: number;
};

export type InquiryErrors = Partial<
  Record<"fullName" | "email" | "phone" | "category" | "location" | "description" | "consent", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,40}$/;

export function emptyInquiry(): InquiryPayload {
  return {
    fullName: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    size: "",
    budget: "",
    startDate: "",
    description: "",
    contactMethod: "",
    consent: false,
    companyWebsite: "",
    renderedAt: 0,
  };
}

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function readInquiry(value: unknown): InquiryPayload | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const renderedAt = typeof input.renderedAt === "number" && Number.isFinite(input.renderedAt) ? input.renderedAt : 0;
  return {
    fullName: asText(input.fullName, 120),
    email: asText(input.email, 200),
    phone: asText(input.phone, 40),
    category: asText(input.category, 80),
    location: asText(input.location, 160),
    size: asText(input.size, 80),
    budget: asText(input.budget, 80),
    startDate: asText(input.startDate, 40),
    description: asText(input.description, 4000),
    contactMethod: asText(input.contactMethod, 40),
    consent: input.consent === true,
    companyWebsite: asText(input.companyWebsite, 200),
    renderedAt,
  };
}

export function validateInquiry(input: InquiryPayload): InquiryErrors {
  const errors: InquiryErrors = {};

  if (input.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!input.email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (input.phone && !phonePattern.test(input.phone)) {
    errors.phone = "Enter a valid phone number, or leave this blank.";
  }
  if (!inquiryOptions.categories.includes(input.category as (typeof inquiryOptions.categories)[number])) {
    errors.category = "Select a project type.";
  }
  if (input.location.length < 2) {
    errors.location = "Please tell us where the project is.";
  }
  if (input.description.length < 20) {
    errors.description = "Describe the project in at least a sentence.";
  }
  if (!input.consent) {
    errors.consent = "Please confirm that you understand how this form handles your inquiry.";
  }

  return errors;
}

export function optionalChoice(value: string, options: readonly string[]) {
  return options.includes(value) ? value : "";
}

export function inquirySpamReason(input: InquiryPayload) {
  if (input.companyWebsite) return "rejected";
  const elapsed = Date.now() - input.renderedAt;
  if (!input.renderedAt || elapsed < 1500 || elapsed > 1000 * 60 * 60 * 12) return "rejected";
  return null;
}
