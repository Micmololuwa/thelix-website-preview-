import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  ScaleIn,
  StaggerGrid,
  StaggerItem,
  PageTransition,
} from "@/components/ui/motion";

// ---- Reusable SVG Icons ----

const LightbulbIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect width="48" height="48" rx="24" fill="white" fillOpacity="0.1" />
    <path d="M34.4675 19.5387C34.4713 21.0599 34.1277 22.5619 33.4628 23.9301C32.798 25.2984 31.8295 26.4967 30.6311 27.4338C30.374 27.6314 30.1654 27.8851 30.0213 28.1756C29.8772 28.4661 29.8015 28.7857 29.7999 29.11V29.8106C29.7999 30.0252 29.7576 30.2378 29.6754 30.436C29.5932 30.6343 29.4727 30.8145 29.3208 30.9661C29.1689 31.1178 28.9886 31.2381 28.7903 31.3201C28.5919 31.402 28.3793 31.4441 28.1646 31.4438H20.6949C20.2617 31.4438 19.8463 31.2718 19.54 30.9655C19.2337 30.6592 19.0616 30.2437 19.0616 29.8106V29.1081C19.0604 28.7876 18.9861 28.4717 18.8444 28.1843C18.7027 27.8969 18.4974 27.6455 18.244 27.4494C17.0494 26.5186 16.082 25.3283 15.415 23.9687C14.7481 22.609 14.3989 21.1155 14.394 19.6011C14.3627 14.1627 18.7572 9.63556 24.1897 9.50287C25.5278 9.47087 26.8588 9.70679 28.1043 10.1968C29.3499 10.6867 30.4848 11.4209 31.4425 12.3559C32.4001 13.291 33.161 14.4082 33.6806 15.6417C34.2001 16.8752 34.4676 18.2002 34.4675 19.5387ZM33.0664 19.5387C33.0668 18.3868 32.8366 17.2465 32.3896 16.1849C31.9425 15.1233 31.2876 14.1619 30.4633 13.3573C29.6391 12.5526 28.6621 11.9211 27.5901 11.4997C26.518 11.0784 25.3725 10.8758 24.221 10.9039C19.5475 11.021 15.7677 14.9101 15.7931 19.5874C15.7965 20.8913 16.0968 22.1773 16.6712 23.3478C17.2456 24.5183 18.0791 25.5426 19.1084 26.343C19.5307 26.67 19.8723 27.0895 20.1071 27.5692C20.3418 28.0488 20.4635 28.576 20.4627 29.11V29.8106C20.4627 29.8413 20.4687 29.8718 20.4805 29.9002C20.4923 29.9286 20.5095 29.9544 20.5312 29.9761C20.553 29.9979 20.5788 30.0151 20.6072 30.0269C20.6356 30.0387 20.6661 30.0447 20.6968 30.0447H28.1646C28.2267 30.0447 28.2863 30.02 28.3302 29.9761C28.3741 29.9322 28.3988 29.8727 28.3988 29.8106V29.1081C28.3999 28.5723 28.5236 28.0439 28.7603 27.5633C28.9971 27.0827 29.3407 26.6626 29.7647 26.3352C30.797 25.5292 31.6312 24.4977 32.2034 23.3197C32.7757 22.1416 33.0709 20.8483 33.0664 19.5387ZM30.7248 18.4888C30.4924 17.183 29.8647 15.98 28.9267 15.0424C27.9887 14.1047 26.7855 13.4775 25.4796 13.2456C25.3029 13.2287 25.1264 13.2793 24.9855 13.3873C24.8447 13.4952 24.7499 13.6525 24.7202 13.8275C24.6905 14.0025 24.7282 14.1822 24.8257 14.3305C24.9231 14.4789 25.0731 14.5848 25.2454 14.6271C27.2748 14.9686 28.9959 16.6916 29.3393 18.723C29.3816 18.8954 29.4876 19.0453 29.6359 19.1428C29.7843 19.2402 29.964 19.2779 30.139 19.2482C30.314 19.2185 30.4712 19.1238 30.5792 18.9829C30.6871 18.842 30.7378 18.6655 30.7209 18.4888ZM29.7999 33.8206C29.7999 34.0065 29.7261 34.1849 29.5948 34.3166C29.4635 34.4483 29.2853 34.5225 29.0993 34.5231H19.7621C19.67 34.5231 19.5788 34.5049 19.4937 34.4697C19.4086 34.4344 19.3312 34.3827 19.2661 34.3176C19.2009 34.2525 19.1493 34.1751 19.114 34.09C19.0788 34.0049 19.0606 33.9137 19.0606 33.8216C19.0606 33.7294 19.0788 33.6382 19.114 33.5531C19.1493 33.468 19.2009 33.3907 19.2661 33.3255C19.3312 33.2604 19.4086 33.2087 19.4937 33.1734C19.5788 33.1382 19.67 33.12 19.7621 33.12H29.0993C29.2856 33.12 29.4643 33.1941 29.5961 33.3258C29.7278 33.4575 29.8018 33.6362 29.8018 33.8225ZM28.3071 36.8979C28.3066 37.0838 28.2323 37.262 28.1006 37.3933C27.969 37.5246 27.7906 37.5984 27.6046 37.5984H21.2588C21.073 37.5984 20.8948 37.5246 20.7635 37.3932C20.6321 37.2618 20.5583 37.0836 20.5583 36.8979C20.5583 36.7121 20.6321 36.5339 20.7635 36.4025C20.8948 36.2711 21.073 36.1973 21.2588 36.1973H27.6085C27.7945 36.1978 27.9727 36.2721 28.104 36.4038C28.2353 36.5354 28.309 36.7138 28.309 36.8998Z" fill="white" />
  </svg>
);

const CheckIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <g clipPath="url(#check-clip)">
      <path d="M13.5 24.75C14.9776 24.7518 16.4411 24.4617 17.8062 23.8962C19.1714 23.3307 20.4113 22.501 21.4549 21.4549C22.501 20.4113 23.3307 19.1714 23.8962 17.8062C24.4617 16.4411 24.7518 14.9776 24.75 13.5C24.7518 12.0224 24.4617 10.5589 23.8962 9.19378C23.3307 7.82863 22.501 6.58867 21.4549 5.54513C20.4113 4.49897 19.1714 3.66932 17.8062 3.10384C16.4411 2.53835 14.9776 2.24819 13.5 2.25001C12.0224 2.24819 10.5589 2.53835 9.19378 3.10384C7.82863 3.66932 6.58867 4.49897 5.54513 5.54513C4.49897 6.58867 3.66932 7.82863 3.10384 9.19378C2.53835 10.5589 2.24819 12.0224 2.25001 13.5C2.24819 14.9776 2.53835 16.4411 3.10384 17.8062C3.66932 19.1714 4.49897 20.4113 5.54513 21.4549C6.58867 22.501 7.82863 23.3307 9.19378 23.8962C10.5589 24.4617 12.0224 24.7518 13.5 24.75Z" fill="white" stroke="white" strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M9 13.5L12.375 16.875L19.125 10.125" stroke="#F48220" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="check-clip">
        <rect width="27" height="27" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const QuoteIcon = () => (
  <svg width="123" height="99" viewBox="0 0 123 99" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69.8493 98.8956V69.1577C69.8493 50.4851 74.2293 35.2705 82.9893 23.5136C91.9798 11.5263 105.235 3.68841 122.755 0V22.4763C114.917 24.3205 108.693 27.7784 104.082 32.8499C99.4719 37.691 96.475 43.5694 95.0919 50.4851H115.839V98.8956H69.8493ZM0 98.8956V69.1577C0 50.4851 4.37999 35.2705 13.14 23.5136C22.1305 11.5263 35.2704 3.68841 52.5599 0V22.4763C44.722 24.3205 38.4978 27.7784 33.8873 32.8499C29.2768 37.691 26.2799 43.5694 24.8968 50.4851H45.6441V98.8956H0Z" fill="#F48220" />
  </svg>
);

