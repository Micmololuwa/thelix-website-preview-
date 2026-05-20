import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Briefcase, Globe, TrendingUp, Users, Heart, Zap, Coffee, BookOpen, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FadeUp,
  SlideLeft,
  SlideRight,
  StaggerGrid,
  StaggerItem,
  PageTransition,
} from "@/components/ui/motion";

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  applyUrl: string;
}

// ---- Hero ----
const CareerHero = () => (
  <section
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-20 text-center flex flex-col items-center gap-6">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta max-w-4xl"
        style={{ lineHeight: 1.15 }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Build the Future<br className="hidden sm:block" /> with Thelix Holdings
      </motion.h1>
      <motion.p
        className="text-black/80 text-base leading-[27px] font-jakarta max-w-[620px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        Join a team of builders, innovators, and problem-solvers working across six
        transformative business units to create lasting economic and social impact globally.
      </motion.p>
      <motion.a
        href="https://jobs.thelixholdings.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#07060f] text-white px-6 py-3 rounded-full text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors w-fit"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
      >
        View Open Roles <ArrowRight size={16} />
      </motion.a>
    </div>
  </section>
);

// ---- Why Thelix ----
const values = [
  {
    Icon: TrendingUp,
    title: "Impact-Driven Work",
    body: "Every role at Thelix contributes directly to building companies that reshape industries and improve lives.",
  },
  {
    Icon: Globe,
    title: "Global Exposure",
    body: "Work across multiple continents with teams spanning fintech, EdTech, cybersecurity, and more.",
  },
  {
    Icon: Users,
    title: "Growth-First Culture",
    body: "We invest heavily in our people — mentorship, learning budgets, and clear paths to leadership.",
  },
];

const ValuesSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <FadeUp>
        <h2 className="text-3xl sm:text-[45px] font-bold text-black font-jakarta mb-12">
          Why Thelix?
        </h2>
      </FadeUp>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
        {/* Image */}
        <SlideLeft className="lg:w-[45%] flex-shrink-0">
          <img
            src="/joinus-image.png"
            alt="Thelix Holdings team"
            className="w-full h-[300px] lg:h-full object-cover rounded-2xl"
          />
        </SlideLeft>

        {/* Cards */}
        <StaggerGrid className="flex flex-col gap-5 flex-1">
          {values.map(({ Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex gap-5 p-6 bg-[#f8f8f7] rounded-2xl items-start">
                <div className="w-12 h-12 rounded-xl bg-[#F48220]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#F48220]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold text-black font-jakarta">{title}</h3>
                  <p className="text-black/70 text-base leading-[27px] font-jakarta">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  </section>
);

// ---- Perks & Benefits ----
const perks = [
  {
    Icon: Heart,
    title: "Health & Wellness",
    body: "Comprehensive health insurance coverage for you and your immediate family, plus wellness stipends.",
  },
  {
    Icon: BookOpen,
    title: "Learning Budget",
    body: "Annual learning allowance for courses, certifications, conferences, and books of your choice.",
  },
  {
    Icon: Plane,
    title: "Flexible Work",
    body: "Remote-friendly roles with flexible hours — we care about output, not where you clock in.",
  },
  {
    Icon: Zap,
    title: "Equity & Bonuses",
    body: "Competitive salaries with performance bonuses and equity participation in the business units you help grow.",
  },
  {
    Icon: Coffee,
    title: "Team Culture",
    body: "Regular team offsites, retreats, and celebrations — we work hard and celebrate our wins together.",
  },
  {
    Icon: TrendingUp,
    title: "Career Growth",
    body: "Structured progression frameworks with mentorship from senior leaders across our portfolio companies.",
  },
];

const PerksSection = () => (
  <section className="bg-[#07060f] py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <FadeUp className="mb-12">
        <h2 className="text-3xl sm:text-[45px] font-bold text-white font-jakarta mb-3">
          Perks & Benefits
        </h2>
        <p className="text-white/60 text-base leading-[27px] font-jakarta max-w-[560px]">
          We take care of our people so they can take care of building great things.
        </p>
      </FadeUp>
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {perks.map(({ Icon, title, body }) => (
          <StaggerItem key={title}>
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 hover:border-[#F48220]/40 transition-colors h-full">
              <div className="w-11 h-11 rounded-xl bg-[#F48220]/15 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-[#F48220]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-white font-jakarta">{title}</h3>
                <p className="text-white/60 text-sm leading-[24px] font-jakarta">{body}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  </section>
);

// ---- Job Card ----
const JobCard = ({ job }: { job: Job }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl sm:text-2xl font-bold text-black font-jakarta">{job.title}</h3>
          <div className="flex items-center gap-1.5 text-black/50 text-sm font-jakarta">
            <MapPin size={14} className="flex-shrink-0 text-[#F48220]" />
            {job.location}
          </div>
        </div>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-thelix-orange text-white px-5 py-2.5 rounded-full text-sm font-medium font-jakarta hover:bg-orange-500 transition-colors flex-shrink-0 w-fit"
        >
          Apply Now <ArrowRight size={15} />
        </a>
      </div>

      <div
        className={`rte-output text-black/70 font-jakarta overflow-hidden transition-all ${expanded ? "" : "max-h-[110px] [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"}`}
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-thelix-orange text-sm font-medium font-jakarta hover:underline w-fit"
      >
        {expanded ? "Show less" : "Read full description"}
      </button>
    </article>
  );
};

// ---- Open Positions ----
const OpenPositionsSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then((r) => r.json())
      .then((data: Job[]) => setJobs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="open-positions" className="bg-[#f8f8f7] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-3xl sm:text-[45px] font-bold text-black font-jakarta">
            Open Positions
          </h2>
          {!loading && jobs.length > 0 && (
            <p className="text-black/40 text-sm font-jakarta">
              {jobs.length} role{jobs.length !== 1 ? "s" : ""} available
            </p>
          )}
        </FadeUp>

        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 animate-pulse flex flex-col gap-3">
                <div className="h-6 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-1/5" />
                <div className="h-4 bg-gray-100 rounded w-full mt-2" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <Briefcase size={40} className="text-gray-200" />
            <p className="text-black/40 font-jakarta text-lg">No open positions at the moment.</p>
            <p className="text-black/30 font-jakarta text-sm">Check back soon — we're growing fast.</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <StaggerGrid className="flex flex-col gap-5">
            {jobs.map((job) => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </section>
  );
};

// ---- Page ----
export default function Career() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <CareerHero />
        <ValuesSection />
        <PerksSection />
        <OpenPositionsSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
