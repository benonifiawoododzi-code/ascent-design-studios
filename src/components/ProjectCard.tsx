import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
};

export function ProjectCard({
  project,
  aspect = "portrait",
  priority = false,
}: {
  project: Project;
  aspect?: keyof typeof aspects;
  priority?: boolean;
}) {
  const meta = [project.category, project.sample ? "Sample" : null, project.location, project.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-stone ${aspects[aspect]}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: project.cover.objectPosition ?? "center" }}
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <div>
            <h3 className="font-serif text-[1.7rem] leading-none">{project.title}</h3>
            <p className="mt-2 text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/75">{meta}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
