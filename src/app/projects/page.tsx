import type { Metadata } from "next";
import { Suspense } from "react";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { ProjectGrid } from "@/components/ProjectGrid";
import { siteConfig } from "@/data/site";
import { getAllProjects, hasSampleProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "An editorial portfolio of residential, commercial, and hospitality interiors. Projects marked Sample are illustrative placeholders.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description: "An image-led portfolio of interiors. Entries marked Sample are illustrative placeholders.",
    images: [{ url: "/images/intro.jpg", alt: "Open living room with a timber feature wall and a view to the terrace." }],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="pt-32 pb-6 md:pt-40">
        <Container>
          <p className="eyebrow text-walnut">Portfolio</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,6vw,5.6rem)]">Selected work.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed">
            Residential, commercial, and hospitality interiors, edited as an image-led portfolio.
          </p>
          {hasSampleProjects() && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-walnut">
              Projects marked Sample are illustrative placeholders. Replace them in the project content when
              studio work is ready to publish. Locations in those studies are part of the sample narrative.
            </p>
          )}
        </Container>
      </section>
      <section className="pb-20 md:pb-28">
        <Container>
          <Suspense fallback={<ProjectGrid projects={projects} />}>
            <ProjectBrowser projects={projects} />
          </Suspense>
        </Container>
      </section>
      <CallToAction
        title="Let's create something meaningful."
        description="Have a space in mind? Tell us what you're envisioning, and let's begin the conversation."
        href="/contact"
        label="Start a project"
        image={{
          src: "/images/courtyard-1.jpg",
          alt: "Restaurant dining room with dark timber floors, black chairs, and brass screens.",
        }}
      />
    </>
  );
}
