import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { scopeNote } from "@/data/site";
import type { Project, Service } from "@/types/content";

export function ServiceSection({
  service,
  projects,
  index,
  reversed = false,
}: {
  service: Service;
  projects: Project[];
  index: number;
  reversed?: boolean;
}) {
  return (
    <section id={service.id} className="scroll-mt-28 py-16 md:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={`relative aspect-[4/5] bg-stone lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="font-serif text-3xl text-olive">0{index}</p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,4vw,4rem)]">{service.pageTitle}</h2>
          <p className="mt-6 text-base leading-relaxed">{service.overview}</p>

          <h3 className="mt-10 font-serif text-2xl">What this service can cover</h3>
          <ul className="mt-4 divide-y divide-stone border-y border-stone">
            {service.covers.map((item) => (
              <li key={item} className="py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-serif text-2xl">Design considerations</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {service.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-10 font-serif text-2xl">Potential deliverables</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{scopeNote}</p>

          {projects.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-2xl">Relevant projects</h3>
              <ul className="mt-4 space-y-3">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="group block">
                      <span className="font-serif text-2xl group-hover:text-olive">{project.title}</span>
                      <span className="mt-1 block text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/70">
                        {project.sample ? "Sample · " : ""}
                        {project.category}
                        {project.location ? ` · ${project.location}` : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button href={`/contact?service=${service.id}`} className="mt-10">
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
