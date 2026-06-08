import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS: { label: string; to: string; external?: boolean }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Founder", to: "/founder" },
  { label: "Solutions", to: "/solutions" },
  { label: "Philanthropy", to: "/philanthropy" },
];

const RESOURCES_LINKS = [
  { label: "News", to: "/news" },
  { label: "Blog", to: "/blog" },
];

function ResourcesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname === "/news" || pathname === "/blog";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 font-medium text-sm font-jakarta transition-colors ${
          isActive ? "text-thelix-orange" : "text-black hover:text-thelix-orange"
        }`}
      >
        Resources
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {RESOURCES_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-jakarta transition-colors hover:bg-orange-50 hover:text-thelix-orange ${
                pathname === link.to ? "text-thelix-orange bg-orange-50/60" : "text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-white/40 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] flex items-center justify-between h-[70px]">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img src="/Thelix logo.png" alt="Thelix Holdings" className="h-9 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                className="font-medium text-sm font-jakarta transition-colors text-black hover:text-thelix-orange"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`font-medium text-sm font-jakarta transition-colors ${
                  pathname === link.to ? "text-thelix-orange" : "text-black hover:text-thelix-orange"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <ResourcesDropdown pathname={pathname} />
          <a
            href="https://jobs.thelixholdings.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-thelix-orange text-white text-sm font-medium font-jakarta rounded hover:bg-orange-500 transition-colors"
          >
            Join Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                className="block py-3 text-black font-medium text-sm font-jakarta border-b border-gray-50 hover:text-thelix-orange transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`block py-3 font-medium text-sm font-jakarta border-b border-gray-50 transition-colors ${
                  pathname === link.to ? "text-thelix-orange" : "text-black hover:text-thelix-orange"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Resources accordion in mobile */}
          <div className="border-b border-gray-50">
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className={`w-full flex items-center justify-between py-3 font-medium text-sm font-jakarta transition-colors ${
                pathname === "/news" || pathname === "/blog" ? "text-thelix-orange" : "text-black"
              }`}
            >
              Resources
              <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>
            {resourcesOpen && (
              <div className="pl-4 pb-2 flex flex-col gap-0">
                {RESOURCES_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => { setMobileOpen(false); setResourcesOpen(false); }}
                    className={`block py-2.5 text-sm font-jakarta transition-colors ${
                      pathname === link.to ? "text-thelix-orange" : "text-black/70 hover:text-thelix-orange"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4">
            <a
              href="https://jobs.thelixholdings.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 bg-thelix-orange text-white text-sm font-medium font-jakarta rounded hover:bg-orange-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Join Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
