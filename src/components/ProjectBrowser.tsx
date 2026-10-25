"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectFilters } from "@/components/ProjectFilters";
import { ProjectGrid } from "@/components/ProjectGrid";
import type { Project } from "@/types/content";

const allowed = new Set(["all", "Residential", "Commercial", "Hospitality"]);

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requested = params.get("category") ?? "all";
  const active = allowed.has(requested) ? requested : "all";

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  function onChange(next: string) {
    const search = new URLSearchParams(params.toString());
    if (next === "all") search.delete("category");
    else search.set("category", next);
    const query = search.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div>
      <ProjectFilters active={active} onChange={onChange} />
      <div className="mt-12 md:mt-16">
        {filtered.length === 0 ? (
          <div className="border border-stone px-6 py-20 text-center">
            <p className="font-serif text-4xl">No projects in this category yet.</p>
            <button
              type="button"
              onClick={() => onChange("all")}
              className="mt-6 min-h-11 text-[0.72rem] tracking-[0.18em] uppercase"
            >
              View all projects
            </button>
          </div>
        ) : (
          <ProjectGrid projects={filtered} />
        )}
      </div>
    </div>
  );
}
