import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="border-t border-line py-20 md:py-28 lg:py-36">
      <Container>
        <Reveal>
          <p className="eyebrow text-walnut">In their words</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,4.6vw,4.4rem)]">
            Thoughtful spaces. Lasting impressions.
          </h2>
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
