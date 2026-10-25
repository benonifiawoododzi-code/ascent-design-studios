import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ascent Design Studios handles project inquiries submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[0.72rem] tracking-[0.22em] uppercase">Privacy</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5rem)]">Privacy policy</h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed">
            <p>
              This note explains the project inquiry form on the {siteConfig.name} website. It is a
              working policy for the information the form collects. It should be reviewed before the
              site is published with live studio details.
            </p>
            <h2 className="pt-4 font-serif text-3xl">What the form collects</h2>
            <p>
              If you submit an inquiry, the form sends your name, email address, project category,
              project location, and project description. Phone number, project size, budget, expected
              start, and preferred contact method are included only if you choose to provide them.
            </p>
            <h2 className="pt-4 font-serif text-3xl">When a message is sent</h2>
            <p>
              A message is delivered only when an email service has been connected to the website. If
              that service is not configured, the form says so and does not claim that the inquiry
              was received. The site also rejects submissions that look automated.
            </p>
            <h2 className="pt-4 font-serif text-3xl">How the details are used</h2>
            <p>
              Inquiry details are used to respond about a possible project. They are not sold. The
              studio should keep them only as long as needed to answer the inquiry and meet its own
              record-keeping obligations. Retention depends on the email service the studio connects.
            </p>
            <h2 className="pt-4 font-serif text-3xl">Contact</h2>
            <p>
              {siteConfig.email
                ? `To ask about an inquiry you have sent, email ${siteConfig.email}.`
                : "A studio email address has not been published yet. Add it in the site settings before launch so people can reach the studio about their information."}
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
