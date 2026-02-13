"use client";

import { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span className="tabular-nums">{time} ET</span>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8 lg:px-12">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="divider" />
        <div className="grid gap-8 pt-12 md:grid-cols-3 md:gap-4">
          {/* Left — Identity */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--text)]">
              Sohm Dubey
            </p>
            <p className="mt-1 text-xs text-[var(--text-subtle)]">
              Design + Code
            </p>
            <p className="text-xs text-[var(--text-subtle)]">
              Georgia Tech, 2026
            </p>
          </div>

          {/* Center — Links */}
          <div className="flex items-start gap-8 md:justify-center">
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

          {/* Right — Status + Clock */}
          <div className="md:text-right">
            <p className="flex items-center gap-2 text-xs text-[var(--text-subtle)] md:justify-end">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
              Available for opportunities
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-[var(--text-subtle)] opacity-60">
              <LiveClock />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
