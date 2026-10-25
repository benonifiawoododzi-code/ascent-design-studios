import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ContactDetails } from "@/components/ContactDetails";
import { Container } from "@/components/Container";
import { isInquiryDeliveryConfigured } from "@/lib/delivery";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Ascent Design Studios about your interior project and request a consultation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const deliveryConfigured = isInquiryDeliveryConfigured();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[0.72rem] tracking-[0.22em] uppercase">Contact</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)]">Tell Us About Your Project.</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed">
              Every exceptional space begins with a conversation. Share your ideas, goals, and
              project requirements, and our team can explore the next steps with you.
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
