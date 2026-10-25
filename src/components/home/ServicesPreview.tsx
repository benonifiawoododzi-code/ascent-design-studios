import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/services";

export function ServicesPreview() {
  return (
    <section className="bg-charcoal text-ivory">
      <Container className="py-20 md:py-28 lg:py-36">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-ivory/60">What we do</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)] text-ivory">
              Considered design. Meaningful spaces.
            </h2>
          </div>
          <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-28">
            {services.map((service, index) => {
              const reversed = index % 2 === 1;
              return (
                <article key={service.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className={`relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1024px) 54vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <p className="font-serif text-3xl text-taupe">0{index + 1}</p>
                    <h3 className="mt-4 font-serif text-[clamp(2.1rem,3vw,3.2rem)] text-ivory">{service.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/80 md:text-base">{service.summary}</p>
                    <Link
                      href={`/services#${service.id}`}
                      className="group mt-6 inline-flex min-h-11 items-center gap-3 text-[0.72rem] tracking-[0.18em] text-ivory uppercase"
                    >
                      <span className="link-underline">Explore</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      >
                        <path d="M3 9h12M11 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
