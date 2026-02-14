"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxState {
  images: LightboxImage[];
  index: number;
}

let globalOpen: ((images: LightboxImage[], index: number) => void) | null =
  null;

export function openLightbox(src: string, alt: string) {
  globalOpen?.([{ src, alt }], 0);
}

export function openLightboxGallery(
  images: LightboxImage[],
  index: number,
) {
  globalOpen?.(images, index);
}

export function LightboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<LightboxState | null>(null);

  const open = useCallback((images: LightboxImage[], index: number) => {
    setState({ images, index });
  }, []);

  const close = useCallback(() => {
    setState(null);
  }, []);

  const goNext = useCallback(() => {
    setState((s) =>
      s ? { ...s, index: (s.index + 1) % s.images.length } : null,
    );
  }, []);

  const goPrev = useCallback(() => {
    setState((s) =>
      s
        ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length }
        : null,
    );
  }, []);

  useEffect(() => {
    globalOpen = open;
    return () => {
      globalOpen = null;
    };
  }, [open]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (state.images.length > 1) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, close, goNext, goPrev]);

  const current = state ? state.images[state.index] : null;
  const showNav = state && state.images.length > 1;

  return (
    <>
      {children}
      <AnimatePresence>
        {current && state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute right-4 top-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous */}
            {showNav && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 z-[9999] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6 md:h-12 md:w-12"
                aria-label="Previous image"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next */}
            {showNav && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 z-[9999] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:h-12 md:w-12"
                aria-label="Next image"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Counter */}
            {showNav && (
              <div className="absolute bottom-4 left-1/2 z-[9999] -translate-x-1/2 font-mono text-xs text-white/60">
                {state.index + 1} / {state.images.length}
              </div>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1920}
                  height={1080}
                  className="max-h-[90vh] w-auto rounded-lg object-contain"
                  sizes="90vw"
                  quality={95}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