// ---- Hero Section ----
const HeroSection = () => (
  <section
    className="w-full"
    style={{
      background: "linear-gradient(180deg, #C4DFE8 0%, #F6F6F5 30.55%, #F2D1C0 59.77%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-24 pb-0">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <motion.h1
          className="text-[43px] sm:text-[58px] lg:text-[78px] font-bold text-black font-jakarta leading-[1.1]"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Leading the way in global innovation
        </motion.h1>
        <motion.p
          className="text-black/80 text-base leading-[25px] max-w-[675px] font-jakarta mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          Unlocking potentials, impacting 300,000+ lives by 2030 through six strategic business
          units built to transform industries. Creating pathways to economic freedom across continents.
        </motion.p>
      </div>
    </div>
    <FadeIn>
      <div className="w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/0a6d6ea00c511924219aea8f4bcaf4a9cf5542ab?width=2880"
          alt="Thelix global innovation"
          className="w-full h-auto"
        />
      </div>
    </FadeIn>
  </section>
);

// ---- Partners Section ----
const partnerLogos = [
  { src: "/emc.png", alt: "ExcelMind Cyber" },
  { src: "/excelmind.png", alt: "ExcelMind" },
  { src: "/lft.png", alt: "Lightforth" },
  { src: "/Vizacheck.png", alt: "Vizacheck" },
  { src: "/veripass.png", alt: "Veripass" },
  { src: "/creditveto.png", alt: "Credit Veto" },
];

const PartnersSection = () => (
  <section className="bg-white py-8 border-b border-gray-100">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <StaggerGrid className="flex flex-wrap items-center justify-between gap-8">
        {partnerLogos.map((logo) => (
          <StaggerItem key={logo.alt}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto object-contain"
            />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  </section>
);

// ---- Orange Features Banner ----
const OrangeFeaturesBanner = () => (
  <section className="bg-thelix-orange py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col gap-12 lg:gap-20">
        <FadeUp>
          <div className="flex flex-col gap-3 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-white font-jakarta leading-tight tracking-[2.6px]">
              Building Tomorrow's Economy Through Strategic Business Units
            </h2>
            <p className="text-white/80 text-base leading-[25px] max-w-[868px] font-jakarta">
              We built and operate high-impact companies across fintech, EdTech, cybersecurity,
              education, identity verification, and healthcare — each one designed to transform its
              industry and create lasting value across emerging and developed markets.
            </p>
          </div>
        </FadeUp>

        <StaggerGrid className="flex flex-col sm:flex-row gap-4">
          {[
            "Strategic business units built from the ground up to solve real problems at global scale",
            "Deep operational expertise embedded across every company we own and operate",
            "Community empowerment programmes that create lasting economic freedom",
          ].map((text, i) => (
            <StaggerItem key={i}>
              <div className="flex-1 flex items-center gap-4 px-5 py-5 rounded-full border border-white">
                <CheckIcon />
                <p className="text-white/80 text-base leading-5 font-jakarta">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  </section>
);

// ---- Venture Cards Section ----
const VentureCardsSection = () => {
  const cards = [
    { text: "We build the knowledge and tools that protect individuals, businesses, and communities in an increasingly complex world." },
    { text: "We create the systems that move talented professionals from where they are to where they deserve to be." },
    { text: "Thelix opens the doors — to markets, to mobility, to financial participation — that should never have been closed." },
    { text: "We verify identity and enable access so no one is locked out of the opportunities, markets, or systems they deserve to participate in." },
  ];

  return (
    <section className="bg-[#160A00] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <SlideLeft className="flex flex-col gap-6 lg:w-[45%] lg:flex-shrink-0">
            <h2 className="text-4xl sm:text-[45px] font-bold text-white font-jakarta leading-tight tracking-[1.8px]">
              Built to Remove the Barriers That Hold People Back
            </h2>
            <p className="text-white/80 text-base leading-[27px] font-jakarta">
              Thelix Holdings was built to remove those barriers — across cybersecurity, education,
              career technology, financial services, and global mobility. A shared conviction that
              the right system, built well, changes lives at scale.
            </p>
          </SlideLeft>

          <SlideRight className="flex-1 flex flex-col sm:flex-row gap-4" style={{ minHeight: "560px" }}>
            {/* Left column */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col justify-between p-5 rounded-xl border border-black/5 bg-thelix-orange h-[300px]">
                <LightbulbIcon />
                <p className="text-white font-medium text-base font-jakarta tracking-[0.84px] leading-normal">
                  {cards[0].text}
                </p>
              </div>
              <div className="flex flex-col justify-between p-5 rounded-xl border border-black/5 bg-thelix-orange flex-1">
                <LightbulbIcon />
                <p className="text-white font-medium text-base font-jakarta tracking-[0.84px] leading-normal">
                  {cards[2].text}
                </p>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col justify-between p-5 rounded-xl border border-black/5 bg-thelix-orange flex-1">
                <LightbulbIcon />
                <p className="text-white font-medium text-base font-jakarta tracking-[0.84px] leading-normal">
                  {cards[1].text}
                </p>
              </div>
              <div className="flex flex-col justify-between p-5 rounded-xl border border-black/5 bg-thelix-orange h-[300px]">
                <LightbulbIcon />
                <p className="text-white font-medium text-base font-jakarta tracking-[0.84px] leading-normal">
                  {cards[3].text}
                </p>
              </div>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
};

// ---- Portfolio Gallery Section ----
const businessUnits = [
  {
    id: "financial",
    label: "Financial Services",
    logo: "/Creditveto-white.png",
    raw: true,
    description: "Pioneering credit access and financial inclusion for underserved communities, removing barriers and enabling more people to access the capital they need.",
    url: "https://www.creditvetoafrica.com/",
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "edtech",
    label: "Ed-Tech",
    logo: "/excelmind.png",
    raw: false,
    description: "Delivering world-class digital learning at scale, bridging the gap between education and employment across Africa and global markets.",
    url: "https://excelmind.org/",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "education",
    label: "Education",
    logo: "/emc.png",
    raw: false,
    description: "Equipping individuals and organisations with the cybersecurity knowledge and skills required to thrive in today's increasingly complex threat landscape.",
    url: "https://excelmindcyber.com/",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "tourism",
    label: "Tourism",
    logo: "/veripass.png",
    raw: false,
    description: "A business-led, company-funded immigration model — built for founders, executives, and exceptional professionals who want to expand to the American market.",
    url: "https://veripass.org/",
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "visa",
    label: "Visa Screening",
    logo: "/Vizacheck.png",
    raw: false,
    description: "VizaCheck cross-references your visa forms, documents, and social media profiles to flag rejection risks before embassy submission.",
    url: "https://vizacheck.com/",
    src: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "career",
    label: "Career",
    logo: "/lft.png",
    raw: false,
    description: "Lightforth is an AI-powered career acceleration platform. We optimize your resume for any job, automatically apply to matching opportunities, and prepare you to ace every interview — all in one place.",
    url: "https://lightforth.ai/",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
  },
];

const PortfolioSection = () => {
  const [active, setActive] = useState<string>("financial");

  return (
    <section className="py-16 lg:py-24" style={{ background: "rgba(13,6,0,0.03)" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <FadeUp className="text-center mb-12">
          <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
            Our Business Units
          </h2>
          <p className="text-black/80 text-base leading-[25px] font-jakarta mt-3 max-w-xl mx-auto">
            Companies we built across the sectors defining the global economy of tomorrow —
            each designed to deliver measurable industry impact and sustainable long-term growth.
          </p>
        </FadeUp>

        {/* Desktop accordion */}
        <FadeIn>
          <div className="hidden lg:flex gap-3 h-[420px]">
            {businessUnits.map((unit) => {
              const isActive = unit.id === active;
              return (
                <div
                  key={unit.id}
                  onClick={() => setActive(unit.id)}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${isActive ? "flex-[3]" : "flex-[1]"
                    }`}
                >
                  <img src={unit.src} alt={unit.label} className="w-full h-full object-cover absolute inset-0" />
                  <div className={`absolute inset-0 transition-all duration-500 ${isActive ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent" : "bg-black/30"}`} />

                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-white font-bold text-xl font-jakarta tracking-[1.12px] whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {unit.label}
                      </span>
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                      <img src={unit.logo} alt={unit.label} className={`h-8 w-auto object-contain mb-1 self-start${unit.raw ? "" : " brightness-0 invert"}`} />
                      <h3 className="text-white font-bold text-2xl font-jakarta tracking-[1.12px]">
                        {unit.label}
                      </h3>
                      <p className="text-white/80 text-sm leading-[22px] font-jakarta">
                        {unit.description}
                      </p>
                      <a
                        href={unit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 bg-thelix-orange text-white text-sm font-jakarta px-4 py-2 rounded w-fit mt-1 hover:bg-orange-500 transition-colors"
                      >
                        Learn more <ArrowRight size={16} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Mobile stack */}
        <div className="flex flex-col gap-3 lg:hidden">
          {businessUnits.map((unit) => {
            const isActive = unit.id === active;
            return (
              <div
                key={unit.id}
                onClick={() => setActive(isActive ? "" : unit.id)}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${isActive ? "h-[280px]" : "h-[70px]"
                  }`}
              >
                <img src={unit.src} alt={unit.label} className="w-full h-full object-cover absolute inset-0" />
                <div className={`absolute inset-0 transition-all duration-500 ${isActive ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent" : "bg-black/40"}`} />

                {!isActive && (
                  <div className="absolute inset-0 flex items-center px-5">
                    <span className="text-white font-bold text-lg font-jakarta tracking-[1.12px]">
                      {unit.label}
                    </span>
                  </div>
                )}

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                    <img src={unit.logo} alt={unit.label} className={`h-7 w-auto object-contain mb-1 self-start${unit.raw ? "" : " brightness-0 invert"}`} />
                    <h3 className="text-white font-bold text-xl font-jakarta">{unit.label}</h3>
                    <p className="text-white/80 text-sm leading-[22px] font-jakarta">{unit.description}</p>
                    <a
                      href={unit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 bg-thelix-orange text-white text-sm font-jakarta px-4 py-2 rounded w-fit mt-1 hover:bg-orange-500 transition-colors"
                    >
                      Learn more <ArrowRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---- Investment Commitment Section ----
const CommitmentSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <SlideLeft className="flex flex-col gap-10 lg:w-[46%]">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-normal leading-tight">
              Our Commitment to Impactful Business Building
            </h2>
            <p className="text-black/80 text-base leading-[25px] font-jakarta">
              Every company we build is centered on sectors that offer significant long-term impact
              and the potential to reshape economies. We believe in creating value that benefits all
              stakeholders, ensuring sustainable and inclusive growth across every community we serve.
            </p>
          </div>
          <div
            className="flex flex-col gap-3 p-5 rounded-xl border-b-2"
            style={{
              background: "rgba(244,130,32,0.10)",
              borderBottomColor: "rgba(244,130,32,0.63)",
            }}
          >
            <h3 className="text-thelix-orange text-2xl font-bold font-jakarta tracking-[1.12px]">
              Driving Social Impact
            </h3>
            <p className="text-black/80 text-sm leading-[25px] font-jakarta">
              Thelix Holdings is committed to creating positive change by empowering communities,
              promoting sustainable development, and enhancing lives through the businesses we build
              and the programmes we run. Every decision we make prioritizes meaningful, lasting
              social impact.
            </p>
          </div>
        </SlideLeft>

        <SlideRight className="lg:w-[38%]">
          <img
            src="/home_page_photo.jpg"
            alt="Impactful Investments"
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </SlideRight>
      </div>
    </div>
  </section>
);

// ---- Quote Section ----
const QuoteSection = () => (
  <section className="bg-white py-10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <ScaleIn>
        <div className="bg-[#160A00] rounded-2xl py-20 lg:py-28 px-6 lg:px-[100px]">
          <div className="flex flex-col items-center gap-10 max-w-3xl mx-auto text-center">
            <QuoteIcon />
            <p className="text-white/80 text-3xl sm:text-4xl lg:text-[45px] font-normal font-jakarta leading-tight">
              Innovation is the lifeblood of any economy. When we stop innovating, we stop growing.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-thelix-orange text-2xl font-bold font-jakarta uppercase tracking-wide">
                Tolu Micheal
              </p>
              <p className="text-sm font-normal font-jakarta text-white/40">
                CVO - Chief Visionary Officer
              </p>
            </div>
          </div>
        </div>
      </ScaleIn>
    </div>
  </section>
);

// ---- Blog Section ----
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  author: string;
  category: string;
  date: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data: BlogPost[]) => setPosts(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && posts.length === 0) return null;

  return (
    <section className="bg-[#f6f5f5] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <FadeUp className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
              From Our Blog
            </h2>
            <p className="text-black/70 text-base leading-[25px] font-jakarta mt-3 max-w-lg">
              Perspectives and insights from the Thelix team on technology, leadership, and innovation.
            </p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 px-6 py-2.5 border border-thelix-orange text-thelix-orange font-medium text-sm font-jakarta rounded hover:bg-thelix-orange hover:text-white transition-colors flex-shrink-0"
          >
            See all posts <ArrowRight size={16} />
          </Link>
        </FadeUp>

        {!loaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full h-52 rounded-xl bg-gray-200" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {loaded && (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-52 object-cover group-hover:opacity-95 transition-opacity" />
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-orange-100 to-orange-50" />
                  )}
                  <div className="flex flex-col gap-2.5 p-5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.category && (
                        <span className="text-xs font-medium font-jakarta text-thelix-orange bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      )}
                      {post.date && <time className="text-black/35 text-xs font-jakarta">{post.date}</time>}
                    </div>
                    <h3 className="text-base font-bold text-black font-jakarta leading-snug group-hover:text-thelix-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-black/55 text-sm font-jakarta leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                    )}
                    {post.author && <p className="text-xs text-black/35 font-jakarta mt-auto pt-1">By {post.author}</p>}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </section>
  );
};

// ---- Latest Updates Section ----
interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  source: string;
}

const LatestUpdatesSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: NewsArticle[]) => setArticles(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const hasArticles = loaded && articles.length > 0;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <FadeUp className="text-center mb-12 max-w-lg mx-auto">
          <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
            Latest Update
          </h2>
          <p className="text-black/80 text-base leading-[25px] font-jakarta mt-3">
            News and coverage of Thelix Holdings and our business units — from press features
            and industry blogs to milestone announcements across global media.
          </p>
        </FadeUp>

        {!loaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full h-[296px] rounded-xl bg-gray-100" />
                <div className="h-6 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {loaded && !hasArticles && (
          <p className="text-center text-black/40 font-jakarta text-sm py-10">
            No articles yet.
          </p>
        )}

        {hasArticles && (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-3 group"
                >
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-[296px] object-cover rounded-xl group-hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-[296px] rounded-xl bg-gray-100 flex items-center justify-center">
                      <span className="text-black/20 text-sm font-jakarta">No image</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-black font-medium text-2xl font-jakarta tracking-[1.04px] leading-normal group-hover:text-thelix-orange transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-black/50 text-sm font-jakarta">
                      {article.source && <span>{article.source} · </span>}
                      {article.date}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}

        <FadeUp className="flex justify-center mt-12">
          <Link
            to="/news"
            className="flex items-center gap-2 px-8 py-3 border border-thelix-orange text-thelix-orange font-medium text-base font-jakarta rounded hover:bg-thelix-orange hover:text-white transition-colors"
          >
            See all Updates
            <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
};

// ---- Page ----
export default function Index() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <PartnersSection />
        <OrangeFeaturesBanner />
        <VentureCardsSection />
        <PortfolioSection />
        <CommitmentSection />
        <QuoteSection />
        <LatestUpdatesSection />
        <BlogSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
