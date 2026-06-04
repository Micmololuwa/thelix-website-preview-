import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  StaggerGrid,
  StaggerItem,
  PageTransition,
} from "@/components/ui/motion";

const CDN = "https://c.animaapp.com/cZKmCvqz/img";

// ---- Data ----
const statisticsCards = [
  {
    value: "80+",
    label: "LIVES TOUCHED",
    iconSrc: `${CDN}/healthicons-old-woman-outline-24px.svg`,
    iconAlt: "Lives touched icon",
  },
  {
    value: "4",
    label: "ACTIVE CAMPAIGNS",
    iconSrc: `${CDN}/material-symbols-campaign-rounded.svg`,
    iconAlt: "Active campaigns icon",
  },
  {
    value: "$10K",
    label: "IN DONATION",
    iconSrc: `${CDN}/fluent-money-hand-16-filled.svg`,
    iconAlt: "Donation amount icon",
  },
];

const featureItems = [
  {
    title: "Entrepreneurship Development",
    description:
      "We fund and mentor early-stage entrepreneurs in underserved communities, providing access to capital, business education, and global networks to build sustainable businesses.",
    iconSrc: `${CDN}/lucide-shield-1.svg`,
    iconAlt: "Shield icon",
    bgRgba: "rgba(244,130,32,0.20)",
  },
  {
    title: "Economic Research & Advocacy",
    description:
      "Through rigorous research and policy advocacy, we work with governments and institutions to create environments where economic freedom and social mobility can flourish.",
    iconSrc: `${CDN}/lucide-shield-1.svg`,
    iconAlt: "Shield icon",
    bgRgba: "rgba(244,130,32,0.10)",
  },
  {
    title: "Community Empowerment",
    description:
      "From educational scholarships to health outreach campaigns, our programmes directly improve quality of life for individuals and families across Africa and beyond.",
    iconSrc: `${CDN}/lucide-scale.svg`,
    iconAlt: "Scale icon",
    bgRgba: "rgba(244,130,32,0.05)",
  },
];

const missionParagraphs = [
  "Thelix Holdings is a holding company that has built six strategic business units spanning Financial Services, EdTech, Cybersecurity, Education, Healthcare, and Identity Verification — with operations globally. Driven by our commitment to creating sustainable economic and social wealth, we believe in building world-class companies that solve real problems at scale. Our approach brings deep industry expertise and a proven track record of operational excellence across every business we own.",
  "Our philanthropic efforts, through the Tolu Michael Foundation community empowerment programs, are dedicated to encouraging entrepreneurship, advocating for economic development, and conducting impactful research worldwide.",
];

