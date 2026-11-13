import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, SlideLeft, SlideRight, PageTransition } from "@/components/ui/motion";

// ---- Hero ----
const SolutionsHero = () => (
  <section
    style={{
      background: "linear-gradient(180deg, #C4DFE8 0%, #F6F6F5 30.55%, #F2D1C0 59.77%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-20 text-center">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta leading-tight max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Our Strategic Business Units
      </motion.h1>
      <motion.p
        className="text-black/80 text-base leading-[25px] max-w-[675px] mx-auto mt-4 font-jakarta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        Five companies spanning fintech, cybersecurity, global mobility, revenue operations, and
        career development — each designed to solve real problems at scale and reshape its industry.
      </motion.p>
    </div>
  </section>
);

// ---- SBU data ----
const SBUS = [
  {
    id: "creditveto",
    logo: <img src="/creditveto.png" alt="CreditVeto" className="h-10 w-auto object-contain" />,
    heading: "Build Your Credit Score By Paying Bills",
    body: "CreditVeto is a fintech platform that empowers individuals and businesses to understand, manage, and improve their credit profiles. By making credit scoring transparent and actionable, we are removing barriers to financial inclusion and enabling more people to access the capital they need to build better futures.",
    image: "/magnific__talk__11997.png",
    imageAlt: "CreditVeto platform in action",
    url: "https://www.creditvetoafrica.com/",
  },
  {
    id: "excelmindcyber",
    logo: <img src="/emc.png" alt="ExcelMind Cyber" className="h-10 w-auto object-contain" />,
    heading: "Break Into a High-Paying Cybersecurity Career in 90 Days — No Tech Background Required.",
    body: "Join 1,000+ professionals from nursing, logistics, finance, and the military who used ExcelMindCyber's proven 90-day accelerator to transition into cybersecurity roles — without quitting their jobs or going back to school. Roles our graduates hold today pay between $75,000 and $120,000 per year.*",
    image: "https://c.animaapp.com/nC2rat2M/img/rectangle-288-1.png",
    imageAlt: "Cybersecurity professional at work",
    url: "https://excelmindcyber.com",
  },
  {
    id: "veripass",
    logo: <img src="/veripass.png" alt="Veripass" className="h-10 w-auto object-contain" />,
    heading: "Build a US Presence That Moves Your Business Forward",
    body: "A business-led, company-funded immigration model — built for founders, executives, and exceptional professionals who want to expand to the American market.",
    image: "https://c.animaapp.com/nC2rat2M/img/rectangle-288-4.png",
    imageAlt: "Veripass immigration platform in action",
    url: "https://veripass.co",
  },
  {
    id: "cosella",
    logo: <img src="/cosella-logo.svg" alt="Cosella" className="h-10 w-auto object-contain" />,
    heading: "Turn More of Your Leads Into Collected Cash",
    body: "Cosella brings forms, lead scoring, routing, call preparation, live sales coaching, and payments into one revenue operations platform for high-ticket sales teams.",
    image: "/magnific__talk__11997.png",
    imageAlt: "Cosella revenue operations platform",
    url: "https://mycosella.com/",
  },
  {
    id: "skill-venture",
    logo: <img src="/skillventure.png" alt="Skill Venture" className="h-12 w-auto object-contain" />,
    heading: "Turn Your Expertise Into Opportunity",
    body: "Skill Venture helps professionals package their knowledge, build authority, and create new career and business opportunities through practical education and guided development.",
    image: "/joinus-image.png",
    imageAlt: "Skill Venture career development experience",
    url: "https://skillventure.com/",
  },
];

// ---- Solutions List ----
const SolutionsSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] flex flex-col gap-24 lg:gap-32">
      {SBUS.map((sbu, index) => {
        const isEven = index % 2 === 0;
        return (
          <article
            key={sbu.id}
            className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
              isEven ? "" : "lg:flex-row-reverse"
            }`}
          >
            {/* Text — slides in from the side it starts on */}
            {isEven ? (
              <SlideLeft className="flex flex-col gap-6 lg:flex-1">
                <div>{sbu.logo}</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black font-jakarta leading-snug">
                  {sbu.heading}
                </h2>
                <p className="text-black/80 text-base leading-[27px] font-jakarta">{sbu.body}</p>
                <a
                  href={sbu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-thelix-orange text-white font-jakarta text-base px-6 py-3 rounded-full w-fit hover:bg-orange-500 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight size={18} />
                </a>
              </SlideLeft>
            ) : (
              <SlideRight className="flex flex-col gap-6 lg:flex-1">
                <div>{sbu.logo}</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black font-jakarta leading-snug">
                  {sbu.heading}
                </h2>
                <p className="text-black/80 text-base leading-[27px] font-jakarta">{sbu.body}</p>
                <a
                  href={sbu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-thelix-orange text-white font-jakarta text-base px-6 py-3 rounded-full w-fit hover:bg-orange-500 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight size={18} />
                </a>
              </SlideRight>
            )}

            {/* Image — slides in from the opposite side */}
            {isEven ? (
              <SlideRight className="lg:flex-1 w-full">
                <img
                  src={sbu.image}
                  alt={sbu.imageAlt}
                  className="w-full h-[320px] lg:h-[420px] object-cover rounded-2xl"
                  loading="lazy"
                />
              </SlideRight>
            ) : (
              <SlideLeft className="lg:flex-1 w-full">
                <img
                  src={sbu.image}
                  alt={sbu.imageAlt}
                  className="w-full h-[320px] lg:h-[420px] object-cover rounded-2xl"
                  loading="lazy"
                />
              </SlideLeft>
            )}
          </article>
        );
      })}
    </div>
  </section>
);

// ---- Page ----
export default function Solutions() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <SolutionsHero />
        <SolutionsSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
