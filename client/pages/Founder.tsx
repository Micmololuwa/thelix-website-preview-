import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ---- Hero ----
const FounderHero = () => (
  <section
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-16">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=560&fit=crop&q=80"
            alt="Tolulope Michael"
            className="w-[260px] sm:w-[320px] lg:w-[380px] h-auto aspect-[4/5] object-cover rounded-2xl"
          />
        </div>

        {/* Intro */}
        <div className="flex flex-col gap-5 lg:flex-1">
          <div>
            <p className="text-thelix-orange font-medium text-base font-jakarta mb-2">Founder & Chief Visionary Officer</p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta"
              style={{ lineHeight: 1.1 }}
            >
              Tolulope Michael
            </h1>
          </div>
          <p className="text-black/70 text-lg leading-[30px] font-jakarta max-w-[560px]">
            Entrepreneur, author, and visionary leader building world-class companies across
            six industries — driven by a mission to create lasting economic freedom for
            communities across Africa and beyond.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Fintech", "EdTech", "Cybersecurity", "Immigration Tech", "Career AI", "Philanthropy"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-black/10 text-sm font-jakarta text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---- Biography ----
const BiographySection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] lg:w-[220px] flex-shrink-0">
          Biography
        </h2>
        <div className="flex flex-col gap-6 flex-1 text-black/80 text-lg leading-[30px] font-jakarta">
          <p>
            Tolulope Michael is the founder and Chief Visionary Officer of Thelix Holdings, a
            global holding company that has built six strategic business units spanning Financial
            Services, EdTech, Cybersecurity, Education, Identity Verification, and Career
            Development. With operations across multiple continents, Thelix Holdings stands as
            one of Africa's most ambitious multi-sector conglomerates.
          </p>
          <p>
            With a background rooted in technology, business strategy, and social impact, Tolulope
            has spent over a decade building and scaling organisations that address systemic
            challenges in education, financial inclusion, and economic mobility. He brings together
            a rare combination of operational expertise, entrepreneurial drive, and deep industry
            knowledge across sectors that are reshaping the global economy.
          </p>
          <p>
            Beyond his work at Thelix Holdings, Tolulope is the founder of the Tolu Michael
            Foundation, a philanthropic organisation dedicated to entrepreneurship development,
            economic research and advocacy, and community empowerment across Africa and the
            diaspora. Through the Foundation, he has directly impacted thousands of lives through
            grants, mentorship programmes, and policy engagement with government institutions.
          </p>
          <p>
            Tolulope is widely recognised as a thought leader in cybersecurity, EdTech, and
            financial inclusion, and has been featured in leading publications including This Day,
            The Guardian Nigeria, BusinessDay, and Yahoo Finance. He continues to be a sought-after
            voice on entrepreneurship, African economic development, and the future of work.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ---- Experience ----
const experiences = [
  {
    role: "Founder & Chief Visionary Officer",
    org: "Thelix Holdings",
    period: "2020 — Present",
    description:
      "Built and scaled six strategic business units spanning fintech, EdTech, cybersecurity, education, immigration technology, and AI-driven career development. Oversees global operations and long-term strategic direction across all portfolio companies.",
  },
  {
    role: "Founder",
    org: "Tolu Michael Foundation",
    period: "2021 — Present",
    description:
      "Established a philanthropic organisation focused on entrepreneurship development, economic research, and community empowerment in Africa and the diaspora. Programmes have reached thousands of beneficiaries across multiple countries.",
  },
  {
    role: "Cybersecurity Strategist & Educator",
    org: "ExcelMind Cyber Institute",
    period: "2019 — Present",
    description:
      "Conceived and launched a cybersecurity training institution delivering governance, risk, and compliance certification programmes. Featured by ThisDay for continued impact in the cybersecurity workspace.",
  },
  {
    role: "EdTech Entrepreneur",
    org: "ExcelMind",
    period: "2018 — Present",
    description:
      "Founded ExcelMind, a school management and EdTech platform serving educational institutions across Nigeria and Africa. The platform simplifies admissions, automates records, and drives measurable improvements in student performance.",
  },
];

