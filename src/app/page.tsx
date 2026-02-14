"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import {
  FadeUp,
  TextReveal,
} from "@/components/motion/fade-up";
import { DotGrid } from "@/components/interactive/dot-grid";
import { TiltCard } from "@/components/interactive/tilt-card";

const projects = getFeaturedProjects();
const ease = [0.25, 0.1, 0.25, 1] as const;

function ProjectShowcase({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isComingSoon = !project.visible;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tiltSpring = { stiffness: 200, damping: 30 };
  const rawRotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-10, 10]);
  const rotateX = useSpring(rawRotateX, tiltSpring);
  const rotateY = useSpring(rawRotateY, tiltSpring);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReduced || isComingSoon) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleTiltLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease }}
      style={
        prefersReduced || isComingSoon
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      className={`group ${isComingSoon ? "pointer-events-none" : ""}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
          {project.thumbnail && !isComingSoon ? (
            <motion.div className="absolute inset-[-8%]" style={{ y: imageY }}>
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center border border-[var(--border-color)] rounded-2xl bg-[var(--surface)]">
              <div className="text-center">
                <div className="mx-auto mb-3 h-8 w-8 rounded-full border-2 border-[var(--border-color)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  Coming Soon
                </span>
              </div>
            </div>
          )}

          {/* Hover gradient */}
          {!isComingSoon && (
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          )}
        </div>
      </div>

      {/* Info below image */}
      <div className="mt-6 flex items-start justify-between gap-8 md:mt-8">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tabular-nums text-[var(--text-subtle)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-4xl ${
                isComingSoon
                  ? "text-[var(--text-subtle)]"
                  : "text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300"
              }`}
            >
              {project.title}
            </h3>
          </div>
          <p
            className={`mt-2 max-w-xl text-base leading-relaxed md:ml-10 ${
              isComingSoon ? "text-[var(--text-subtle)]" : "text-[var(--text-muted)]"
            }`}
          >
            {project.description}
          </p>
        </div>

        <div className="hidden shrink-0 md:flex md:flex-wrap md:gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border-color)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (isComingSoon) return <div>{content}</div>;

  return (
    <div style={{ perspective: 1200 }}>
      <Link href={`/work/${project.slug}`} className="block">
        {content}
      </Link>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 0.7], ["0px", "-80px"]);

  return (
    <>
      {/* Hero — Full viewport, massive typography */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-end px-6 pb-32 pt-40 lg:px-12 lg:pb-40"
      >
        {/* Interactive dot grid background */}
        <DotGrid />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative mx-auto w-full max-w-[var(--container-max)]"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-[var(--accent)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
              Sohm Dubey
            </span>
          </motion.div>

          {/* Main headline — big, bold, split across lines */}
          <div className="mt-8">
            <TextReveal delay={0.3}>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--text)]">
                I design products
              </h1>
            </TextReveal>
            <TextReveal delay={0.45}>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--text)]">
                and write the code
              </h1>
            </TextReveal>
            <TextReveal delay={0.6}>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--text-muted)]">
                that powers them.
              </h1>
            </TextReveal>
          </div>

          {/* Sub info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-[var(--text-muted)]">
              Georgia Tech senior in Industrial Design + Computer Science.
              Building at the intersection of hardware, AI, and spatial computing.
            </p>

            <div className="flex gap-6">
              <a
                href="#work"
                className="group flex items-center gap-2 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
              >
                Selected Work
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="absolute bottom-0 left-6 right-6 origin-left lg:left-12 lg:right-12"
        >
          <div className="divider" />
        </motion.div>
      </section>

      {/* Work — Large showcase cards */}
      <section id="work" className="scroll-mt-24 px-6 pb-40 pt-32 lg:px-12 lg:pb-60 lg:pt-48">
        <div className="mx-auto max-w-[var(--container-max)]">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                  Selected Work
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--text)] md:text-6xl lg:text-7xl">
                  Projects
                </h2>
              </div>
              <span className="hidden font-mono text-sm tabular-nums text-[var(--text-subtle)] md:block">
                ({String(projects.length).padStart(2, "0")})
              </span>
            </div>
            <div className="divider mt-8" />
          </FadeUp>

          <div className="mt-20 space-y-28 md:mt-24 md:space-y-40">
            {projects.map((project, i) => (
              <ProjectShowcase key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview — Asymmetric, editorial layout */}
      <section id="about" className="scroll-mt-24 px-6 py-40 lg:px-12 lg:py-56">
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-8">
            {/* Left column — large heading */}
            <div className="md:col-span-5">
              <FadeUp>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                  About
                </span>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight text-[var(--text)] md:text-6xl lg:text-7xl">
                  Design-trained
                  <br />
                  engineer.
                </h2>
              </FadeUp>
            </div>

            {/* Right column — text + skills */}
            <div className="md:col-span-6 md:col-start-7">
              <FadeUp delay={0.15}>
                <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                  I hold dual degrees in Industrial Design and Computer Science at
                  Georgia Tech. I believe the best products come from people who
                  can sketch the form factor and write the firmware that drives it.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {[
                    { label: "Design", items: "Form, Materials, User Research, CAD" },
                    { label: "Software", items: "Swift, Python, React, C++" },
                    { label: "Hardware", items: "Arduino, BLE, Sensors, PCB" },
                    { label: "AI / ML", items: "Computer Vision, PyTorch, YOLO" },
                  ].map((skill) => (
                    <TiltCard key={skill.label} maxRotation={6} glareOpacity={0.1}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                        {skill.label}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                        {skill.items}
                      </p>
                    </TiltCard>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mt-12">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  >
                    More about me
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                    </svg>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Contact — Massive typography CTA */}
      <section id="contact" className="scroll-mt-24 px-6 py-40 lg:px-12 lg:py-56">
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="divider" />
          <div className="py-28 text-center md:py-36">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                Get in touch
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--text)] md:text-7xl lg:text-8xl">
                Let&apos;s build something together.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--text-muted)]">
                Targeting creative technologist, design engineer, and product
                design engineer roles for 2026.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:sohmdubey@gmail.com"
                  className="rounded-full bg-[var(--text)] px-8 py-3.5 text-sm font-medium text-[var(--background)] transition-all hover:bg-[var(--accent)] hover:scale-[1.02]"
                >
                  sohmdubey@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/sohmdubey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-color)] px-8 py-3.5 text-sm font-medium text-[var(--text-muted)] transition-all hover:border-[var(--text-subtle)] hover:text-[var(--text)]"
                >
                  LinkedIn
                </a>
              </div>
            </FadeUp>
          </div>
          <div className="divider" />
        </div>
      </section>
    </>
  );
}
