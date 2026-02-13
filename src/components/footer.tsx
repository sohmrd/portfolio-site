export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="divider" />
        <div className="flex flex-col items-center justify-between gap-8 pt-12 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
              Sohm Dubey
            </p>
            <p className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-subtle)] opacity-60">
              Design + Code, Georgia Tech 2026
            </p>
          </div>

          <div className="flex items-center gap-8">
            {[
              { href: "https://linkedin.com/in/sohmdubey", label: "LinkedIn" },
              { href: "https://github.com/sohmrd", label: "GitHub" },
              { href: "mailto:sohmdubey@gmail.com", label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
