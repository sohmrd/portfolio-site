"use client";

import { motion } from "framer-motion";
import { FadeUp, TextReveal } from "@/components/motion/fade-up";

const experience = [
  {
    company: "Coca-Cola",
    context: "Georgia Tech Capstone",
    role: "Firmware Lead & iOS Developer",
    period: "2025",
    description:
      "Led firmware and iOS development for a Bluetooth-connected smart water bottle. Built BLE communication layer in Swift, wrote Arduino pump-control firmware, and delivered a working prototype to Coca-Cola engineers.",
  },
  {
    company: "AliveCor",
    context: "Mountain View, CA",
    role: "Product Development Intern",
    period: "2024",
    description:
      "Featured Intern. Designed AI-driven self-service and automated device configurations projected to increase D2C market penetration by 50%. Collaborated across industrial design, hardware, and ML engineering teams to optimize physical sensor design for low-cost, high-fidelity data acquisition.",
  },
  {
    company: "Marche Health",
    context: "Menlo Park, CA",
    role: "UX / Marketing Intern",
    period: "2023",
    description:
      "Designed and optimized a healthcare job platform for life sciences buyers. Collaborated with a UX/UI designer to refine workflows and streamline the interface, reducing click-throughs by 20%.",
  },
  {
    company: "HP Inc.",
    context: "Palo Alto, CA",
    role: "Product Design Intern",
    period: "2020",
    description:
      "Designed and prototyped a calendar optimization tool for remote workers targeting 15% higher productivity. Collaborated with HP lead designers, developed hardware and software concepts, and presented to the full design team.",
  },
  {
    company: "Cyara",
    context: "Redwood City, CA",
    role: "Sales & Marketing Intern",
    period: "2018",
    description:
      "Analyzed market opportunities and conducted lead tracking under the VP of Marketing. Proposed a growth strategy and quarterly plan to drive a 60% revenue increase by entering new markets.",
  },
];

const skills = [
  {
    category: "Design",
    items: ["Industrial Design", "User Research", "SolidWorks / Fusion 360", "Rapid Prototyping", "Figma", "Adobe Creative Cloud"],
  },
  {
    category: "Software",
    items: ["Python / PyTorch / TensorFlow", "Swift / SwiftUI", "TypeScript / React", "C/C++ / Java", "Computer Vision (YOLO)", "ARKit / Sensor Fusion"],
  },
  {
    category: "Hardware",
    items: ["Embedded Systems", "BLE / IoT / Arduino", "3D Printing / CNC", "Laser Cutting", "PCB Design", "LiDAR"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-[var(--accent)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
              About
            </span>
          </motion.div>

          <div className="mt-8">
            <TextReveal delay={0.3}>
              <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[var(--text)]">
                I think in sketches
              </h1>
            </TextReveal>
            <TextReveal delay={0.45}>
              <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[var(--text-muted)]">
                and ship in code.
              </h1>
            </TextReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 max-w-2xl space-y-5 text-lg leading-[1.8] text-[var(--text-muted)]"
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
              consumer devices for Coca-Cola, designed AI-driven configurations at
              AliveCor, trained computer vision models for fashion detection,
              and developed spatial computing apps with iPhone LiDAR. Before
              college, I co-founded AI Square, a crowdsourced AI research
              platform, and studied product design at the Stanford d.school.
            </p>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.77, 0, 0.175, 1] }}
          className="absolute bottom-0 left-6 right-6 origin-left lg:left-12 lg:right-12"
        >
          <div className="divider" />
        </motion.div>
      </section>

      {/* Education + Objective */}
      <section className="px-6 py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <FadeUp>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                  Education
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
                  Georgia Tech
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                  B.S. Industrial Design
                  <br />
                  B.S. Computer Science
                </p>
                <p className="mt-2 text-sm text-[var(--text-subtle)]">
                  CS Threads: Intelligence, Devices
                </p>
                <p className="mt-1 text-sm text-[var(--text-subtle)]">
                  Expected Dec 2025 / Spring 2026
                </p>

                <div className="mt-8 space-y-3 border-t border-[var(--border-color)] pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    Certificate Programs
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Stanford d.school, Product Design
                    <span className="ml-2 text-[var(--text-subtle)]">2018</span>
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    UC Berkeley, Environmental Design
                    <span className="ml-2 text-[var(--text-subtle)]">2019</span>
                  </p>
                </div>
              </FadeUp>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <FadeUp delay={0.15}>
                <p className="text-lg leading-[1.8] text-[var(--text-muted)]">
                  I am looking for roles where I can combine both halves of my
                  background: creative technologist, design engineer, or product
                  design engineer. I want to be at a company where the people who
                  design the product also understand the technology inside it.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[var(--container-max)]">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                  Experience
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
                  Where I have worked
                </h2>
              </div>
            </div>
            <div className="divider mt-8" />
          </FadeUp>

          <div className="mt-12 space-y-0 divide-y divide-[var(--border-color)]">
            {experience.map((exp, i) => (
              <FadeUp key={exp.company} delay={i * 0.1}>
                <div className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12">
                  <div className="md:col-span-3">
                    <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text)] md:text-2xl">
                      {exp.company}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                      {exp.context} / {exp.period}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-sm font-medium text-[var(--accent)]">
                      {exp.role}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[var(--container-max)]">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
              Capabilities
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
              What I bring
            </h2>
            <div className="divider mt-8" />
          </FadeUp>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--border-color)] md:grid-cols-3">
            {skills.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.1}>
                <div className="bg-[var(--surface)] p-8 md:p-10">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    {group.category}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {group.items.map((item) => (
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
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="divider" />
          <div className="py-24 text-center md:py-32">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-subtle)]">
                Get in touch
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--text)] md:text-6xl lg:text-7xl">
                Let&apos;s build something together.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
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
