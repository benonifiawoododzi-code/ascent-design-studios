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
  const meta = [project.category, project.location, project.year, project.sample ? "Sample" : null]
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
            sizes="(min-width: 1024px) 46vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: project.cover.objectPosition ?? "center" }}
          />
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-[clamp(1.7rem,2vw,2.15rem)] leading-none">{project.title}</h3>
            <p className="mt-2 text-[0.72rem] tracking-[0.14em] text-walnut uppercase">{meta}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 pb-1 text-[0.68rem] tracking-[0.16em] text-walnut uppercase transition-all duration-300 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
            View
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
              <path d="M3 9h12M11 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
