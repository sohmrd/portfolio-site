"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project, Section } from "@/content/projects";
import { FadeUp, TextReveal, ScaleIn } from "@/components/motion/fade-up";
import { openLightbox, openLightboxGallery } from "@/components/ui/lightbox";
import { SlideViewer } from "@/components/ui/slide-viewer";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iaHNsKDIyMCwxNSUsOCUpIi8+PC9zdmc+";

function ClickableImage({
  src,
  alt,
  fill,
  className,
  sizes,
  gallery,
  galleryIndex,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  gallery?: { src: string; alt: string }[];
  galleryIndex?: number;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (gallery && gallery.length > 1) {
          openLightboxGallery(gallery, galleryIndex ?? 0);
        } else {
          openLightbox(src, alt);
        }
      }}
      className="relative block h-full w-full cursor-zoom-in"
      aria-label={`View full image: ${alt}`}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={alt} className={className} />
      )}
    </button>
  );
}

/* ── Image block (shared by all non-code sections) ─────────────────── */
function SectionImages({ images, heading }: { images: string[]; heading: string }) {
  if (images.length === 1) {
    return (
      <FadeUp>
        <div className="mx-auto mt-16 max-w-[var(--container-max)] px-6 lg:px-12">
          <div className="overflow-hidden rounded-2xl bg-[var(--surface)]">
            <div className="relative aspect-[16/9]">
              <ClickableImage
                src={images[0]}
                alt={heading}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1440px"
              />
            </div>
          </div>
        </div>
      </FadeUp>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-[var(--container-max)] px-6 lg:px-12">
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((img, i) => (
          <FadeUp key={img} delay={i * 0.1}>
            <div className="overflow-hidden rounded-2xl bg-[var(--surface)]">
              <div className="relative aspect-[16/10]">
                <ClickableImage
                  src={img}
                  alt={heading}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 720px"
                  gallery={images.map((im) => ({ src: im, alt: heading }))}
                  galleryIndex={i}
                />
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ── Copy button ──────────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--code-subtle)] transition-colors hover:text-[var(--text-muted)]"
      aria-label="Copy code"
    >
      {copied ? (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── Section renderer ──────────────────────────────────────────────── */
function SectionRenderer({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  return (
    <div className="py-28 md:py-40">
      {/* ── Heading ─────────────────────────────────────────────── */}
      <FadeUp>
        <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-12">
          <div className="flex items-baseline gap-4">
            <motion.span
              className="inline-block font-mono text-sm tabular-nums text-[var(--text-subtle)]"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
              {section.heading}
            </h2>
          </div>
        </div>
      </FadeUp>

      {/* ── Body text (narrow column) ──────────────────────────── */}
      <FadeUp delay={0.1}>
        <div className="mx-auto mt-8 max-w-[var(--container-max)] px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-lg leading-[1.8] text-[var(--text-muted)]">
              {section.content}
            </p>
          </div>
        </div>
      </FadeUp>

      {/* ── Stack cards (full container width) ─────────────────── */}
      {section.type === "stack" && (
        <FadeUp delay={0.2}>
          <div className="mx-auto mt-12 max-w-[var(--container-max)] px-6 lg:px-12">
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

      {/* ── Code + screenshot side-by-side (full width) ────────── */}
      {section.type === "code" && section.code && section.images && section.images.length > 0 && (
        <div className="mx-auto mt-12 max-w-[var(--container-max)] px-6 lg:px-12">
          <div className="grid items-stretch gap-6 overflow-hidden lg:grid-cols-2">
            <ScaleIn delay={0.15} className="flex min-w-0">
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)]">
                <div className="flex items-center justify-between border-b border-[var(--code-border)] px-6 py-3">
                  <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                  </div>
                  <div className="flex items-center gap-3">
                    <CopyButton text={section.code} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--code-subtle)]">
                      {section.language}
                    </span>
                  </div>
                </div>
                <pre className="!m-0 !rounded-none !border-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8">
                  <code className="text-[13px] leading-[1.8] text-[var(--code-text)]">
                    {section.code}
                  </code>
                </pre>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.25} className="flex min-w-0">
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
                <div className="relative flex flex-1 items-center justify-center p-6 md:p-8">
                  <div className="relative w-full">
                    <ClickableImage
                      src={section.images[0]}
                      alt={section.heading}
                      fill={false}
                      className="h-auto w-full rounded-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      )}

      {/* ── Code block only (full width, no screenshot) ────────── */}
      {section.type === "code" && section.code && !(section.images && section.images.length > 0) && (
        <FadeUp delay={0.15}>
          <div className="mx-auto mt-12 max-w-[var(--container-max)] px-6 lg:px-12">
            <div className="overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)]">
              <div className="flex items-center justify-between border-b border-[var(--code-border)] px-6 py-3">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--code-subtle)] opacity-50" />
                </div>
                <div className="flex items-center gap-3">
                  <CopyButton text={section.code} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                    {section.language}
                  </span>
                </div>
              </div>
              <pre className="!m-0 !rounded-none !border-0 min-w-0 overflow-x-auto p-6 md:p-8">
                <code className="text-[13px] leading-[1.8] text-[var(--code-text)]">
                  {section.code}
                </code>
              </pre>
            </div>
          </div>
        </FadeUp>
      )}

      {/* ── Failure timeline (full width) ──────────────────────── */}
      {section.type === "failure" && section.iterations && (
        <div className="mx-auto mt-16 max-w-[var(--container-max)] px-6 lg:px-12">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/60 via-[var(--accent)]/20 to-transparent md:left-6" />
            <div className="space-y-8">
              {section.iterations.map((iter, i) => (
                <FadeUp key={iter.version} delay={i * 0.1}>
                  <div className="relative pl-14 md:pl-16">
                    <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)] md:h-12 md:w-12">
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-shadow duration-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)] md:p-8">
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
                        {iter.version}
                      </h4>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-red-500/5 p-4 ring-1 ring-red-500/10">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                            Issue
                          </span>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                            {iter.issue}
                          </p>
                        </div>
                        <div className="rounded-xl bg-green-500/5 p-4 ring-1 ring-green-500/10">
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
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Images (full container width, wider than text) ──────── */}
      {section.images && section.images.length > 0 && section.type !== "code" && (
        <SectionImages images={section.images} heading={section.heading} />
      )}

      {/* ── Slides (inline carousel) ──────────────────────────── */}
      {section.slides && section.slides.length > 0 && (
        <FadeUp delay={0.15}>
          <div className="mx-auto mt-16 max-w-[var(--container-max)] px-6 lg:px-12">
            <SlideViewer slides={section.slides} alt={section.heading} />
          </div>
        </FadeUp>
      )}
    </div>
  );
}

/* ── Case study page ───────────────────────────────────────────────── */
export function CaseStudyContent({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: { slug: string; title: string } | null;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <article>
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
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
                className="object-cover opacity-40"
                priority
                sizes="100vw"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/70 to-[var(--background)]/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-6 pb-20 pt-48 lg:px-12 lg:pb-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/work"
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

          <div className="mt-6">
            <TextReveal delay={0.4}>
              <h1 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[var(--text)]">
                {project.title}
              </h1>
            </TextReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]"
          >
            {project.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 flex flex-wrap gap-x-16 gap-y-6 border-t border-[var(--border-color)] pt-10"
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
            {project.github && (
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                  Source
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1.5 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                  <svg
                    className="h-3 w-3 text-[var(--text-subtle)] transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <div className="divide-y divide-[var(--border-color)]">
        {project.sections.map((section, i) => (
          <SectionRenderer key={section.heading} section={section} index={i} />
        ))}
      </div>

      {/* Bottom nav */}
      <section className="px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="divider" />
          <div className="flex items-center justify-between py-16">
            <Link
              href="/work"
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

            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group inline-flex items-center gap-3 text-right transition-colors hover:text-[var(--accent)]"
              >
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    Next project
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                    {nextProject.title}
                  </span>
                </div>
                <svg
                  className="h-5 w-5 shrink-0 text-[var(--text-subtle)] transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
