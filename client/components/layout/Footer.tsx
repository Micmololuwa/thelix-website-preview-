import type { ReactNode } from "react";

const EXPLORE_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Companies", href: "/#our-companies" },
  { label: "Our Impact", href: "/impact" },
  { label: "Our Leadership", href: "/leadership" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "News & Insights", href: "https://blog.thelixholdings.com", external: true },
  { label: "Careers", href: "https://jobs.thelixholdings.com/", external: true },
];

const COMPANY_LINKS = [
  { label: "ExcelMindCyber", href: "https://excelmindcyber.com" },
  { label: "Veripass", href: "https://veripass.co" },
  { label: "Cosella", href: "https://mycosella.com/" },
  { label: "Credit Veto", href: "https://www.creditvetoafrica.com/" },
  { label: "Skill Venture", href: "https://skillventure.com/" },
];
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thelix-holdings/posts/?feedView=all" },
  { label: "Instagram", href: "https://www.instagram.com/_thelixholdings/" },
  { label: "Facebook", href: "https://www.facebook.com/thelixholdings" },
  { label: "YouTube", href: "https://www.youtube.com/@Thelixholdings" },
  { label: "X (Twitter)", href: "https://x.com/Thelixholdings" },
];

const linkClass =
  "inline-flex min-h-10 items-center text-sm text-black transition-opacity duration-150 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

export function Footer({ sharedBackground = false }: { sharedBackground?: boolean }) {
  return (
    <footer
      id="site-footer"
      className={`${sharedBackground ? "bg-transparent" : "bg-neutral-700 bg-[linear-gradient(rgb(15_15_15_/_0.44),rgb(15_15_15_/_0.44)),url('/home_page_photo.jpg')] bg-cover bg-center"} px-5 py-20 sm:px-10 sm:py-24 lg:px-[150px] lg:py-[150px]`}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1440px] rounded-[10px] bg-[#f7f5ef] px-6 py-10 shadow-[0_0_0_1px_rgb(255_255_255_/_0.16),0_24px_70px_-24px_rgb(0_0_0_/_0.48),0_8px_24px_-12px_rgb(0_0_0_/_0.25)] sm:px-10 sm:py-12 lg:min-h-[660px] lg:px-12 lg:py-14">
        <h2 className="mb-20 text-[32px] leading-[1.1] tracking-[-0.02em] text-neutral-950 [text-wrap:balance] lg:mb-24">
          Built on Vision. Driven by Purpose.
        </h2>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <FooterColumn title="Explore">
            {EXPLORE_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={linkClass}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Our Companies">
            {COMPANY_LINKS.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label}</a>)}
          </FooterColumn>

          <FooterColumn title="Get in Touch">
            <div className="space-y-5 pt-3 text-sm leading-[1.65] text-neutral-700">
              <address className="not-italic">
                <strong className="block text-xs uppercase tracking-[0.1em] text-black">Headquarters — Dallas</strong>
                <span className="mt-2 block">14160 N Dallas Parkway,<br />Suite 760,<br />Dallas TX 75254</span>
              </address>
              <address className="not-italic">
                <strong className="block text-xs uppercase tracking-[0.1em] text-black">Lagos</strong>
                <span className="mt-2 block">5, Balogun Street,<br />Anifowose, Ikeja,<br />Lagos</span>
              </address>
              <a href="mailto:info@thelixholdings.com" className="inline-flex min-h-10 items-center underline decoration-black/25 underline-offset-4 transition-opacity duration-150 hover:opacity-60">info@thelixholdings.com</a>
            </div>
          </FooterColumn>

          <FooterColumn title="Follow Our Journey">
            {SOCIAL_LINKS.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label}</a>)}
          </FooterColumn>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-32 lg:grid-cols-2 lg:items-end">
          <img src="/thelix-logo.svg" alt="Thelix Holdings" className="h-14 w-auto object-contain object-left sm:h-16" />
          <p className="text-sm text-neutral-500 lg:text-end">© 2026 Thelix Holdings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-black [font-family:var(--font-body)]">{title}</h3>
      <nav aria-label={title} className="mt-2 flex flex-col items-start">{children}</nav>
    </div>
  );
}
