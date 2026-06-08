import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS: { label: string; to: string; external?: boolean }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Founder", to: "/founder" },
  { label: "Solutions", to: "/solutions" },
  { label: "Philanthropy", to: "/philanthropy" },
  { label: "News", to: "/news" },
  { label: "Blog", to: "/blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-white/40 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] flex items-center justify-between h-[70px]">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img
            src="/Thelix logo.png"
            alt="Thelix Holdings"
            className="h-9 w-auto"
          />
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
                  pathname === link.to
                    ? "text-thelix-orange"
                    : "text-black hover:text-thelix-orange"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
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
                className="block py-3 text-black font-medium text-sm font-jakarta border-b border-gray-50 hover:text-thelix-orange transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
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
