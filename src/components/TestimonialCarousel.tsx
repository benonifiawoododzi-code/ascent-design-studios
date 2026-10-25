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
        <p className="max-w-2xl text-sm leading-relaxed text-walnut">
          Development placeholder. These lines are not client testimonials, reviews, or endorsements.
          Verified comments can be added in the testimonials content file.
        </p>
      )}
      <div className="mt-10 max-w-4xl" aria-live="polite">
        <blockquote>
          <p className="font-serif text-[clamp(1.85rem,4vw,3.6rem)] leading-[1.15] font-light">“{item.quote}”</p>
        </blockquote>
        <p className="mt-8 text-sm">{item.attribution}</p>
        <p className="mt-2 text-[0.72rem] tracking-[0.16em] text-walnut uppercase">
          {item.placeholder ? "Placeholder · " : ""}
          {item.category}
        </p>
      </div>
      {testimonials.length > 1 && (
        <div className="mt-10 flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="min-h-11 px-1 text-[0.72rem] tracking-[0.16em] uppercase"
          >
            Previous
          </button>
          <p className="text-[0.72rem] tracking-[0.16em] uppercase">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="min-h-11 px-1 text-[0.72rem] tracking-[0.16em] uppercase"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
