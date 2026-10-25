import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/content";

const portfolioOrder = [
  "the-solace-residence",
  "the-form-house",
  "the-atelier",
  "the-haven-retreat",
  "terra-house",
  "the-courtyard-workspace",
  "the-linen-apartment",
  "the-courtyard-table",
];

function ordered(list: Project[]) {
  return [...list].sort((a, b) => {
    const ai = portfolioOrder.indexOf(a.slug);
    const bi = portfolioOrder.indexOf(b.slug);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
}

export function getAllProjects() {
  return ordered(projects);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return getAllProjects().filter((project) => project.category === category);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const others = getAllProjects().filter((project) => project.slug !== slug);
  const sameCategory = others.filter((project) => project.category === current.category);
  const rest = others.filter((project) => project.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getAdjacentProjects(slug: string) {
  const list = getAllProjects();
  const index = list.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function getComparisonProject() {
  return projects.find((project) => project.beforeAfter);
}

export function hasSampleProjects() {
  return projects.some((project) => project.sample);
}
