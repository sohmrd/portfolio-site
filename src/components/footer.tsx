import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text)]">
            Sohm Dubey
          </p>
          <p className="text-xs text-[var(--text-subtle)]">
            Creative Technologist &middot; Georgia Tech 2026
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/sohmdubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/sohmdubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            GitHub
          </a>
          <a
            href="mailto:sohmdubey@gmail.com"
            className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
