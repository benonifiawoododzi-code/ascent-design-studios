import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interiors, commercial interiors, and hospitality design by Studio Phoenix. Scope is confirmed for each project.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${siteConfig.name}`,
    description:
      "Residential, commercial, and hospitality interiors. Scope and deliverables are confirmed for each project.",
    images: [{ url: "/images/form-3.jpg", alt: "Living room with pale sofas, a timber stair, and tall windows." }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        variant="page"
        eyebrow="Services"
        title="Interiors with a clear purpose."
        description="Three areas of work, one way of designing. Layout, material, and use are resolved together."
        image={{
          src: "/images/form-3.jpg",
          alt: "Living room with pale sofas, a timber stair, and tall windows along one side.",
        }}
      />
      <Container className="py-16 md:py-24">
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          {siteConfig.name} designs residential, commercial, and hospitality interiors. The lists on this
          page describe work the studio can offer. What is included in a commission is confirmed in writing.
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
        title="Let's create something meaningful."
        description="Tell us about the space, and we can explore whether the studio is the right fit."
        href="/contact"
        label="Start a project"
        image={{
          src: "/images/atelier-2.jpg",
          alt: "Meeting room with a timber table, pink chairs, and tall industrial windows.",
        }}
      />
    </>
  );
}
