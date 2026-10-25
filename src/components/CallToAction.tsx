import Image from "next/image";
import { Button } from "@/components/Button";
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
    <section className="relative min-h-[72svh] bg-charcoal">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-charcoal/50" />
      <div className="relative flex min-h-[72svh] items-end px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="max-w-3xl text-ivory">
          <h2 className="font-serif text-[clamp(2.8rem,6vw,5.6rem)] font-light text-ivory">{title}</h2>
          {description && <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">{description}</p>}
          <Button href={href} variant="light" className="mt-8">
            {label}
          </Button>
        </div>
      </div>
    </section>
  );
}
