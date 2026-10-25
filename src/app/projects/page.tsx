import type { Metadata } from "next";
import { Suspense } from "react";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { hasSampleProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential, commercial, and hospitality interiors by Ascent Design Studios. Projects marked Sample are illustrative placeholders.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Ascent Design Studios",
    description:
      "An image-led portfolio of interiors. Entries marked Sample are illustrative placeholders.",
    images: [{ url: "/images/form-3.jpg", alt: "Living room with pale sofas and a timber stair." }],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <HeroSection
        variant="page"
        eyebrow="Projects"
        title="Selected work."
        description="Residential, commercial, and hospitality interiors, edited as an image-led portfolio."
        image={{
          src: "/images/form-3.jpg",
          alt: "Living room with pale sofas, a timber stair, and tall windows along one side.",
        }}
      />
      <section className="py-16 md:py-24">
        <Container>
          {hasSampleProjects() && (
            <p className="mb-10 max-w-2xl text-sm leading-relaxed">
              Projects marked Sample are illustrative placeholders for layout and storytelling.
              Replace them in the project content when studio work is ready to publish.
            </p>
          )}
          <Suspense fallback={<ProjectGrid projects={projects} />}>
            <ProjectBrowser projects={projects} />
          </Suspense>
        </Container>
      </section>
      <CallToAction
        title="Let's Create Something Exceptional."
        description="Have a space in mind? Tell us about your project, and let's explore how thoughtful design can transform it."
        href="/contact"
        label="Book a Consultation"
        image={{
          src: "/images/haven-1.jpg",
          alt: "Hotel bedroom in warm timber, with doors opening to a planted court.",
        }}
      />
    </>
  );
}
