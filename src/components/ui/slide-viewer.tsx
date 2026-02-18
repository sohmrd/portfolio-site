"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iaHNsKDIyMCwxNSUsOCUpIi8+PC9zdmc+";

interface SlideViewerProps {
  slides: string[];
  alt?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "35%" : "-35%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-35%" : "35%",
    opacity: 0,
    scale: 0.96,
  }),
};

/* ── Dot with hover preview ────────────────────────────────────────── */
function DotWithPreview({
  index,
  isCurrent,
  slide,
  alt,
  onClick,
}: {
  index: number;
  isCurrent: boolean;
  slide: string;
  alt: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-4 items-center"
      aria-label={`Go to slide ${index + 1}`}
    >
      {/* Preview tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--surface)] shadow-lg">
              <div className="relative h-[72px] w-[128px]">
                <Image
                  src={slide}
                  alt={`${alt} ${index + 1} preview`}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
              <div className="border-t border-[var(--border-color)] px-2 py-1">
                <span className="block text-center font-mono text-[9px] tabular-nums text-[var(--text-subtle)]">
                  {index + 1}
                </span>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2">
              <div className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-[var(--border-color)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dot */}
      <motion.div
        className="h-1.5 rounded-full"
        animate={{
          width: isCurrent ? 16 : 6,
          backgroundColor: isCurrent
            ? "var(--accent)"
            : "color-mix(in srgb, var(--text-subtle) 40%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  );
}

/* ── Main slide viewer ─────────────────────────────────────────────── */
export function SlideViewer({ slides, alt = "Slide" }: SlideViewerProps) {
  const [[current, direction], setSlide] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback(
    (dir: number) => {
      setSlide(([prev]) => {
        const next = prev + dir;
        if (next < 0) return [slides.length - 1, dir];
        if (next >= slides.length) return [0, dir];
        return [next, dir];
      });
    },
    [slides.length]
  );

  const goTo = useCallback(
    (index: number) => {
      setSlide(([prev]) => [index, index > prev ? 1 : -1]);
    },
    []
  );

  /* Keyboard navigation */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    }

    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [paginate]);

  /* Preload all slide images */
  useEffect(() => {
    slides.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [slides]);

  /* Touch swipe handling */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    // Lock to horizontal swipe once threshold met
    if (!swiping.current && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiping.current = true;
    }
    if (swiping.current) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      if (swiping.current && Math.abs(dx) > 40) {
        paginate(dx < 0 ? 1 : -1);
      }
      touchStart.current = null;
      swiping.current = false;
    },
    [paginate]
  );

  if (slides.length === 0) return null;

  return (
    <MotionConfig transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}>
      <div
        ref={containerRef}
        tabIndex={0}
        className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {/* Slide area */}
        <div
          className="relative aspect-[16/9] overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={slides[current]}
                alt={`${alt} ${current + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1440px"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Hidden preload for adjacent slides */}
          {slides.map((src, i) =>
            i !== current ? (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                className="pointer-events-none invisible absolute"
                sizes="(max-width: 1024px) 100vw, 1440px"
                aria-hidden
              />
            ) : null
          )}
        </div>

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <motion.button
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--background)]/80 text-[var(--text-muted)] opacity-0 backdrop-blur-sm transition-opacity hover:bg-[var(--background)] hover:text-[var(--text)] group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--background)]/80 text-[var(--text-muted)] opacity-0 backdrop-blur-sm transition-opacity hover:bg-[var(--background)] hover:text-[var(--text)] group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        {/* Bottom bar: page counter + dots with preview */}
        {slides.length > 1 && (
          <div className="flex items-center justify-between border-t border-[var(--border-color)] px-5 py-3">
            <div className="relative h-4 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.span
                  key={current}
                  initial={{ y: direction > 0 ? 12 : -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? -12 : 12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block font-mono text-[11px] leading-4 tabular-nums text-[var(--text-subtle)]"
                >
                  {current + 1} / {slides.length}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <DotWithPreview
                  key={i}
                  index={i}
                  isCurrent={i === current}
                  slide={slide}
                  alt={alt}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
