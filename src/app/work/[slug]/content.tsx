"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project, Section } from "@/content/projects";
import { FadeUp } from "@/components/motion/fade-up";

function SectionRenderer({ section }: { section: Section }) {
  return (
    <FadeUp>
      <div className="py-12 first:pt-0 md:py-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text)]">
          {section.heading}
        </h2>

        <div className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
          {section.content}
        </div>

        {/* Stack section */}
        {section.type === "stack" && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {section.hardware && section.hardware.length > 0 && (
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                  Hardware
                </h3>
                <ul className="mt-3 space-y-2">
                  {section.hardware.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {section.software && section.software.length > 0 && (
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                  Software
                </h3>
                <ul className="mt-3 space-y-2">
                  {section.software.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Code section */}
        {section.type === "code" && section.code && (
          <div className="mt-6 overflow-hidden rounded-lg border border-[var(--border-color)]">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--surface)] px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-subtle)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-subtle)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-subtle)]/30" />
              </div>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">
                {section.language}
              </span>
            </div>
            <pre className="!m-0 !rounded-none !border-0 overflow-x-auto p-5">
              <code className="text-sm leading-relaxed text-[var(--text-muted)]">
                {section.code}
              </code>
            </pre>
          </div>
        )}

        {/* Failure section */}
        {section.type === "failure" && section.iterations && (
          <div className="mt-8 space-y-4">
            {section.iterations.map((iter, i) => (
              <div
                key={iter.version}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] font-mono text-xs font-bold text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text)]">
                    {iter.version}
                  </h4>
                </div>
                <div className="ml-9 mt-3 space-y-2">
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-medium text-red-400">Issue: </span>
                    {iter.issue}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-medium text-green-400">Fix: </span>
                    {iter.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images */}
        {section.images && section.images.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {section.images.map((img) => (
              <div
                key={img}
                className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--surface)]"
              >
                <Image
                  src={img}
                  alt={section.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </FadeUp>
  );
}

export function CaseStudyContent({ project }: { project: Project }) {
  return (
    <article>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[var(--surface)]">
          {project.heroImage && (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 pb-16 pt-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
            >
              &larr; Back to Work
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-[var(--text)] md:text-6xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-xl text-lg text-[var(--text-muted)]"
          >
            {project.summary}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            {[
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Timeline", value: project.timeline },
              ...(project.team ? [{ label: "Team", value: project.team }] : []),
            ].map((meta) => (
              <div key={meta.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                  {meta.label}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {meta.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--accent-muted)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-screen-xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="divide-y divide-[var(--border-color)]">
          {project.sections.map((section) => (
            <SectionRenderer key={section.heading} section={section} />
          ))}
        </div>
      </section>

      {/* Back link */}
      <section className="border-t border-[var(--border-color)] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-screen-xl text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            &larr; Back to all projects
          </Link>
        </div>
      </section>
    </article>
  );
}
