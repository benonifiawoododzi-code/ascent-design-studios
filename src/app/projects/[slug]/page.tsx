import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getAdjacentProjects, getProject, getRelatedProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const title = project.sample ? `${project.title} (Sample)` : project.title;
  const description = project.sample ? `Illustrative sample. ${project.excerpt}` : project.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      images: [{ url: project.hero.src, alt: project.hero.alt }],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[70svh] bg-charcoal" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const { previous, next } = getAdjacentProjects(project.slug);
  const meta = [
    project.sample ? "Sample project" : null,
    project.category,
    project.location,
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  const specs = [
    { label: "Project type", value: project.category },
    { label: "Location", value: project.location },
    { label: "Project area", value: project.area },
    { label: "Completion", value: project.year },
    { label: "Services", value: project.services.length ? project.services.join(", ") : undefined },
  ].filter((item) => item.value);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.sample ? `Illustrative sample. ${project.excerpt}` : project.excerpt,
    image: `${siteConfig.url}${project.hero.src}`,
    url: `${siteConfig.url}/projects/${project.slug}`,
    creator: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <HeroSection variant="project" eyebrow="Project" title={project.title} meta={meta} image={project.hero} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[0.72rem] tracking-[0.22em] uppercase">Project overview</p>
              <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">{project.brief}</p>

              <h2 className="mt-12 font-serif text-3xl">Client objectives</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                {project.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="mt-12 font-serif text-3xl">Design concept</h2>
              <p className="mt-4 text-base leading-relaxed">{project.concept}</p>

              <h2 className="mt-12 font-serif text-3xl">Challenges and solutions</h2>
              <div className="mt-4 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-[0.68rem] tracking-[0.16em] uppercase">Challenges</h3>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                    {project.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[0.68rem] tracking-[0.16em] uppercase">Solutions</h3>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                    {project.solutions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="mt-12 font-serif text-3xl">Materials and finishes</h2>
              <ul className="mt-4 divide-y divide-stone border-y border-stone">
                {project.materials.map((item) => (
                  <li key={item} className="py-3 text-sm">
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-serif text-3xl">Spatial planning</h2>
              <p className="mt-4 text-base leading-relaxed">{project.spatialApproach}</p>
            </div>

            {specs.length > 0 && (
              <aside className="lg:col-span-4 lg:col-start-9">
                <div className="border-t border-stone lg:sticky lg:top-28">
                  <h2 className="pt-6 font-serif text-3xl">Specifications</h2>
                  <dl className="mt-6 space-y-5">
                    {specs.map((item) => (
                      <div key={item.label}>
                        <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/70">{item.label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {project.sample && (
                    <p className="mt-8 text-sm leading-relaxed">
                      Illustrative sample for the portfolio template. Location and narrative are not a
                      record of a completed commission.
                    </p>
                  )}
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="mb-8 font-serif text-[clamp(2.2rem,4vw,3.5rem)]">Gallery</h2>
          <ProjectGallery images={project.gallery} />
        </Container>
      </section>

      {project.beforeAfter && (
        <section className="border-t border-stone py-16 md:py-24">
          <Container>
            <h2 className="mb-8 font-serif text-[clamp(2.2rem,4vw,3.5rem)]">Before and after</h2>
            <BeforeAfterSlider
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              demonstration={project.beforeAfter.demonstration}
              note={project.beforeAfter.note}
            />
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-stone py-16 md:py-24">
          <Container>
            <h2 className="mb-10 font-serif text-[clamp(2.2rem,4vw,3.5rem)]">Related projects</h2>
            <ProjectGrid projects={related} />
          </Container>
        </section>
      )}

      <nav aria-label="More projects" className="border-t border-stone">
        <Container className="grid gap-8 py-10 md:grid-cols-2">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="group">
              <span className="text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/70">Previous</span>
              <span className="mt-2 block font-serif text-3xl group-hover:text-olive">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group md:text-right">
              <span className="text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/70">Next</span>
              <span className="mt-2 block font-serif text-3xl group-hover:text-olive">{next.title}</span>
            </Link>
          )}
        </Container>
      </nav>

      <CallToAction
        title="Envisioning a Space of Your Own?"
        href="/contact"
        label="Start Your Project"
        image={{
          src: "/images/haven-1.jpg",
          alt: "Hotel bedroom in warm timber, with doors opening to a planted court.",
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
