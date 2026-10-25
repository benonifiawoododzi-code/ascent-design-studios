"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StudioImage } from "@/types/content";

function rowsFrom(images: StudioImage[]) {
  const rows: { image: StudioImage; index: number }[][] = [];
  let cursor = 0;
  while (cursor < images.length) {
    const current = images[cursor];
    const next = images[cursor + 1];
    const pairable = current.layout === "half" || current.layout === "detail";
    const nextPairable = next && (next.layout === "half" || next.layout === "detail");
    if (pairable && nextPairable) {
      rows.push([
        { image: current, index: cursor },
        { image: next, index: cursor + 1 },
      ]);
      cursor += 2;
    } else {
      rows.push([{ image: current, index: cursor }]);
      cursor += 1;
    }
  }
  return rows;
}

function frameClass(layout?: StudioImage["layout"]) {
  if (layout === "detail") return "aspect-square";
  if (layout === "half") return "aspect-[4/5]";
  return "aspect-[16/10]";
}

export function ProjectGallery({ images }: { images: StudioImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = active !== null;
  const current = active !== null ? images[active] : undefined;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length, open]);

  const rows = rowsFrom(images);

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        {rows.map((row) => (
          <div key={row.map((item) => item.index).join("-")} className={row.length > 1 ? "grid gap-4 md:grid-cols-2 md:gap-6" : ""}>
            {row.map(({ image, index }) => (
              <figure key={`${image.src}-${index}`}>
                <button
                  type="button"
                  className={`relative block w-full overflow-hidden bg-stone ${frameClass(image.layout)}`}
                  onClick={() => setActive(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={row.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
                    className="object-cover"
                  />
                  <span className="sr-only">Open image {index + 1} in the gallery</span>
                </button>
                {image.caption && <figcaption className="mt-3 text-sm text-charcoal/75">{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ))}
      </div>

      {open && current && active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Project image gallery"
          onClick={() => setActive(null)}
        >
          <div className="flex w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-4 text-ivory">
              <p className="text-[0.68rem] tracking-[0.16em] uppercase">
                {active + 1} / {images.length}
              </p>
              <button ref={closeRef} type="button" className="min-h-11 px-2 text-[0.68rem] tracking-[0.16em] uppercase" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
            <div className="relative aspect-[16/10] bg-charcoal">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 text-ivory">
              <p className="max-w-2xl text-sm leading-relaxed">{current.caption || current.alt}</p>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  className="min-h-11 px-2 text-[0.68rem] tracking-[0.16em] uppercase"
                  onClick={() => setActive((active - 1 + images.length) % images.length)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="min-h-11 px-2 text-[0.68rem] tracking-[0.16em] uppercase"
                  onClick={() => setActive((active + 1) % images.length)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
