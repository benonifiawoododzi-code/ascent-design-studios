import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import type { StudioImage } from "@/types/content";

export function CallToAction({
  title,
  description,
  href,
  label,
  image,
}: {
  title: string;
  description?: string;
  href: string;
  label: string;
  image: StudioImage;
}) {
  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-charcoal">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/15" />
      <div className="relative flex min-h-[78svh] items-end">
        <Container className="py-16 lg:py-24">
          <div className="max-w-3xl text-ivory">
            <h2 className="max-w-[14ch] font-serif text-[clamp(2.8rem,6vw,5.8rem)] font-light text-ivory">{title}</h2>
            {description && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">{description}</p>
            )}
            <Button href={href} variant="light" className="mt-8">
              {label}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
