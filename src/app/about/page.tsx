import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { TextLink } from "@/components/TextLink";
import { principles } from "@/data/principles";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Studio Phoenix designs interiors through architecture, material, and the way people live. An approach shaped by intention.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description:
      "An approach shaped by intention. Studio Phoenix designs through listening, material, and spatial clarity.",
    images: [
      {
        url: "/images/form-1.jpg",
        alt: "Dusk view of a timber and glass house, with the dining room visible through the glazing.",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        variant="page"
        eyebrow="The studio"
        title="An approach shaped by intention."
        description="Thoughtful interiors, edited until architecture, material, and daily life agree."
        image={{
          src: "/images/form-1.jpg",
          alt: "Dusk view of a timber and glass house, with the dining room visible through the glazing.",
        }}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow text-walnut">Introduction</p>
              <h2 className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.8rem)]">A studio concerned with how rooms feel in use.</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed">
                <p>
                  {siteConfig.name} is a design-led interior studio. The work is concerned with how a room is
                  planned, how materials meet, and how a space feels in ordinary use — at breakfast, in a
                  meeting, or at the end of a long day.
                </p>
                <p>
                  {siteConfig.statement} The practice begins with the brief and the architecture already
                  present, then edits toward clarity.
                </p>
                <p className="text-sm leading-relaxed text-walnut">
                  A fuller studio history will be published when the practice supplies it. This page does not
                  state a founding year, a client list, or awards.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-stone lg:col-span-6 lg:col-start-7">
              <Image
                src="/images/solace-1.jpg"
                alt="Living room with a grey sofa, leather chairs, timber flooring, and tall windows."
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[5/4] bg-stone lg:col-span-7">
              <Image
                src="/images/atelier-2.jpg"
                alt="Meeting room with a timber table, pink chairs, and tall industrial windows."
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="eyebrow text-walnut">Collaboration</p>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,3.5vw,3.4rem)]">Listening is part of the design.</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed">
                <p>
                  Projects develop in conversation with the client and, where the scope requires it, with the
                  architects, makers, and contractors already involved. The studio’s role is to give the
                  interior a clear direction and to hold that direction through the decisions that follow.
                </p>
                <p>
                  Responsibility stays within the design scope agreed for that project. Nothing on this site
                  promises construction, procurement, or site management unless it is written into a proposal.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-muted py-20 text-ivory md:py-28">
        <Container>
          <p className="eyebrow text-ivory/60">Creative principles</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,4vw,4rem)] text-ivory">
            Three ideas guide every study.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-ivory/20 pt-6">
                <p className="font-serif text-3xl text-taupe">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl text-ivory">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/80">{principle.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow text-walnut">Material and space</p>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,3.5vw,3.4rem)]">
                Proportion first. Decoration after.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed">
                <p>
                  A plan should make daily life easier to read: where to arrive, where to gather, and where to
                  withdraw. Sequence and proportion come before objects.
                </p>
                <p>
                  Materials are chosen for how they age, how they feel, and how they sit together in light.
                  Stone, timber, plaster, textile, and metal are edited until the room has depth without noise.
                </p>
              </div>
              <TextLink href="/services" className="mt-8">
                View services
              </TextLink>
            </div>
            <div className="relative aspect-[4/5] bg-stone lg:col-span-6 lg:col-start-7">
              <Image
                src="/images/form-4.jpg"
                alt="Kitchen with charcoal cabinetry, marble counters, timber shelves, and a window above the sink."
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="max-w-3xl border border-line px-6 py-12 md:px-12 md:py-16">
            <p className="eyebrow text-walnut">Team</p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.6rem)]">People, when the studio is ready to name them.</h2>
            <p className="mt-6 text-base leading-relaxed">
              Profiles of the people who lead the studio will be added when names, roles, and biographies are
              supplied. This website does not invent a founder, qualifications, or years of practice.
            </p>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Let's create something meaningful."
        description="If you have a space in mind, the next step is a conversation."
        href="/contact"
        label="Start a project"
        image={{
          src: "/images/haven-1.jpg",
          alt: "Hotel bedroom in warm timber, with a low platform bed and doors opening to a planted court.",
        }}
      />
    </>
  );
}
