"use client";

import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/fade-up";

const featuredProjects = getFeaturedProjects();

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-end px-6 pb-20 pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-screen-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            Creative Technologist
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight text-[var(--text)] md:text-7xl"
          >
            I design physical products and write the code that powers them.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]"
          >
            Georgia Tech senior studying Industrial Design and Computer Science.
            Building at the intersection of hardware, AI, and spatial computing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <a
              href="#work"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              View Work
            </a>
            <a
              href="/about"
              className="rounded-full border border-[var(--border-color)] px-6 py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--text-subtle)] hover:text-[var(--text)]"
            >
              About Me
            </a>
          </motion.div>
        </div>

        {/* Subtle gradient accent */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[var(--accent)]/[0.03] to-transparent" />
      </section>

      {/* Work */}
      <section id="work" className="px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
              Selected Work
            </h2>
            <p className="mt-3 max-w-lg text-base text-[var(--text-muted)]">
              Projects spanning IoT hardware, computer vision, spatial computing,
              and product strategy.
            </p>
          </FadeUp>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Preview */}
      <section className="px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                About
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
                Design-trained engineer.
                <br />
                Code-literate designer.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--text-muted)]">
                I hold dual majors in Industrial Design and Computer Science at
                Georgia Tech, with threads in Intelligence and Devices. I believe
                the best products come from people who can sketch a form factor
                and write the firmware that drives it.
              </p>
              <a
                href="/about"
                className="mt-6 inline-block text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                Read more &rarr;
              </a>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Industrial Design", detail: "Form, materials, user research" },
                  { label: "Computer Science", detail: "AI/ML, embedded, spatial" },
                  { label: "Prototyping", detail: "CAD, 3D printing, Arduino" },
                  { label: "Software", detail: "iOS, Python, React, C++" },
                ].map((skill) => (
                  <div
                    key={skill.label}
                    className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-4"
                  >
                    <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text)]">
                      {skill.label}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {skill.detail}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[var(--border-color)] px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl text-center">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Contact
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-[var(--text-muted)]">
              I&apos;m looking for full-time roles in creative technology, design
              engineering, and product design engineering starting 2026.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:sohmdubey@gmail.com"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                sohmdubey@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/sohmdubey"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-color)] px-6 py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--text-subtle)] hover:text-[var(--text)]"
              >
                LinkedIn
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
