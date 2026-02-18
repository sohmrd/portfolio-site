"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iaHNsKDIyMCwxNSUsOCUpIi8+PC9zdmc+";

interface SlideViewerProps {
  slides: string[];
  alt?: string;
}

export function SlideViewer({ slides, alt = "Slide" }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : slides.length - 1));
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c < slides.length - 1 ? c + 1 : 0));
  }, [slides.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }

    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (slides.length === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {/* Slide */}
      <div className="relative aspect-[16/9]">
        <Image
          src={slides[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1440px"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </div>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--background)]/80 text-[var(--text-muted)] opacity-0 backdrop-blur-sm transition-all hover:bg-[var(--background)] hover:text-[var(--text)] group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--background)]/80 text-[var(--text-muted)] opacity-0 backdrop-blur-sm transition-all hover:bg-[var(--background)] hover:text-[var(--text)] group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Bottom bar: page indicator + dots */}
      {slides.length > 1 && (
        <div className="flex items-center justify-between border-t border-[var(--border-color)] px-5 py-3">
          <span className="font-mono text-[11px] tabular-nums text-[var(--text-subtle)]">
            {current + 1} / {slides.length}
          </span>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current
                    ? "w-4 bg-[var(--accent)]"
                    : "w-1.5 bg-[var(--text-subtle)]/40 hover:bg-[var(--text-subtle)]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
