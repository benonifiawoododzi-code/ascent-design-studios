import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { getComparisonProject, getFeaturedProjects, hasSampleProjects } from "@/lib/projects";

const featuredLayout = [
  { span: "lg:col-span-7", aspect: "tall" as const },
  { span: "lg:col-span-5 lg:mt-24", aspect: "landscape" as const },
  { span: "lg:col-span-5", aspect: "portrait" as const },
  { span: "lg:col-span-7 lg:mt-16", aspect: "wide" as const },
  { span: "lg:col-span-6", aspect: "landscape" as const },
  { span: "lg:col-span-6 lg:mt-20", aspect: "tall" as const },
];

export default function HomePage() {
  const featured = getFeaturedProjects();
  const comparison = getComparisonProject();

  return (
    <>
      <HeroSection variant="home" />

      <section id="studio" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] bg-stone lg:col-span-7">
              <Image
                src="/images/intro.jpg"
                alt="Open-plan living room with a grey sectional, a timber feature wall, and sliding doors to a terrace."
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-[0.72rem] tracking-[0.22em] uppercase">The Studio</p>
              <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)]">
                A Thoughtful Approach to Every Space.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed">
                <p>
                  Ascent Design Studios plans interiors with the same attention given to proportion,
                  light, and the quiet details that make a room feel resolved.
                </p>
                <p>
                  Spatial planning, material selection, and functional design come first. The work
                  stays personal: each project is shaped around the people who will use it, whether
                  that is a home, a workplace, or a place of welcome.
                </p>
              </div>
              <Button href="/services" className="mt-8">
                Discover Our Approach
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28 lg:pb-36">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] uppercase">Portfolio</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)]">Selected Projects</h2>
            {hasSampleProjects() && (
              <p className="mt-5 text-sm leading-relaxed">
                These entries are illustrative samples, prepared so the studio can replace them with
                its own projects. Each one is marked Sample.
              </p>
            )}
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
            {featured.map((project, index) => {
              const layout = featuredLayout[index] ?? featuredLayout[0];
              return (
                <li key={project.slug} className={layout.span}>
                  <ProjectCard project={project} aspect={layout.aspect} priority={index === 0} />
                </li>
              );
            })}
          </ul>
          <Button href="/projects" variant="ghost" className="mt-14">
            View All Projects
          </Button>
        </Container>
      </section>

      <section className="border-t border-stone py-20 md:py-28 lg:py-36">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] uppercase">Services</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)]">Designing Spaces With Purpose.</h2>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.id} href={`/services#${service.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <h3 className="mt-5 font-serif text-3xl">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed">{service.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-stone py-20 md:py-28 lg:py-36">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] uppercase">Process</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)]">
              From First Ideas to Finished Spaces.
            </h2>
          </div>
          <div className="mt-14">
            <ProcessTimeline />
          </div>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed">
            Implementation, styling, and anything beyond the design itself follow the scope agreed
            for that project.
          </p>
        </Container>
      </section>

      {comparison?.beforeAfter && (
        <section className="border-t border-stone py-20 md:py-28 lg:py-36">
          <Container>
            <div className="max-w-2xl">
              <p className="text-[0.72rem] tracking-[0.22em] uppercase">Transformation</p>
              <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)]">A Different Perspective.</h2>
            </div>
            <div className="mt-12">
              <BeforeAfterSlider
                before={comparison.beforeAfter.before}
                after={comparison.beforeAfter.after}
                demonstration={comparison.beforeAfter.demonstration}
                note={comparison.beforeAfter.note}
              />
            </div>
            <Link
              href={`/projects/${comparison.slug}`}
              className="mt-8 inline-flex min-h-11 items-center text-[0.72rem] tracking-[0.16em] uppercase hover:text-olive"
            >
              View {comparison.title}
            </Link>
          </Container>
        </section>
      )}

      <section className="border-t border-stone py-20 md:py-28 lg:py-36">
        <Container>
          <h2 className="text-center font-serif text-[clamp(2.6rem,5vw,4.6rem)]">Designed Around People.</h2>
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </Container>
      </section>

      <CallToAction
        title="Let's Create Something Exceptional."
        description="Have a space in mind? Tell us about your project, and let's explore how thoughtful design can transform it."
        href="/contact"
        label="Book a Consultation"
        image={{
          src: "/images/haven-1.jpg",
          alt: "Hotel bedroom in warm timber, with a low platform bed and doors opening to a planted court.",
        }}
      />
    </>
  );
}
