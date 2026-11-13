import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Companies", href: "/#our-companies" },
  { label: "Our Impact", href: "/impact" },
  { label: "Leadership", href: "/leadership" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "News & Insights", href: "https://blog.thelixholdings.com", external: true },
];

export function InnerPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6">
      <motion.nav
        initial={false}
        animate={{ height: isMenuOpen ? "calc(100svh - 32px)" : "var(--header-height)" }}
        transition={reduceMotion ? { duration: 0 } : { duration: isMenuOpen ? 0.55 : 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="mx-auto flex max-w-[1320px] flex-col overflow-hidden rounded-[5px] border border-black bg-white [--header-height:76px] sm:[--header-height:88px]"
        aria-label="Primary navigation"
      >
        <div className="flex h-[74px] shrink-0 items-center justify-between px-3 sm:h-[86px] sm:px-4">
          <a href="/" className="flex min-h-11 items-center" aria-label="Thelix Holdings home">
            <img src="/thelix-logo.svg" alt="Thelix Holdings" className="h-10 w-auto sm:h-12" />
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://jobs.thelixholdings.com/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center rounded-[3px] bg-black pl-5 pr-[18px] text-sm font-bold uppercase text-white transition-transform duration-150 active:scale-[0.96] sm:min-h-[56px] sm:px-8 sm:pr-[30px]">
              Join Us <ChevronRight className="ms-1 size-4" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="relative flex size-11 items-center justify-center rounded-[3px] border border-black bg-white transition-transform duration-150 active:scale-[0.96] sm:size-[56px]" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="inner-page-menu">
              <span className="relative block h-6 w-7" aria-hidden="true">
                <motion.span className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black" initial={false} animate={{ y: isMenuOpen ? 0 : -8, rotate: isMenuOpen ? 45 : 0 }} transition={{ type: "spring", duration: 0.3, bounce: 0 }} />
                <motion.span className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black" initial={false} animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0.25 : 1, filter: isMenuOpen ? "blur(4px)" : "blur(0px)" }} transition={{ type: "spring", duration: 0.3, bounce: 0 }} />
                <motion.span className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black" initial={false} animate={{ y: isMenuOpen ? 0 : 8, rotate: isMenuOpen ? -45 : 0 }} transition={{ type: "spring", duration: 0.3, bounce: 0 }} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div id="inner-page-menu" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.18 }} className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-5 pt-4 sm:px-8 sm:pb-8 lg:px-12">
              <div className="border-t border-black">
                {menuItems.map((item, index) => (
                  <motion.a key={item.label} href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }} onClick={() => setIsMenuOpen(false)} className="group grid min-h-[62px] grid-cols-[38px_1fr] items-center gap-3 border-b border-black py-2 sm:min-h-[74px] sm:grid-cols-[50px_1fr] sm:gap-5">
                    <span className="flex size-7 items-center justify-center border border-black text-[11px] font-semibold tabular-nums sm:size-8">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1.6rem,3.5vw,3rem)] leading-none [font-family:var(--font-display)] transition-transform duration-200 group-hover:translate-x-2">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
