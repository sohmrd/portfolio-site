"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--background)]/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
          >
            Sohm Dubey
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => {
              const isActive =
                link.href === "/work"
                  ? pathname.startsWith("/work")
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href="mailto:sohmdubey@gmail.com"
              className="text-[13px] font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--accent)]"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative flex h-8 w-8 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 0, width: 20 }
                  : { rotate: 0, y: -4, width: 20 }
              }
              transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
              className="absolute block h-px bg-[var(--text)]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute block h-px w-5 bg-[var(--text)]"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: 0, width: 20 }
                  : { rotate: 0, y: 4, width: 20 }
              }
              transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
              className="absolute block h-px bg-[var(--text)]"
            />
          </button>
        </nav>

        {/* Subtle bottom line when scrolled */}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border-color)]"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--background)] md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-12">
              <nav className="space-y-2">
                {links.map((link, i) => {
                  const isActive =
                    link.href === "/work"
                      ? pathname.startsWith("/work")
                      : pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-3 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,3.5rem)] font-bold leading-[1.1] tracking-tight transition-colors ${
                          isActive
                            ? "text-[var(--text)]"
                            : "text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <a
                    href="mailto:sohmdubey@gmail.com"
                    className="block py-3 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-[var(--text-subtle)] transition-colors hover:text-[var(--text-muted)]"
                  >
                    Contact
                  </a>
                </motion.div>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16 flex gap-6"
              >
                <a
                  href="https://linkedin.com/in/sohmdubey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)] transition-colors hover:text-[var(--accent)]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/sohmrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)] transition-colors hover:text-[var(--accent)]"
                >
                  GitHub
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
