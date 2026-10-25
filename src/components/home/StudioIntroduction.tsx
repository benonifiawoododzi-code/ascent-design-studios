import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";

export function StudioIntroduction() {
  return (
    <section id="approach" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
      <Container>
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] bg-stone lg:col-span-7">
              <Image
                src="/images/intro.jpg"
                alt="Open living room with a grey sectional, a timber feature wall, and sliding doors to a terrace."
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="eyebrow text-walnut">Our approach</p>
              <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)]">Design begins with understanding.</h2>
              <p className="mt-6 text-base leading-relaxed">
                We believe exceptional interiors emerge from a thoughtful balance of architecture, function,
                materiality, and atmosphere. Every project begins with listening, develops through careful
                exploration, and takes shape through considered decisions.
              </p>
              <TextLink href="/about" className="mt-8">
                Discover the studio
              </TextLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
