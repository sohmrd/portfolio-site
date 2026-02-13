"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project, Section } from "@/content/projects";
import { FadeUp, TextReveal, ScaleIn } from "@/components/motion/fade-up";

function SectionRenderer({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="py-20 md:py-28">
      {/* Section number + heading */}
      <FadeUp>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm tabular-nums text-[var(--text-subtle)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
              {section.heading}
            </h2>
          </div>
        </div>
      </FadeUp>

      {/* Content — offset layout for standard sections */}
      <FadeUp delay={0.1}>
        <div className="mx-auto mt-8 max-w-[1400px] px-6 lg:px-12">
          <div className={`grid gap-12 md:grid-cols-12 ${isEven ? "" : ""}`}>
            <div className={`${isEven ? "md:col-span-7 md:col-start-1" : "md:col-span-7 md:col-start-6"}`}>
              <p className="text-lg leading-[1.8] text-[var(--text-muted)]">
                {section.content}
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Stack section */}
      {section.type === "stack" && (
        <FadeUp delay={0.2}>
          <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:px-12">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--border-color)] md:grid-cols-2">
              {section.hardware && section.hardware.length > 0 && (
                <div className="bg-[var(--surface)] p-8">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    Hardware
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {section.hardware.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)]"
                      >
                        <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {section.software && section.software.length > 0 && (
                <div className="bg-[var(--surface)] p-8">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    Software
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {section.software.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)]"
                      >
                        <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </FadeUp>
      )}

      {/* Code section — full width, premium terminal look */}
      {section.type === "code" && section.code && (
        <ScaleIn delay={0.15}>
          <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:px-12">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[hsl(220_15%_7%)]">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[hsl(0_70%_50%)] opacity-60" />
                    <div className="h-3 w-3 rounded-full bg-[hsl(45_70%_50%)] opacity-60" />
                    <div className="h-3 w-3 rounded-full bg-[hsl(120_70%_40%)] opacity-60" />
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                  {section.language}
                </span>
              </div>
              <pre className="!m-0 !rounded-none !border-0 overflow-x-auto p-6 md:p-8">
                <code className="text-[13px] leading-[1.8] text-[var(--text-muted)]">
                  {section.code}
                </code>
              </pre>
            </div>
          </div>
        </ScaleIn>
      )}

      {/* Failure section — timeline style */}
      {section.type === "failure" && section.iterations && (
        <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:px-12">
          <div className="space-y-6">
            {section.iterations.map((iter, i) => (
              <FadeUp key={iter.version} delay={i * 0.1}>
                <div className="group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/20 md:p-8">
                  <div className="flex items-start gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-muted)]">
                      <span className="font-mono text-sm font-bold text-[var(--accent)]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)]">
                        {iter.version}
                      </h4>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-[var(--background)] p-4">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                            Issue
                          </span>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                            {iter.issue}
                          </p>
                        </div>
                        <div className="rounded-xl bg-[var(--background)] p-4">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-400">
                            Resolution
                          </span>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                            {iter.fix}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      )}

      {/* Images — full bleed on single, side-by-side on multiple */}
      {section.images && section.images.length > 0 && (
        <div className="mt-16">
          {section.images.length === 1 ? (
            <ScaleIn>
              <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--surface)]">
                  <Image
                    src={section.images[0]}
                    alt={section.heading}
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
              </div>
            </ScaleIn>
          ) : (
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
              <div className="grid gap-4 md:grid-cols-2">
                {section.images.map((img, i) => (
                  <ScaleIn key={img} delay={i * 0.1}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface)]">
                      <Image
                        src={img}
                        alt={section.heading}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CaseStudyContent({ project }: { project: Project }) {
  return (
    <article>
      {/* Hero — Full viewport cinematic */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        {/* Background image with parallax feel */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[var(--surface)]" />
          {project.heroImage && (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover opacity-30"
                priority
                sizes="100vw"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-[var(--background)]/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-48 lg:px-12 lg:pb-28">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
              </svg>
              Back
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border-color)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <div className="mt-6">
            <TextReveal delay={0.4}>
              <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-[var(--text)]">
                {project.title}
              </h1>
            </TextReveal>
          </div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]"
          >
            {project.summary}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--border-color)] pt-8"
          >
            {[
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Timeline", value: project.timeline },
              ...(project.team ? [{ label: "Team", value: project.team }] : []),
            ].map((meta) => (
              <div key={meta.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                  {meta.label}
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                  {meta.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections — generous spacing */}
      <div className="divide-y divide-[var(--border-color)]">
        {project.sections.map((section, i) => (
          <SectionRenderer key={section.heading} section={section} index={i} />
        ))}
      </div>

      {/* Bottom nav */}
      <section className="px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="divider" />
          <div className="flex justify-center py-16">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
              </svg>
              All projects
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
