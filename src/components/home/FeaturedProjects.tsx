import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";
import { getFeaturedProjects, hasSampleProjects } from "@/lib/projects";

const featuredLayout = [
  { span: "lg:col-span-7", aspect: "tall" as const },
  { span: "lg:col-span-5 lg:mt-28", aspect: "landscape" as const },
  { span: "lg:col-span-5", aspect: "portrait" as const },
  { span: "lg:col-span-7 lg:mt-20", aspect: "wide" as const },
  { span: "lg:col-span-6", aspect: "landscape" as const },
  { span: "lg:col-span-6 lg:mt-24", aspect: "tall" as const },
];

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="pb-20 md:pb-28 lg:pb-36">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-walnut">Selected work</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)]">Spaces, thoughtfully considered.</h2>
            {hasSampleProjects() && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-walnut">
                These studies are illustrative samples, prepared so the studio can replace them with its own
                projects. Each one is marked Sample. Locations describe the sample narrative, not a confirmed
                commission.
              </p>
            )}
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
            {featured.map((project, index) => {
              const layout = featuredLayout[index] ?? featuredLayout[0];
              return (
                <li key={project.slug} className={layout.span}>
                  <ProjectCard project={project} aspect={layout.aspect} priority={index === 0} />
                </li>
              );
            })}
          </ul>
          <TextLink href="/projects" className="mt-14">
            View all projects
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
