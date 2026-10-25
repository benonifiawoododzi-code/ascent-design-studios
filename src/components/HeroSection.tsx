import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
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
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-charcoal lg:min-h-[92svh]">
        <Image
          src="/images/services-hero.jpg"
          alt="Dining room with a black table, grey chairs, a stone-clad stair, and a view through to a timber-lined living space."
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/60 to-transparent" />
        <Container className="relative z-10 pt-28 pb-10 md:pb-14 lg:pb-16">
          <div className="max-w-3xl text-ivory">
            <p className="rise eyebrow text-ivory/80">Interior architecture & design</p>
            <h1 className="rise rise-1 mt-5 max-w-[12ch] font-serif text-[clamp(3.1rem,7.4vw,7.4rem)] font-light text-ivory">
              Spaces that
              <br />
              move you.
            </h1>
            <p className="rise rise-2 mt-6 max-w-md text-base leading-relaxed text-ivory/90 md:text-lg">
              Thoughtful interiors. Timeless materials. A considered approach to contemporary living.
            </p>
            <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects" variant="light">
                Explore our work
              </Button>
              <Button href="/contact" variant="ghost" className="border-ivory text-ivory hover:bg-ivory/10">
                Start a project
              </Button>
            </div>
            <a
              href="#approach"
              className="rise rise-4 mt-12 inline-flex items-center gap-4 text-[0.68rem] tracking-[0.22em] text-ivory/80 uppercase"
            >
              <span className="scroll-line" aria-hidden="true" />
              Scroll
            </a>
          </div>
        </Container>
      </section>
    );
  }

  const image = props.image;

  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-charcoal md:min-h-[78svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="hero-media object-cover"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-charcoal/55 to-transparent" />
      <div className="relative flex min-h-[70svh] items-end md:min-h-[78svh]">
        <Container className="pt-32 pb-12 lg:pb-16">
          <div className="max-w-3xl text-ivory">
            <p className="eyebrow text-ivory/75">{props.eyebrow}</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6.6rem)] font-light text-ivory">{props.title}</h1>
            {props.variant === "page" && props.description && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">{props.description}</p>
            )}
            {props.variant === "project" && (
              <p className="mt-5 text-[0.75rem] tracking-[0.16em] text-ivory/85 uppercase">{props.meta}</p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
