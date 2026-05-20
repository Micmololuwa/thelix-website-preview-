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

export function Footer() {
  return (
    <footer className="bg-[#1c1714] pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 lg:justify-between mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d840ca7463e4773ecd0f97ee78112084829c961e?width=409"
              alt="Thelix Holdings"
              className="h-16 w-auto mb-5"
            />
            <p className="text-white/80 text-base leading-[23px] font-jakarta">
              Building sustainable economic and social wealth through six strategic business
              units, operational excellence, and community empowerment across global markets.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-32">
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
