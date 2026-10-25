import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types/content";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-16",
  "lg:col-span-5",
  "lg:col-span-7 lg:mt-10",
];

const aspects = ["tall", "landscape", "portrait", "wide"] as const;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
      {projects.map((project, index) => (
        <li key={project.slug} className={`md:col-span-1 ${spans[index % spans.length]}`}>
          <ProjectCard
            project={project}
            aspect={aspects[index % aspects.length]}
            priority={index < 2}
          />
        </li>
      ))}
    </ul>
  );
}
