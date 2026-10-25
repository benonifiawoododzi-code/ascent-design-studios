import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/content";

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const others = projects.filter((project) => project.slug !== slug);
  const sameCategory = others.filter((project) => project.category === current.category);
  const rest = others.filter((project) => project.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

export function getComparisonProject() {
  return projects.find((project) => project.beforeAfter);
}

export function hasSampleProjects() {
  return projects.some((project) => project.sample);
}
