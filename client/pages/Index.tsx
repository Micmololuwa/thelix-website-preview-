import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

const menuItems = [
  { label: "About Us", href: "#about-us" },
  { label: "Our Companies", href: "#our-companies" },
  { label: "Our Impact", href: "/impact" },
  { label: "Leadership", href: "/leadership" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "News & Insights", href: "https://blog.thelixholdings.com", external: true },
];

const floatingRectangles = [
  { className: "left-[17%] top-[38%] h-32 w-24 sm:h-44 sm:w-32", from: 130, to: -150 },
  { className: "left-[22%] top-[3%] hidden h-28 w-44 sm:block", from: 70, to: -190 },
  { className: "right-[8%] top-[6%] h-36 w-24 sm:h-48 sm:w-36", from: 110, to: -170 },
  { className: "right-[21%] top-[50%] h-28 w-24 sm:h-36 sm:w-48", from: 160, to: -180 },
  { className: "left-[8%] top-[79%] hidden h-24 w-36 lg:block", from: 260, to: -80 },
  { className: "left-[28%] top-[84%] hidden h-28 w-48 sm:block", from: 170, to: -190 },
  { className: "right-[32%] top-[12%] hidden h-24 w-20 lg:block", from: 90, to: -120 },
  { className: "right-[28%] top-[82%] hidden h-24 w-36 lg:block", from: 240, to: -100 },
];