// ---- Hero ----
const PhilanthropyHero = () => (
  <section
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-12">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta max-w-5xl"
        style={{ lineHeight: 1.4 }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Creating Lasting Change Through Purpose-Driven<br className="hidden sm:block" /> Philanthropy
      </motion.h1>
    </div>
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pb-16">
      <FadeIn>
        <img
          src={`${CDN}/rectangle-289.png`}
          alt="People gathered under a canopy at a philanthropy event"
          className="w-full h-[300px] sm:h-[400px] lg:h-[544px] object-cover rounded-2xl"
        />
      </FadeIn>
    </div>
  </section>
);

// ---- Mission ----
const MissionSection = () => (
  <section className="bg-white py-16 lg:py-24" aria-labelledby="mission-section-heading">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col gap-[61px]">
        <FadeUp>
          <h2
            id="mission-section-heading"
            className="text-4xl sm:text-[65px] font-bold text-black font-jakarta"
          >
            Our Mission
          </h2>
        </FadeUp>
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <SlideLeft>
            <img
              src={`${CDN}/rectangle-294.png`}
              alt="People gathered during a community empowerment outreach program"
              className="w-full lg:w-[507px] h-[445px] object-cover flex-shrink-0"
              loading="lazy"
            />
          </SlideLeft>
          <SlideRight className="flex flex-col gap-[27px] flex-1 text-lg leading-[27px] text-black/80 font-jakarta">
            {missionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </SlideRight>
        </div>
      </div>
    </div>
  </section>
);

// ---- Statistics ----
const StatisticsSection = () => (
  <section
    className="bg-thelix-orange py-16 lg:py-24"
    aria-labelledby="statistics-section-heading"
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col gap-[60px]">
        <FadeUp>
          <header className="flex flex-col gap-[11px]">
            <h2
              id="statistics-section-heading"
              className="text-4xl sm:text-[65px] font-bold text-white font-jakarta tracking-[2.6px] leading-tight max-w-[879px]"
            >
              Our Philanthropy in Numbers
            </h2>
            <p className="text-white/80 text-base leading-[25px] font-jakarta max-w-[868px]">
              Through the Tolu Michael Foundation, we are committed to building a more equitable and
              prosperous world — one community, one entrepreneur, one life at a time.
            </p>
          </header>
        </FadeUp>

        <StaggerGrid
          className="flex flex-col sm:flex-row items-stretch gap-[35px]"
          aria-label="Impact statistics"
          role="list"
        >
          {statisticsCards.map((card) => (
            <StaggerItem key={card.label} className="flex-1">
              <article
                role="listitem"
                className="flex items-center gap-4 rounded-[115px] border border-solid border-white px-8 lg:px-11 py-5"
              >
                <div className="flex flex-1 flex-col">
                  <span className="text-white text-5xl lg:text-[65px] font-bold font-jakarta leading-tight">
                    {card.value}
                  </span>
                  <span className="text-white text-base font-jakarta whitespace-pre">
                    {card.label}
                  </span>
                </div>
                <img
                  src={card.iconSrc}
                  alt={card.iconAlt}
                  className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] aspect-square flex-shrink-0"
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  </section>
);

// ---- Features + Supporting + Report ----
const FeaturesSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      {/* Intro */}
      <FadeUp className="max-w-[770px] mb-10 flex flex-col gap-2.5">
        <h2
          id="features-intro-section-title"
          className="text-[28px] font-bold text-black font-jakarta tracking-[1.12px]"
        >
          Our Areas of Focus
        </h2>
        <p className="text-black/80 text-lg leading-[27px] font-jakarta">
          The Tolu Michael Foundation concentrates its resources on three pillars of change:
          entrepreneurship development, economic research and advocacy, and community empowerment
          — creating sustainable pathways to economic freedom for individuals and families.
        </p>
      </FadeUp>

      {/* Feature cards */}
      <StaggerGrid className="flex flex-col sm:flex-row gap-5 mb-10" aria-label="Key features">
        {featureItems.map((item, index) => (
          <StaggerItem key={`${item.title}-${index}`} className="flex-1">
            <article
              className="flex flex-col gap-[35px] p-5 h-full"
              style={{ backgroundColor: item.bgRgba }}
            >
              <img
                src={item.iconSrc}
                alt={item.iconAlt}
                className="w-[41px] h-[41px] object-contain"
              />
              <div className="flex flex-col gap-3">
                <div className="text-[26.8px] font-bold font-jakarta text-black leading-snug">
                  {item.title}
                </div>
                <p className="text-[18.6px] font-jakarta leading-[30.9px] text-black/80">
                  {item.description}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Supporting image + Download report */}
      <div className="flex flex-col lg:flex-row gap-5">
        <SlideLeft className="flex-1 lg:flex-[1.75]">
          <img
            src={`${CDN}/rectangle-295.png`}
            alt="Relief supplies including food sacks and packaged goods"
            className="w-full h-[300px] lg:h-[377px] object-cover"
          />
        </SlideLeft>

        <SlideRight className="flex flex-col gap-[31px] p-[25px] bg-[#f6f5f5] rounded-lg lg:w-[440px] flex-shrink-0">
          <div className="flex flex-col gap-[11px]">
            <h2
              id="download-report-title"
              className="font-bold text-black text-[28px] font-jakarta leading-snug"
            >
              Download Our 2025 Impact Report
            </h2>
            <p className="text-black/80 text-base leading-[27px] font-jakarta">
              Discover the full scope of our philanthropic efforts, the communities we have reached,
              and our roadmap for creating meaningful change through the Tolu Michael Foundation.
            </p>
          </div>
          <a
            href="/Tolu Michael Foundation.pdf"
            download="Tolu Michael Foundation Impact Report 2025.pdf"
            aria-label="Download the report"
            className="inline-flex items-center justify-center gap-2.5 px-[15px] py-2.5 bg-white rounded border border-solid border-[#f48220]/40 w-fit hover:bg-orange-50 transition-colors"
          >
            <span className="text-thelix-orange text-base font-medium font-jakarta">
              Download the report
            </span>
            <img
              src={`${CDN}/si-arrow-right-line.svg`}
              alt=""
              aria-hidden="true"
              className="w-5 h-5 rotate-90"
            />
          </a>
        </SlideRight>
      </div>
    </div>
  </section>
);

// ---- Page ----
export default function Philanthropy() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <PhilanthropyHero />
        <MissionSection />
        <StatisticsSection />
        <FeaturesSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
