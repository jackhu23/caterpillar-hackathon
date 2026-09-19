"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Globe, MapPin, Menu, Search, X } from "lucide-react";

const primaryLinks = [
  "Products",
  "Industries",
  "Innovation",
  "Company",
  "Careers",
  "Investors",
];

const utilityLinks = ["Contact us", "Sign in"];

export function CatWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex font-display text-[2rem] leading-none font-black tracking-tight text-paper ${className}`}
    >
      CAT
      <span
        aria-hidden
        className="absolute bottom-[0.14em] left-[1.02em] h-0 w-0 border-x-[0.2em] border-b-[0.28em] border-x-transparent border-b-cat-yellow"
      />
    </span>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-iron text-paper">
      <div className="hidden border-b border-steel/40 md:block">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-end gap-6 px-6 text-[13px] text-paper/70">
          <a href="#" className="flex items-center gap-1.5 hover:text-paper">
            <Globe className="size-3.5" aria-hidden />
            Global (English)
          </a>
          {utilityLinks.map((label) => (
            <a key={label} href="#" className="hover:text-paper">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-10 px-6">
        <a href="#" aria-label="Caterpillar home" className="shrink-0">
          <CatWordmark />
        </a>

        <nav aria-label="Primary" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-7">
            {primaryLinks.map((label) => (
              <li key={label} className="h-full">
                <a
                  href="#"
                  className="relative flex h-full items-center text-[15px] font-semibold text-paper/90 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-cat-yellow after:transition-transform hover:text-paper hover:after:scale-x-100 focus-visible:after:scale-x-100"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search caterpillar.com"
            className="grid size-11 place-items-center text-paper/90 hover:text-cat-yellow"
          >
            <Search className="size-5" aria-hidden />
          </button>
          <a
            href="#"
            className="hidden items-center gap-2 rounded-machined bg-cat-yellow px-4 py-2.5 text-[15px] font-bold text-iron transition-colors hover:bg-paper sm:flex"
          >
            <MapPin className="size-4" aria-hidden />
            Find a dealer
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center text-paper lg:hidden"
          >
            {menuOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduceMotion ? false : { height: 0 }}
            animate={{ height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden border-t border-steel/40 bg-iron lg:hidden"
          >
            <ul className="px-6 py-4">
              {primaryLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-steel/30 py-3.5 font-display text-2xl font-bold hover:text-cat-yellow"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 pb-6 text-sm text-paper/70">
              <a
                href="#"
                className="flex items-center gap-2 rounded-machined bg-cat-yellow px-4 py-2.5 font-bold text-iron sm:hidden"
              >
                <MapPin className="size-4" aria-hidden />
                Find a dealer
              </a>
              {utilityLinks.map((label) => (
                <a key={label} href="#" className="hover:text-paper">
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
