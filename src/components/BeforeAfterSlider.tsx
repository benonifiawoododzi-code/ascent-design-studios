"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { StudioImage } from "@/types/content";

const min = 4;
const max = 96;

export function BeforeAfterSlider({
  before,
  after,
  demonstration = false,
  note,
}: {
  before: StudioImage;
  after: StudioImage;
  demonstration?: boolean;
  note?: string;
}) {
  const [position, setPosition] = useState(58);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(max, Math.max(min, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const message =
    note ||
    (demonstration
      ? "Demonstration only. These images are placeholders and are not a documented transformation of the same space."
      : "");

  return (
    <figure>
      {message && <figcaption className="mb-5 max-w-3xl text-sm leading-relaxed">{message}</figcaption>}
      <div
        ref={frameRef}
        className="relative aspect-[16/10] w-full touch-none overflow-hidden bg-stone select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Image src={after.src} alt="" fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before.src} alt="" fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
        </div>
        <span className="absolute top-4 left-4 bg-ivory/92 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-charcoal uppercase">
          Before
        </span>
        <span className="absolute top-4 right-4 bg-ivory/92 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-charcoal uppercase">
          After
        </span>
        <div className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-ivory" style={{ left: `${position}%` }} aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory bg-charcoal text-ivory">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M6 4 L2 9 L6 14 M12 4 L16 9 L12 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="sr-only">
        Before: {before.alt} After: {after.alt}
      </p>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex min-w-0 flex-1 items-center gap-4 text-[0.68rem] tracking-[0.16em] uppercase">
          <span className="shrink-0">Compare</span>
          <input
            type="range"
            min={min}
            max={max}
            value={position}
            aria-valuetext={`Before image covers ${Math.round(position)} percent of the frame`}
            aria-label="Reveal more or less of the before image"
            onChange={(event) => setPosition(Number(event.target.value))}
            className="w-full accent-charcoal"
          />
        </label>
        <div className="flex gap-3">
          <button type="button" className="min-h-11 px-1 text-[0.68rem] tracking-[0.16em] uppercase" onClick={() => setPosition(max)}>
            Show before
          </button>
          <button type="button" className="min-h-11 px-1 text-[0.68rem] tracking-[0.16em] uppercase" onClick={() => setPosition(min)}>
            Show after
          </button>
        </div>
      </div>
    </figure>
  );
}
