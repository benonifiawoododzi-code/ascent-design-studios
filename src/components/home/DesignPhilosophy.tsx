import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { principles } from "@/data/principles";

export function DesignPhilosophy() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <Container>
        <Reveal>
          <p className="eyebrow text-walnut">Philosophy</p>
          <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.7rem,5.4vw,5.2rem)]">
            Good design is not simply seen. It is experienced.
          </h2>
          <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] bg-stone lg:col-span-5">
              <Image
                src="/images/form-3.jpg"
                alt="Living room with pale sofas, a timber stair, and tall windows along one side."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <ol className="space-y-10 lg:col-span-6 lg:col-start-7 lg:pt-8">
              {principles.map((principle) => (
                <li key={principle.title} className="border-t border-line pt-6">
                  <h3 className="text-[0.75rem] tracking-[0.2em] uppercase">{principle.title}</h3>
                  <p className="mt-3 max-w-md font-serif text-[clamp(1.6rem,2.4vw,2.15rem)] leading-snug">
                    {principle.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
