import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import { DesignPhilosophy } from "@/components/home/DesignPhilosophy";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StudioIntroduction } from "@/components/home/StudioIntroduction";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { siteConfig } from "@/data/site";
import { getComparisonProject } from "@/lib/projects";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const comparison = getComparisonProject();

  return (
    <>
      <HeroSection variant="home" />
      <StudioIntroduction />
      <FeaturedProjects />
      <ServicesPreview />
      <DesignPhilosophy />

      <section className="border-t border-line py-20 md:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-walnut">Our process</p>
              <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)]">
                From first conversation to final detail.
              </h2>
            </div>
            <div className="mt-14 lg:mt-20">
              <ProcessTimeline />
            </div>
          </Reveal>
        </Container>
      </section>

      {comparison?.beforeAfter && (
        <section className="border-t border-line py-20 md:py-28 lg:py-36">
          <Container>
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-walnut">Transformation</p>
                <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)]">Transformation through design.</h2>
              </div>
              <div className="mt-12">
                <BeforeAfterSlider
                  before={comparison.beforeAfter.before}
                  after={comparison.beforeAfter.after}
                  demonstration={comparison.beforeAfter.demonstration}
                  note={comparison.beforeAfter.note}
                />
              </div>
              <Link
                href={`/projects/${comparison.slug}`}
                className="link-underline mt-8 inline-flex min-h-11 items-center text-[0.72rem] tracking-[0.16em] uppercase"
              >
                View the {comparison.title} study
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      <TestimonialsSection />

      <CallToAction
        title="Let's create something meaningful."
        description="Have a space in mind? Tell us what you're envisioning, and let's begin the conversation."
        href="/contact"
        label="Start a project"
        image={{
          src: "/images/stone-1.jpg",
          alt: "Dusk photograph of a dark metal and timber house, with a lit entry and stone at the base.",
        }}
      />
    </>
  );
}
