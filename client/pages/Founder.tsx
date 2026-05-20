import { useState, useEffect } from "react";
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
        <SlideLeft className="flex-shrink-0">
          <img
            src="/TM's Image.png"
            alt="Tolulope Michael"
            className="w-[260px] sm:w-[320px] lg:w-[380px] h-auto aspect-[4/5] object-cover rounded-2xl"
          />
        </SlideLeft>

        {/* Intro */}
        <SlideRight className="flex flex-col gap-5 lg:flex-1">
          <div>
            <motion.p
              className="text-thelix-orange font-medium text-base font-jakarta mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Founder & Chief Visionary Officer
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta"
              style={{ lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              Tolulope Michael
            </motion.h1>
          </div>
          <p className="text-black/70 text-lg leading-[30px] font-jakarta max-w-[560px]">
            Entrepreneur, author, and visionary leader building world-class companies across
            six industries — driven by a mission to create lasting economic freedom for
            communities across Africa and beyond.
          </p>
        </SlideRight>
      </div>
    </div>
  </section>
);

// ---- Biography ----
const BiographySection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        <FadeUp className="lg:w-[220px] flex-shrink-0">
          <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px]">
            Biography
          </h2>
        </FadeUp>
        <FadeUp delay={0.12} className="flex flex-col gap-6 flex-1 text-black/80 text-lg leading-[30px] font-jakarta">
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
        </FadeUp>
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
    period: "2023 — Present",
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
    period: "2022 — Present",
    description:
      "Founded ExcelMind, a school management and EdTech platform serving educational institutions across Nigeria and Africa. The platform simplifies admissions, automates records, and drives measurable improvements in student performance.",
  },
];

const ExperienceSection = () => (
  <section className="bg-[#f8f8f7] py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <FadeUp>
        <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] mb-12">
          Experience
        </h2>
      </FadeUp>
      <StaggerGrid className="flex flex-col gap-0 divide-y divide-gray-200">
        {experiences.map((exp) => (
          <StaggerItem key={exp.role + exp.org}>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 py-8">
              <div className="lg:w-[260px] flex-shrink-0">
                <p className="font-bold text-black font-jakarta text-base">{exp.role}</p>
                <p className="text-thelix-orange font-medium text-sm font-jakarta mt-0.5">{exp.org}</p>
                <p className="text-black/40 text-sm font-jakarta mt-1">{exp.period}</p>
              </div>
              <p className="text-black/70 text-base leading-[27px] font-jakarta flex-1">
                {exp.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  </section>
);

// ---- Books ----
interface Book {
  id: string;
  title: string;
  year: string;
  sellingUrl: string;
  cover: string;
}

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then((data: Book[]) => setBooks(data))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && books.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <FadeUp>
          <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] mb-12">
            Books & Publications
          </h2>
        </FadeUp>
        {!loaded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full h-[280px] rounded-2xl bg-gray-100" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-5 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}
        {loaded && books.length > 0 && (
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <StaggerItem key={book.id}>
                <a
                  href={book.sellingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-5 group"
                >
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-[280px] object-cover rounded-2xl group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-[280px] rounded-2xl bg-gray-100 flex items-center justify-center">
                      <span className="text-black/20 text-sm font-jakarta">No cover</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <p className="text-thelix-orange text-sm font-jakarta font-medium">{book.year}</p>
                    <h3 className="text-xl font-bold text-black font-jakarta leading-snug group-hover:text-thelix-orange transition-colors">
                      {book.title}
                    </h3>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </section>
  );
};

// ---- Page ----
export default function Founder() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <FounderHero />
        <BiographySection />
        <ExperienceSection />
        <BooksSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
