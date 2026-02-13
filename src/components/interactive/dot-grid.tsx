"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Dot {
  x: number;
  y: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
}

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const colorsRef = useRef({ dot: "", accent: "", line: "" });
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const SPACING = 28;
  const MAX_RADIUS = 160;
  const CONNECTION_DIST = 100;
  const DOT_SIZE = 1.2;
  const MAX_DOTS = 600;

  const readColors = useCallback(() => {
    const s = getComputedStyle(document.documentElement);
    colorsRef.current = {
      dot: s.getPropertyValue("--text-subtle").trim(),
      accent: s.getPropertyValue("--accent").trim(),
      line: s.getPropertyValue("--border-color").trim(),
    };
  }, []);

  const initDots = useCallback(
    (w: number, h: number) => {
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const total = Math.min(cols * rows, MAX_DOTS);
      const actualCols = Math.ceil(Math.sqrt(total * (w / h)));
      const actualRows = Math.ceil(total / actualCols);
      const spacingX = w / actualCols;
      const spacingY = h / actualRows;

      const dots: Dot[] = [];
      for (let r = 0; r < actualRows; r++) {
        for (let c = 0; c < actualCols; c++) {
          if (dots.length >= MAX_DOTS) break;
          const x = c * spacingX + spacingX * 0.5;
          const y = r * spacingY + spacingY * 0.5;
          dots.push({ x, y, cx: x, cy: y, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    readColors();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots(w, h);
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement!);

    // Theme observer
    const mo = new MutationObserver(() => readColors());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouse, { passive: true });
    parent?.addEventListener("mouseleave", handleLeave);

    if (prefersReduced) {
      // Draw static grid once
      const dots = dotsRef.current;
      const { dot } = colorsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = dot;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      return () => {
        ro.disconnect();
        mo.disconnect();
        parent?.removeEventListener("mousemove", handleMouse);
        parent?.removeEventListener("mouseleave", handleLeave);
      };
    }

    // Animation loop
    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { dot: dotColor, accent, line: lineColor } = colorsRef.current;

      // Physics update
      const springK = 0.035;
      const damping = 0.82;

      for (const d of dots) {
        if (mouse.active) {
          const dx = d.cx - mouse.x;
          const dy = d.cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_RADIUS && dist > 0) {
            const force = ((MAX_RADIUS - dist) / MAX_RADIUS) * 12;
            const angle = Math.atan2(dy, dx);
            d.vx += Math.cos(angle) * force * 0.08;
            d.vy += Math.sin(angle) * force * 0.08;
          }
        }

        // Spring back to origin
        d.vx += (d.x - d.cx) * springK;
        d.vy += (d.y - d.cy) * springK;
        d.vx *= damping;
        d.vy *= damping;
        d.cx += d.vx;
        d.cy += d.vy;
      }

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = b.cx - a.cx;
          const dy = b.cy - a.cy;

          // Quick distance check (skip sqrt for far dots)
          if (Math.abs(dx) > CONNECTION_DIST || Math.abs(dy) > CONNECTION_DIST)
            continue;

          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(a.cx, a.cy);
            ctx.lineTo(b.cx, b.cy);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.globalAlpha = 1;
      for (const d of dots) {
        // Dots near mouse get accent glow
        let alpha = 0.35;
        let size = DOT_SIZE;
        let color = dotColor;

        if (mouse.active) {
          const dx = d.cx - mouse.x;
          const dy = d.cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_RADIUS) {
            const proximity = 1 - dist / MAX_RADIUS;
            alpha = 0.35 + proximity * 0.55;
            size = DOT_SIZE + proximity * 1;
            color = accent;
          }
        }

        ctx.beginPath();
        ctx.arc(d.cx, d.cy, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Mouse glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MAX_RADIUS
        );
        gradient.addColorStop(0, accent);
        gradient.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.04;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MAX_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mo.disconnect();
      parent?.removeEventListener("mousemove", handleMouse);
      parent?.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReduced, initDots, readColors]);

  return (
    <div className={`absolute inset-0 pointer-events-auto ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
