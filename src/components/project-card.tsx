"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isComingSoon = !project.visible;

  const card = (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      whileHover={isComingSoon ? {} : { y: -4, boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] transition-colors ${
        isComingSoon ? "opacity-60" : "hover:border-[var(--accent)]/30"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-hover)]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isComingSoon ? "" : "group-hover:scale-105"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
              {isComingSoon ? "Coming Soon" : "No Image"}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        {!isComingSoon && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="p-5">
              <span className="text-sm font-medium text-[var(--accent)]">
                View Case Study &rarr;
              </span>
            </div>
          </div>
        )}

        {/* Coming Soon badge */}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/40">
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
          {project.title}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--accent-muted)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );

  if (isComingSoon) {
    return card;
  }

  return (
    <Link href={`/work/${project.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
