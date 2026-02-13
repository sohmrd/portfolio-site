"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxContextValue {
  open: (src: string, alt: string) => void;
}

let globalOpen: LightboxContextValue["open"] | null = null;

export function openLightbox(src: string, alt: string) {
  globalOpen?.(src, alt);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setImage({ src, alt });
  }, []);

  const close = useCallback(() => {
    setImage(null);
  }, []);

  useEffect(() => {
    globalOpen = open;
    return () => {
      globalOpen = null;
    };
  }, [open]);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [image, close]);

  return (
    <>
      {children}
      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            onClick={close}
          >
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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1920}
                height={1080}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                sizes="90vw"
                quality={95}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
