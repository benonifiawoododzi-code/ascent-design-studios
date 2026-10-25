"use client";

import { useState } from "react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  if (!item) return null;

  const hasPlaceholders = testimonials.some((entry) => entry.placeholder);

  function go(next: number) {
    const count = testimonials.length;
    setIndex((next + count) % count);
  }

  return (
    <div>
      {hasPlaceholders && (
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed">
          Placeholder quotations for layout review. They are not client testimonials. Replace them
          with approved feedback before publication.
        </p>
      )}
      <div className="mx-auto mt-10 max-w-4xl text-center" aria-live="polite">
        <blockquote>
          <p className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] leading-snug font-light italic">
            “{item.quote}”
          </p>
        </blockquote>
        <p className="mt-8 text-sm">{item.attribution}</p>
        <p className="mt-2 text-[0.68rem] tracking-[0.16em] uppercase text-charcoal/70">
          {item.placeholder ? "Placeholder · " : ""}
          {item.category}
        </p>
      </div>
      {testimonials.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="min-h-11 px-2 text-[0.68rem] tracking-[0.16em] uppercase"
          >
            Previous
          </button>
          <p className="text-[0.68rem] tracking-[0.16em] uppercase">
            {index + 1} / {testimonials.length}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="min-h-11 px-2 text-[0.68rem] tracking-[0.16em] uppercase"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
