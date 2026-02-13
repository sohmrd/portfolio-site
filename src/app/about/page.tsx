"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/fade-up";

const experience = [
  {
    company: "Coca-Cola (Georgia Tech Capstone)",
    role: "Firmware Lead & iOS Developer",
    period: "2025",
    description:
      "Led firmware and iOS development for a Bluetooth-connected smart water bottle. Delivered working prototype to Coca-Cola engineers.",
  },
  {
    company: "AliveCor",
    role: "Product Development Intern (Featured)",
    period: "2024",
    description:
      "Ran a device configuration audit, developed D2C strategy, and shipped 5 deliverables across hardware, ML, and customer success teams.",
  },
  {
    company: "HP Inc.",
    role: "Product Design Intern",
    period: "2023",
    description:
      "Industrial design work on consumer products. Contributed to form factor exploration and rapid prototyping.",
  },
];

const skills = [
  {
    category: "Design",
    items: [
      "Industrial Design",
      "User Research",
      "CAD (SolidWorks, Fusion 360)",
      "Prototyping & Fabrication",
      "Figma",
      "Adobe Creative Suite",
    ],
  },
  {
    category: "Software",
    items: [
      "Python (PyTorch, TensorFlow)",
      "Swift / SwiftUI",
      "TypeScript / React",
      "C++ / Arduino",
      "Computer Vision (YOLO, OpenCV)",
      "ARKit / SceneKit",
    ],
  },
  {
    category: "Hardware",
    items: [
      "Embedded Systems",
      "BLE / IoT",
      "Sensor Fusion",
      "3D Printing",
      "PCB Design",
      "LiDAR",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-16 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-screen-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-[var(--text)] md:text-6xl"
          >
            I think in sketches and ship in code.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--text-muted)]"
          >
            <p>
              I am a senior at Georgia Tech dual-majoring in Industrial Design and
              Computer Science, with threads in Intelligence and Devices. That
              combination means I can sketch a product concept in the morning, CAD
              the enclosure after lunch, and write the embedded firmware by evening.
            </p>
            <p>
              My work sits at the intersection of physical product design and
              real software engineering. I have built Bluetooth-connected
              consumer devices for Coca-Cola, run product strategy at a medical
              AI company (AliveCor), trained computer vision models for fashion
              detection, and developed spatial computing apps with iPhone LiDAR.
            </p>
            <p>
              I am looking for roles where I can combine both halves of my
              background: creative technologist, design engineer, or product
              design engineer. I want to be at a company where the people who
              design the product also understand the technology inside it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
              Education
            </h2>
            <div className="mt-6 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
                  Georgia Institute of Technology
                </h3>
                <span className="text-sm text-[var(--text-muted)]">
                  Expected Dec 2025 / Spring 2026
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                B.S. Industrial Design & B.S. Computer Science
              </p>
              <p className="mt-1 text-sm text-[var(--text-subtle)]">
                CS Threads: Intelligence, Devices
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
              Experience
            </h2>
          </FadeUp>
          <div className="mt-6 space-y-4">
            {experience.map((exp, i) => (
              <FadeUp key={exp.company} delay={i * 0.1}>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)]">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-[var(--text-subtle)]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                    {exp.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {exp.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
              Skills
            </h2>
          </FadeUp>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {skills.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.1}>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                    {group.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[var(--text-muted)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border-color)] px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl text-center">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--text)] md:text-4xl">
              Interested in working together?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-[var(--text-muted)]">
              I am targeting creative technologist, design engineer, and product
              design engineer roles for 2026.
            </p>
            <a
              href="mailto:sohmdubey@gmail.com"
              className="mt-8 inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              sohmdubey@gmail.com
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
