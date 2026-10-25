import Image from "next/image";
import { Button } from "@/components/Button";
import type { StudioImage } from "@/types/content";

type HeroSectionProps =
  | { variant: "home" }
  | {
      variant: "page";
      eyebrow: string;
      title: string;
      description?: string;
      image: StudioImage;
    }
  | {
      variant: "project";
      eyebrow: string;
      title: string;
      meta: string;
      image: StudioImage;
    };

export function HeroSection(props: HeroSectionProps) {
  if (props.variant === "home") {
    return (
      <section className="relative flex h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
        <Image
          src="/images/services-hero.jpg"
          alt="Sunlit dining room with a black table, grey chairs, and a view through to a timber-lined living space."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-charcoal/55 to-transparent" />
        <div className="relative px-6 pt-28 pb-12 md:px-10 md:pb-16 lg:px-16">
          <div className="max-w-3xl text-ivory">
            <p className="ascend text-[0.72rem] tracking-[0.22em] uppercase text-ivory/80">
              Ascent Design Studios
            </p>
            <h1 className="ascend ascend-1 mt-4 max-w-4xl font-serif text-[clamp(2.8rem,6.4vw,6.1rem)] font-light text-ivory">
              Spaces Designed to Inspire.
            </h1>
            <p className="ascend ascend-2 mt-6 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">
              We create thoughtful, enduring interiors that balance architectural clarity, material
              richness, and the way people live.
            </p>
            <div className="ascend ascend-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects" variant="light">
                Explore Our Projects
              </Button>
              <Button href="/contact" variant="ghost" className="border-ivory text-ivory hover:bg-ivory/10">
                Start Your Project
              </Button>
            </div>
            <a
              href="#studio"
              className="ascend ascend-4 mt-12 inline-flex items-center gap-4 text-[0.68rem] tracking-[0.22em] uppercase text-ivory/80"
            >
              <span className="inline-block h-px w-10 bg-ivory/70" aria-hidden="true" />
              Scroll
            </a>
          </div>
        </div>
      </section>
    );
  }

  const image = props.image;
  const title = props.title;

  return (
    <section className="relative min-h-[78svh] bg-charcoal">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/50 to-transparent" />
      <div className="relative flex min-h-[78svh] items-end px-6 pb-14 pt-32 md:px-10 lg:px-16 lg:pb-16">
        <div className="max-w-3xl text-ivory">
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-ivory/80">{props.eyebrow}</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6.4rem)] font-light text-ivory">{title}</h1>
          {props.variant === "page" && props.description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">
              {props.description}
            </p>
          )}
          {props.variant === "project" && (
            <p className="mt-5 text-[0.72rem] tracking-[0.16em] uppercase text-ivory/85">{props.meta}</p>
          )}
        </div>
      </div>
    </section>
  );
}
