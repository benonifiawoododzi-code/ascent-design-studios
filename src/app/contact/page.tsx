import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ContactDetails } from "@/components/ContactDetails";
import { Container } from "@/components/Container";
import { siteConfig } from "@/data/site";
import { isInquiryDeliveryConfigured } from "@/lib/delivery";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Studio Phoenix about your space and begin a project conversation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: "Every project starts with a conversation. Share a little about your ideas.",
  },
};

export default function ContactPage() {
  const deliveryConfigured = isInquiryDeliveryConfigured();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow text-walnut">Contact</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)]">Tell us about your space.</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed">
              Every project starts with a conversation. Share a little about your ideas, and let&apos;s explore
              the possibilities.
            </p>
            <div className="mt-10">
              <ContactDetails />
            </div>
          </div>
          <div id="inquiry" className="scroll-mt-32 lg:col-span-7">
            <Suspense fallback={<p className="text-sm">Loading the inquiry form…</p>}>
              <ConsultationForm deliveryConfigured={deliveryConfigured} />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