const ExperienceSection = () => (
  <section className="bg-[#f8f8f7] py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] mb-12">
        Experience
      </h2>
      <div className="flex flex-col gap-0 divide-y divide-gray-200">
        {experiences.map((exp) => (
          <div key={exp.role + exp.org} className="flex flex-col lg:flex-row gap-4 lg:gap-16 py-8">
            <div className="lg:w-[260px] flex-shrink-0">
              <p className="font-bold text-black font-jakarta text-base">{exp.role}</p>
              <p className="text-thelix-orange font-medium text-sm font-jakarta mt-0.5">{exp.org}</p>
              <p className="text-black/40 text-sm font-jakarta mt-1">{exp.period}</p>
            </div>
            <p className="text-black/70 text-base leading-[27px] font-jakarta flex-1">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---- Books ----
const books = [
  {
    title: "Cybersecurity for the African Enterprise",
    year: "2023",
    description:
      "A practical guide for business leaders navigating the cybersecurity landscape in emerging markets — covering risk frameworks, compliance, and building resilient organisations in a digital-first world.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=420&fit=crop&q=80",
  },
  {
    title: "The Purposeful Entrepreneur",
    year: "2022",
    description:
      "An exploration of how purpose-driven entrepreneurship can unlock economic freedom — drawing from Tolulope's experience building companies across Africa and his philosophy on business as a vehicle for social change.",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=420&fit=crop&q=80",
  },
  {
    title: "Building for Billions",
    year: "2024",
    description:
      "A strategic blueprint for entrepreneurs and executives who want to build scalable companies in high-growth sectors across Africa — from EdTech to fintech, with lessons drawn directly from the Thelix Holdings playbook.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=420&fit=crop&q=80",
  },
];

const BooksSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] mb-12">
        Books & Publications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <article key={book.title} className="flex flex-col gap-5">
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="w-full h-[280px] object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="flex flex-col gap-2">
              <p className="text-thelix-orange text-sm font-jakarta font-medium">{book.year}</p>
              <h3 className="text-xl font-bold text-black font-jakarta leading-snug">{book.title}</h3>
              <p className="text-black/60 text-sm leading-[24px] font-jakarta">{book.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---- Press / Features ----
const pressItems = [
  { publication: "This Day Live", headline: "Tolulope Michael Continues Making Impact in the Cybersecurity Workspace", year: "2023" },
  { publication: "The Guardian Nigeria", headline: "How Technology Can Drive Cost Savings and Boost Student Performance", year: "2025" },
  { publication: "BusinessDay NG", headline: "Nigerian Schools Can Save N1.5M Yearly with Digital Docs, Expert Says", year: "2025" },
  { publication: "Yahoo Finance", headline: "ExcelMind Cyber Institute Launches New Cybersecurity Governance Certification Program", year: "2025" },
];

const PressSection = () => (
  <section className="bg-[#07060f] py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <h2 className="text-2xl sm:text-[28px] font-bold text-white font-jakarta tracking-[1.12px] mb-12">
        In the Press
      </h2>
      <div className="flex flex-col gap-0 divide-y divide-white/10">
        {pressItems.map((item) => (
          <div key={item.headline} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 py-6">
            <p className="text-thelix-orange text-sm font-medium font-jakarta sm:w-[180px] flex-shrink-0">
              {item.publication}
            </p>
            <p className="text-white font-jakarta text-base flex-1">{item.headline}</p>
            <p className="text-white/30 text-sm font-jakarta flex-shrink-0">{item.year}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---- Page ----
export default function Founder() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <FounderHero />
      <BiographySection />
      <ExperienceSection />
      <BooksSection />
      <PressSection />
      <Footer />
    </div>
  );
}