function FloatingRectangle({
  progress,
  className,
  from,
  to,
  index,
}: {
  progress: MotionValue<number>;
  className: string;
  from: number;
  to: number;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const rawY = useTransform(progress, [0, 1], [from, to]);
  const y = useSpring(rawY, { stiffness: 90, damping: 26, mass: 0.45 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ y: reduceMotion ? 0 : y }}
      className={`absolute rounded-[6px] border border-black/15 ${
        index % 3 === 0 ? "bg-neutral-400" : index % 3 === 1 ? "bg-neutral-300" : "bg-neutral-500"
      } ${className}`}
    />
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="about-us" className="relative h-[180svh] bg-white" aria-labelledby="about-heading">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {floatingRectangles.map((rectangle, index) => (
          <FloatingRectangle
            key={index}
            progress={scrollYProgress}
            className={rectangle.className}
            from={rectangle.from}
            to={rectangle.to}
            index={index}
          />
        ))}

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-[760px] text-center">
            <h2
              id="about-heading"
              className="text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.03] tracking-[-0.03em] text-black [font-family:var(--font-display)] [text-wrap:balance]"
            >
              We Build Businesses That Move the World Forward.
            </h2>
            <p className="mx-auto mt-6 max-w-[680px] text-base leading-[1.6] text-black sm:mt-8 sm:text-lg [text-wrap:pretty]">
              Thelix Holdings is a technology and innovation group building and growing businesses
              that solve real-world challenges. Across industries, we transform bold ideas into
              practical solutions, creating opportunities, empowering people, and driving lasting
              impact.
            </p>
            <a
              href="/about"
              className="mx-auto mt-8 inline-flex min-h-11 items-center justify-center rounded-[3px] bg-black px-6 text-sm font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.96] sm:mt-10 sm:text-base"
            >
              <span>Discover Thelix</span>
              <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const companies = [
  {
    slug: "excelmindcyber",
    url: "https://excelmindcyber.com",
    name: "ExcelMindCyber",
    category: "Cybersecurity & Career Development",
    headline: "Building the Next Generation of Cybersecurity Professionals.",
    cta: "Learn More",
    description:
      "ExcelMindCyber is creating new pathways into cybersecurity through practical, career-focused education. By equipping individuals with in-demand Governance, Risk, and Compliance (GRC) skills, we’re helping ambitious professionals build expertise, navigate career transitions, and pursue opportunities in the global technology workforce.",
    attribution: "Cybersecurity & Education",
  },
  {
    slug: "veripass",
    url: "https://veripass.co",
    name: "Veripass",
    category: "Global Mobility & Immigration",
    headline: "Opening Doors to Opportunities Beyond Borders.",
    cta: "Learn More",
    description:
      "Veripass helps ambitious professionals, entrepreneurs, founders, and families navigate international mobility with greater clarity and confidence. Through strategic immigration guidance and personalized pathways, we’re helping individuals explore opportunities to live, work, build businesses, and establish their futures across borders.",
    attribution: "Global Mobility",
  },
  {
    slug: "cosella",
    url: "https://mycosella.com/",
    name: "Cosella",
    category: "Revenue Operations & Sales Technology",
    headline: "Turning More Leads Into Collected Revenue.",
    cta: "Learn More",
    description:
      "Cosella brings the systems between the first click and collected cash into one revenue operations platform. With smarter lead qualification, routing, sales coaching, and payment workflows, it helps high-ticket sales teams close and collect more of what they sell.",
    attribution: "Sales Technology",
  },
  {
    slug: "credit-veto",
    url: "https://www.creditvetoafrica.com/",
    name: "Credit Veto",
    category: "Credit & Financial Empowerment",
    headline: "Building Stronger Credit. Unlocking Greater Possibilities.",
    cta: "Learn More",
    description:
      "Credit Veto is helping individuals take greater control of their financial futures through credit education and improvement solutions. By making credit knowledge and guidance more accessible, we’re empowering people to strengthen their credit profiles, build financial confidence, and work toward better funding opportunities.",
    attribution: "Financial Technology",
  },
  {
    slug: "skill-venture",
    url: "https://skillventure.com/",
    name: "Skill Venture",
    category: "Career Development & Education",
    headline: "Turning Expertise Into Opportunity.",
    cta: "Learn More",
    description:
      "Skill Venture helps professionals turn their knowledge and experience into valuable, market-ready expertise. Through practical education and guided career development, it equips ambitious people to build authority, create new opportunities, and grow with confidence.",
    attribution: "Career Development",
  },
];

function CompaniesSection() {
  return (
    <section id="our-companies" className="bg-neutral-950 px-4 py-20 text-white sm:px-6 sm:py-28 lg:py-36" aria-labelledby="companies-heading">
      <div className="mx-auto max-w-[1320px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Our Companies
          </p>
          <h2
            id="companies-heading"
            className="mt-5 w-full text-[clamp(2.75rem,5.278vw,4.75rem)] leading-[1.02] tracking-[-0.035em] [font-family:var(--font-display)]"
          >
            Discover the Businesses We're Building Across Industries.
          </h2>
        </div>

        <div className="mt-16 space-y-10 sm:mt-20 sm:space-y-14">
          {companies.map((company, index) => (
            <article
              key={company.slug}
              id={company.slug}
              className={`${index === companies.length - 1 ? "relative" : "sticky"} grid items-stretch overflow-hidden rounded-[8px] border border-white/15 bg-neutral-900 p-3 shadow-[0_-12px_36px_rgba(0,0,0,0.28)] lg:grid-cols-[0.42fr_0.58fr]`}
              style={{ top: index === companies.length - 1 ? undefined : "24px", zIndex: index + 1 }}
            >
              <div className="relative min-h-[330px] self-stretch overflow-hidden rounded-[5px] border border-white/10 bg-neutral-600 sm:min-h-[390px] lg:h-full lg:min-h-[390px]">
                <p className="absolute inset-x-5 bottom-5 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:inset-x-7 sm:bottom-7">
                  {company.category}
                </p>
              </div>

              <div className="flex min-h-[390px] flex-col px-3 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-8">
                <div
                  className="h-12 w-40 rounded-[3px] border border-white/15 bg-neutral-700"
                  role="img"
                  aria-label={`${company.name} logo placeholder`}
                />
                <h3 className="mt-6 w-full text-[clamp(2rem,3.125vw,2.8125rem)] leading-[1.06] tracking-[-0.025em] [font-family:var(--font-display)]">
                  {company.headline}
                </h3>

                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-white/40 px-5 text-sm font-medium text-white transition-[background-color,color,transform] duration-150 ease-out hover:bg-white hover:text-black active:scale-[0.96]"
                >
                  <span>{company.cta}</span>
                  <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
                </a>

                <p className="mt-10 max-w-[620px] text-base leading-[1.65] text-neutral-300 [text-wrap:pretty] lg:mt-auto lg:pt-10">
                  {company.description}
                </p>
                <p className="mt-8 border-t border-white/15 pt-5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                  {company.attribution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const impactMetrics = [
  {
    description: "People empowered through our technology, education, and career solutions.",
    value: "[XX,XXX]+",
  },
  {
    description: "Businesses and institutions supported across our ecosystem.",
    value: "[X,XXX]+",
  },
  {
    description: "Countries reached through our products, services, and solutions.",
    value: "[XX]+",
  },
];

function ImpactSection() {
  return (
    <section
      id="our-impact"
      className="bg-white px-4 py-20 text-black sm:px-6 sm:py-28 lg:py-36"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-start lg:gap-20">
          <h2
            id="impact-heading"
            className="max-w-[880px] text-[clamp(2.75rem,5.278vw,4.75rem)] leading-[1.02] tracking-[-0.035em] [font-family:var(--font-display)] [text-wrap:balance]"
          >
            Our Impact Speaks Through the Lives We Touch.
          </h2>
          <p className="max-w-[520px] text-base leading-[1.6] text-neutral-600 [text-wrap:pretty] lg:pt-3 lg:text-lg">
            Across our companies, we’re creating opportunities, empowering individuals, and building
            solutions that make a measurable difference in people’s lives and businesses.
          </p>
        </div>

        <div className="mt-16 border-t border-black/15 sm:mt-20 lg:mt-24">
          {impactMetrics.map((metric) => (
            <div
              key={metric.value}
              className="grid gap-7 border-b border-black/15 py-9 sm:py-11 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16 lg:py-5"
            >
              <p className="max-w-[360px] text-sm leading-[1.55] text-neutral-600 sm:text-base [text-wrap:pretty]">
                {metric.description}
              </p>
              <p className="text-start text-[clamp(4rem,10.4vw,9.375rem)] leading-[0.9] tracking-[-0.06em] tabular-nums lg:text-end">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section
      id="leadership"
      className="bg-white px-4 py-20 text-black sm:px-6 sm:py-28 lg:py-36"
      aria-label="Founder message"
    >
      <div className="relative mx-auto max-w-[1320px] lg:min-h-[760px]">
        <div
          className="min-h-[440px] w-full rounded-[8px] bg-neutral-200 outline outline-1 outline-black/10 sm:min-h-[600px] lg:min-h-[760px] lg:w-[82%]"
          role="img"
          aria-label="Founder portrait placeholder"
        />

        <figure className="relative z-10 -mt-16 ml-auto flex w-[calc(100%-16px)] max-w-[620px] flex-col rounded-[8px] bg-neutral-950 px-6 py-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:-mt-28 sm:px-10 sm:py-12 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:min-h-[590px] lg:-translate-y-1/2 lg:px-12 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Founder’s Vision
          </p>

          <blockquote className="mt-10 max-w-[520px] text-[clamp(1.75rem,2.4vw,2.5rem)] leading-[1.14] tracking-[-0.025em] [font-family:var(--font-display)] [text-wrap:pretty] sm:mt-14">
            “Great companies begin with a vision, but their true value lies in the problems they
            solve and the opportunities they create. At Thelix, we’re building businesses that
            challenge limitations, empower people, and turn possibilities into meaningful progress.”
          </blockquote>

          <figcaption className="mt-10 sm:mt-12">
            <p className="text-base font-semibold">Tolulope Michael</p>
            <p className="mt-1 text-sm leading-[1.5] text-neutral-400">
              Founder &amp; Chief Visionary Officer, Thelix Holdings
            </p>
          </figcaption>

          <a
            href="https://tolumichael.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-150 ease-out active:scale-[0.96] sm:mt-auto sm:translate-y-2"
          >
            <span>Meet Our Founder</span>
            <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
          </a>
        </figure>
      </div>
    </section>
  );
}

const newsItems = [
  {
    category: "Company News",
    description: "Discover the latest developments across Thelix Holdings.",
    layout: "lg:col-start-1 lg:row-start-1 lg:row-span-4",
    tone: "bg-neutral-300 text-black",
  },
  {
    category: "Innovation",
    description: "Exploring the ideas and technologies shaping tomorrow.",
    layout: "lg:col-start-1 lg:row-start-5 lg:row-span-6",
    tone: "bg-neutral-600 text-white",
  },
  {
    category: "Our Companies",
    description: "New products, launches, and milestones across our businesses.",
    layout: "lg:col-start-2 lg:row-start-1 lg:row-span-6",
    tone: "bg-neutral-800 text-white",
  },
  {
    category: "Leadership Insights",
    description: "Perspectives on technology, business, and the future.",
    layout: "lg:col-start-2 lg:row-start-7 lg:row-span-4",
    tone: "bg-neutral-300 text-black",
  },
  {
    category: "Our Impact",
    description: "Stories of progress, opportunity, and meaningful change.",
    layout: "lg:col-start-3 lg:row-start-1 lg:row-span-4",
    tone: "bg-neutral-300 text-black",
  },
  {
    category: "Media & Press",
    description: "Thelix in the spotlight: features, interviews, and announcements.",
    layout: "lg:col-start-3 lg:row-start-5 lg:row-span-6",
    tone: "bg-neutral-500 text-white",
  },
];

function NewsSection() {
  return (
    <section
      id="news-insights"
      className="bg-neutral-100 px-4 py-20 text-black sm:px-6 sm:py-28 lg:py-36"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2
            id="news-heading"
            className="text-[clamp(2.75rem,5.278vw,4.75rem)] leading-[1.02] tracking-[-0.035em] [font-family:var(--font-display)] [text-wrap:balance]"
          >
            The Latest from Thelix.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-base leading-[1.6] text-neutral-600 sm:text-lg [text-wrap:pretty]">
            Stories, milestones, and ideas shaping our journey across industries.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-3 lg:auto-rows-[90px]">
          {newsItems.map((item) => (
            <article
              key={item.category}
              className={`relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[8px] p-6 outline outline-1 outline-black/10 sm:min-h-[380px] sm:p-8 lg:min-h-0 ${item.layout} ${item.tone}`}
              aria-label={`${item.category} image placeholder`}
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
              <div className="relative z-10 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">{item.category}</p>
                <h3 className="mt-3 max-w-[390px] text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.15] tracking-[-0.02em] [font-family:var(--font-display)] [text-wrap:pretty]">
                  {item.description}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <a
          href="https://blog.thelixholdings.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-12 flex min-h-11 w-fit items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.96] sm:mt-16"
        >
          <span>Explore All News &amp; Insights</span>
          <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
        </a>
      </div>
    </section>
  );
}

function CareersSection() {
  return (
    <section id="join-us" className="px-4 pb-12 pt-24 text-white sm:px-6 sm:pb-16 sm:pt-32 lg:pb-[75px] lg:pt-[150px]" aria-labelledby="careers-heading">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-4 text-center sm:px-6">
        <h2
          id="careers-heading"
          className="max-w-[980px] text-[clamp(2.75rem,5.278vw,4.75rem)] leading-[1.04] tracking-[-0.035em] [font-family:var(--font-display)] [text-wrap:balance]"
        >
          Join Our Team. Help Shape What’s Possible.
        </h2>

        <a
          href="https://jobs.thelixholdings.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[3px] bg-white px-6 text-sm font-semibold text-black transition-transform duration-150 ease-out active:scale-[0.96] sm:mt-10 sm:text-base"
        >
          <span>Explore Open Roles</span>
          <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
        </a>
      </div>
    </section>
  );
}

const definingPrinciples = [
  {
    number: "01",
    title: "Innovation With Purpose",
    description:
      "We believe technology should solve real problems, create meaningful opportunities, and improve the way people live and work.",
  },
  {
    number: "02",
    title: "People at the Center",
    description:
      "Behind every business we build is a commitment to empowering people, unlocking potential, and creating opportunities for growth.",
  },
  {
    number: "03",
    title: "Thinking Beyond Borders",
    description:
      "We believe great ideas should have no boundaries. Our ambition is to build businesses that create value across industries, communities, and continents.",
  },
  {
    number: "04",
    title: "Built for Lasting Impact",
    description:
      "We’re not simply building companies for today. We’re creating solutions, opportunities, and businesses designed to make a difference for generations.",
  },
];

function ValuesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-neutral-200 text-black" aria-labelledby="values-heading">
      <div className="flex min-h-[82svh] items-center justify-center px-4 py-24 text-center sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -110 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[980px]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-600">
            What Defines Us
          </p>
          <h2
            id="values-heading"
            className="mt-6 text-[clamp(2.75rem,5.278vw,4.75rem)] leading-[1.02] tracking-[-0.035em] [font-family:var(--font-display)] [text-wrap:balance]"
          >
            More Than What We Build. It’s What We Believe.
          </h2>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-black/25 lg:block" aria-hidden="true" />

        <div>
          {definingPrinciples.map((principle, index) => (
            <article
              key={principle.number}
              className="relative grid min-h-[92svh] items-center gap-10 py-20 lg:grid-cols-2 lg:gap-0 lg:py-24"
            >
              <span className="absolute left-1/2 top-1/2 z-10 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black lg:block" aria-hidden="true" />

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -140 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.55 }}
                transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 lg:grid-cols-[110px_minmax(0,1fr)] lg:items-center lg:pe-20"
              >
                <p className="text-[clamp(2.25rem,3.2vw,3.25rem)] leading-none tracking-[-0.04em] tabular-nums">
                  {principle.number}
                  <span className="ms-2 text-xs tracking-normal text-neutral-500">/4</span>
                </p>
                <div>
                  <h3 className="max-w-[430px] text-[clamp(2rem,3.125vw,2.8125rem)] leading-[1.06] tracking-[-0.025em] [font-family:var(--font-display)] [text-wrap:balance]">
                    {principle.title}
                  </h3>
                  <p className="mt-7 max-w-[470px] text-base leading-[1.6] text-neutral-600 [text-wrap:pretty]">
                    {principle.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.45 }}
                transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.22, 1, 0.36, 1] }}
                className={`min-h-[420px] rounded-[8px] outline outline-1 outline-black/10 lg:ms-20 lg:h-[60svh] lg:min-h-[520px] lg:max-h-[650px] ${
                  index % 3 === 0 ? "bg-neutral-400" : index % 3 === 1 ? "bg-neutral-500" : "bg-neutral-300"
                }`}
                role="img"
                aria-label={`${principle.title} image placeholder`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="bg-white" aria-label="Thelix Holdings wireframe canvas">
      <section className="relative min-h-[100svh] overflow-hidden bg-neutral-300 px-4 pt-4 sm:px-6 sm:pt-6" aria-labelledby="hero-heading">
        <div
          className="absolute inset-0 bg-neutral-300"
          aria-label="Hero background video placeholder"
        />

        <motion.nav
        initial={false}
        animate={{
          height: isMenuOpen
            ? "calc(100svh - var(--nav-viewport-gap))"
            : "var(--nav-closed-height)",
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: isMenuOpen ? 0.58 : 0.42, ease: [0.76, 0, 0.24, 1] }
        }
        className="relative z-20 mx-auto flex w-full max-w-[1320px] flex-col overflow-hidden rounded-[5px] border border-black bg-white [--nav-closed-height:76px] [--nav-viewport-gap:32px] sm:[--nav-closed-height:88px] sm:[--nav-viewport-gap:48px]"
        aria-label="Primary navigation"
      >
        <div className="relative z-10 flex h-[74px] shrink-0 items-center justify-between p-2 sm:h-[86px] sm:p-3">
          <a href="/" className="flex min-h-11 items-center" aria-label="Thelix Holdings home">
            <img
              src="/thelix-logo.svg"
              alt="Thelix Holdings"
              className="h-10 w-auto sm:h-12"
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://jobs.thelixholdings.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-[3px] bg-black px-5 text-sm font-bold uppercase tracking-[-0.01em] text-white transition-transform duration-150 ease-out active:scale-[0.96] sm:min-h-[56px] sm:px-8 sm:text-base"
            >
              <span>Join Us</span>
              <ChevronRight aria-hidden="true" className="ml-1 size-4" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative flex size-11 items-center justify-center rounded-[3px] bg-white transition-transform duration-150 ease-out active:scale-[0.96] sm:size-[56px]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="primary-menu"
            >
              <span className="relative block h-6 w-7 sm:w-8" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black"
                  initial={false}
                  animate={{ y: isMenuOpen ? 0 : -8, rotate: isMenuOpen ? 45 : 0 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                />
                <motion.span
                  className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black"
                  initial={false}
                  animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0.25 : 1 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                />
                <motion.span
                  className="absolute left-0 top-[calc(50%-1px)] block h-[2px] w-full bg-black"
                  initial={false}
                  animate={{ y: isMenuOpen ? 0 : 8, rotate: isMenuOpen ? -45 : 0 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="primary-menu"
              key="menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : 0.2 }}
              className="flex min-h-0 flex-1 flex-col px-4 pb-5 pt-4 sm:px-8 sm:pb-8 sm:pt-6 lg:px-12"
            >
              <div className="border-t border-black" role="list">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    role="listitem"
                    initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.36,
                      delay: reduceMotion ? 0 : 0.24 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    className="group grid min-h-[68px] grid-cols-[40px_1fr] items-center gap-3 border-b border-black py-3 sm:min-h-[82px] sm:grid-cols-[54px_1fr] sm:gap-5"
                  >
                    <span className="flex size-7 items-center justify-center border border-black text-xs font-semibold tabular-nums sm:size-8">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.75rem,4vw,3.5rem)] leading-none text-black transition-transform duration-200 ease-out [font-family:var(--font-display)] group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.62 }}
                className="mt-auto text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
              >
                Thelix Holdings
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.nav>

        <div className="absolute inset-x-4 bottom-10 z-10 mx-auto w-auto max-w-[1320px] sm:inset-x-6 sm:bottom-14 lg:bottom-16">
          <div className="max-w-[1180px]">
            <h1
              id="hero-heading"
              className="text-[clamp(3rem,6.25vw,5.625rem)] uppercase leading-[0.94] tracking-[-0.035em] text-black [font-family:var(--font-display)]"
            >
              <span className="block">Building & shaping</span>
              <span className="block">what's possible</span>
            </h1>

            <p className="mt-5 max-w-[640px] text-base leading-[1.55] text-black sm:mt-7 sm:text-lg [text-wrap:pretty]">
              We turn bold ideas into practical solutions that empower people, unlock opportunities,
              and create lasting impact.
            </p>
          </div>
        </div>
      </section>

      <AboutSection />
      <CompaniesSection />
      <ImpactSection />
      <FounderSection />
      <ValuesSection />
      <NewsSection />
      <div className="bg-neutral-700 bg-[linear-gradient(rgb(15_15_15_/_0.5),rgb(15_15_15_/_0.5)),url('/home_page_photo.jpg')] bg-cover bg-center bg-no-repeat">
        <CareersSection />
        <Footer sharedBackground />
      </div>
    </main>
  );
}
