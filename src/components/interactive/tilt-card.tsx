"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  glareOpacity?: number;
}

const springConfig = { stiffness: 300, damping: 30 };

export function TiltCard({
  children,
  className,
  maxRotation = 8,
  glareOpacity = 0.12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawRotateX = useTransform(mouseY, [0, 1], [maxRotation, -maxRotation]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-maxRotation, maxRotation]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const glareBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (prefersReduced) {
    return (
      <div
        className={`rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 md:p-8 ${className || ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]/30 md:p-8 ${className || ""}`}
      >
        <div style={{ transform: "translateZ(20px)" }}>{children}</div>

        {/* Specular glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glareBackground }}
        />
      </motion.div>
    </div>
  );
}
