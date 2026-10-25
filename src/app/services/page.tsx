import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { services } from "@/data/services";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Residential, commercial, and hospitality interior design by Ascent Design Studios. Scope and deliverables are confirmed for each project.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services — Ascent Design Studios",
    description:
      "Residential, commercial, and hospitality interior design. Scope and deliverables are confirmed for each project.",
    images: [{ url: "/images/form-1.jpg", alt: "Dusk view of a timber and glass house." }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        variant="page"
        eyebrow="Our Services"
        title="Interiors with a clear purpose."
        description="Three practices, one way of working. Layout, material, and use are resolved together."
        image={{
          src: "/images/form-1.jpg",
          alt: "Dusk view of a timber and glass house, with the dining room visible through the glazing.",
        }}
      />
      <Container className="py-16 md:py-24">
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          Ascent Design Studios designs residential, commercial, and hospitality spaces. The lists
          on this page are editable descriptions of the work the studio can offer. What is included
          in a commission is confirmed in writing.
        </p>
        {services.map((service, index) => (
          <ServiceSection
            key={service.id}
            service={service}
            index={index + 1}
            reversed={index % 2 === 1}
            projects={getProjectsByCategory(service.category).slice(0, 3)}
          />
        ))}
      </Container>
      <CallToAction
        title="Let's Create Something Exceptional."
        description="Tell us about the space, and we can explore whether the studio is the right fit."
        href="/contact"
        label="Book a Consultation"
        image={{
          src: "/images/form-3.jpg",
          alt: "Living room with pale sofas, a timber stair, and tall windows along one side.",
        }}
      />
    </>
  );
}
