import { Link } from "react-router-dom";

const COMPANY_LINKS: { label: string; to: string; external?: boolean }[] = [
  { label: "About Us", to: "/about" },
  { label: "Investment", to: "/investment" },
  { label: "Philanthropy", to: "/philanthropy" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "News", to: "/news" },
  { label: "Careers", to: "https://jobs.thelixholdings.com/", external: true },
];

const SOLUTION_LINKS = [
  { label: "Finance", to: "/solutions" },
  { label: "Edutech", to: "/solutions" },
  { label: "Education", to: "/solutions" },
  { label: "Healthcare", to: "/solutions" },
  { label: "Tourism", to: "/solutions" },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#1c1714] pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 lg:justify-between mb-12">

          {/* Brand */}
          <div className="max-w-xs flex flex-col gap-5">
            <img
              src="/Thelix-white-logo.png"
              alt="Thelix Holdings"
              className="h-16 w-auto object-contain object-left"
            />
            <p className="text-white/80 text-base leading-[23px] font-jakarta">
              Building sustainable economic and social wealth through six strategic business
              units, operational excellence, and community empowerment across global markets.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.linkedin.com/company/thelix-holdings/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-thelix-orange transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://x.com/Thelixholdings"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-white/60 hover:text-thelix-orange transition-colors"
              >
                <XIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/60 hover:text-thelix-orange transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24">
            <div className="flex flex-col gap-6">
              <h4 className="text-white/80 font-bold text-xl font-jakarta leading-[25px]">
                Our Company
              </h4>
              <nav aria-label="Company links" className="flex flex-col gap-1">
                {COMPANY_LINKS.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 text-sm font-jakarta leading-[34px] hover:text-thelix-orange transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-white/80 text-sm font-jakarta leading-[34px] hover:text-thelix-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-white/80 font-bold text-xl font-jakarta leading-[25px]">
                Our Solution
              </h4>
              <nav aria-label="Solution links" className="flex flex-col gap-1">
                {SOLUTION_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-white/80 text-sm font-jakarta leading-[34px] hover:text-thelix-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white/80 font-bold text-xl font-jakarta leading-[25px]">
                Contact Us
              </h4>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-thelix-orange text-xs font-jakarta font-semibold uppercase tracking-wider mb-1">
                    Dallas
                  </p>
                  <p className="text-white/70 text-sm font-jakarta leading-[22px]">
                    14160 N Dallas Parkway,<br />
                    Suite 760,<br />
                    Dallas TX 75254
                  </p>
                </div>
                <div>
                  <p className="text-thelix-orange text-xs font-jakarta font-semibold uppercase tracking-wider mb-1">
                    Lagos
                  </p>
                  <p className="text-white/70 text-sm font-jakarta leading-[22px]">
                    5, Balogun Street,<br />
                    Anifowose, Ikeja,<br />
                    Lagos
                  </p>
                </div>
                <a
                  href="mailto:info@thelixholdings.com"
                  className="text-white/70 text-sm font-jakarta hover:text-thelix-orange transition-colors"
                >
                  info@thelixholdings.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/80 text-base leading-[23px] font-jakarta">
            Copyright © 2025 Thelix Holdings
          </p>
          <p className="text-white/80 text-base leading-[23px] font-jakarta">
            Powered by Thelix Holdings
          </p>
        </div>
      </div>
    </footer>
  );
}
