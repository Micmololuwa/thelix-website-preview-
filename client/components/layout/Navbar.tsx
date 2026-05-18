import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Solutions", to: "/solutions" },
  { label: "Philanthropy", to: "/philanthropy" },
  { label: "News", to: "/news" },
] as const;

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
          {NAV_LINKS.map((link) => (
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
          ))}
          <Link
            to="/career"
            className="px-5 py-2 bg-thelix-orange text-white text-sm font-medium font-jakarta rounded hover:bg-orange-500 transition-colors"
          >
            Join Us
          </Link>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block py-3 text-black font-medium text-sm font-jakarta border-b border-gray-50 hover:text-thelix-orange transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              to="/career"
              className="inline-block px-5 py-2 bg-thelix-orange text-white text-sm font-medium font-jakarta rounded hover:bg-orange-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
