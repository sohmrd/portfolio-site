"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllVisibleProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { FadeUp, TextReveal } from "@/components/motion/fade-up";

const allProjects = getAllVisibleProjects();

/* ── Derive filter categories from project tags ───────────────────── */
const categories: { label: string; match: (tags: string[]) => boolean }[] = [
  { label: "All", match: () => true },
  {
    label: "Hardware",
    match: (tags) =>
      tags.some((t) =>
        ["IoT", "Arduino", "BLE", "Embedded Systems", "LiDAR", "Sensor Fusion"].includes(t),
      ),
  },
  {
    label: "Software",
    match: (tags) =>
      tags.some((t) =>
        ["Swift", "iOS", "Python", "React", "TypeScript", "ARKit"].includes(t),
      ),
  },
  {
    label: "ML / CV",
    match: (tags) =>
      tags.some((t) =>
        ["Computer Vision", "ML Engineering", "PyTorch", "YOLOv11", "Medical AI", "TensorFlow"].includes(t),
      ),
  },
  {
    label: "Design",
    match: (tags) =>
      tags.some((t) =>
        ["CAD", "Prototyping", "UX Design", "Figma", "Product Strategy"].includes(t),
      ),
  },
];

type SortOption = "newest" | "oldest";

function parseYear(timeline: string): number {
  const match = timeline.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

export function WorkPageContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    const category = categories.find((c) => c.label === activeFilter);
    const result = category
      ? allProjects.filter((p) => category.match(p.tags))
      : allProjects;

    return [...result].sort((a, b) => {
      const ya = parseYear(a.timeline);
      const yb = parseYear(b.timeline);
      return sort === "newest" ? yb - ya : ya - yb;
    });
  }, [activeFilter, sort]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-[var(--accent)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
              Work
            </span>
          </motion.div>

          <div className="mt-8">
            <TextReveal delay={0.3}>
              <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[var(--text)]">
                All projects.
              </h1>
            </TextReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]"
          >
            Product design, embedded systems, computer vision, and spatial
            computing.
          </motion.p>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 1,
            ease: [0.77, 0, 0.175, 1] as const,
          }}
          className="absolute bottom-0 left-6 right-6 origin-left lg:left-12 lg:right-12"
        >
          <div className="divider" />
        </motion.div>
      </section>

      {/* Filter + Sort bar */}
      <section className="px-6 pt-16 lg:px-12 lg:pt-24">
        <div className="mx-auto max-w-[var(--container-max)]">
          <FadeUp>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveFilter(cat.label)}
                    className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all ${
                      activeFilter === cat.label
                        ? "bg-[var(--text)] text-[var(--background)]"
                        : "border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-subtle)] hover:text-[var(--text)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort toggle */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                  Sort
                </span>
                <button
                  onClick={() =>
                    setSort((s) => (s === "newest" ? "oldest" : "newest"))
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors hover:border-[var(--text-subtle)] hover:text-[var(--text)]"
                >
                  {sort === "newest" ? "Newest" : "Oldest"}
                  <svg
                    className={`h-3 w-3 transition-transform ${sort === "oldest" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[var(--container-max)]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${activeFilter}-${sort}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="h-full"
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-[var(--text-muted)]">
                No projects match this filter.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--text)]"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
