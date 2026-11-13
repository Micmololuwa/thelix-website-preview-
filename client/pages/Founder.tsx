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
              Technology Executive | Cybersecurity Leader | Founder | Author | Strategic Operator
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
            Technology executive, cybersecurity leader, entrepreneur, and founder of Thelix Holdings —
            a multi-sector technology and innovation group focused on cybersecurity, education
            technology, workforce transformation, fintech, artificial intelligence, and economic
            empowerment.
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
            Tolulope Michael is a technology executive, cybersecurity leader, entrepreneur, and
            founder of Thelix Holdings, a multi-sector technology and innovation group focused on
            cybersecurity, education technology, workforce transformation, fintech, artificial
            intelligence, and economic empowerment.
          </p>
          <p>
            Over the years, he has built and scaled platforms, institutions, operational systems,
            and technology-driven companies serving professionals, students, immigrants, and
            organisations across the United States, Canada, the United Kingdom, and Africa.
          </p>
          <p>
            Known for combining deep technical expertise with operational execution, Tolulope has
            become recognised for helping individuals transition into high-income technology careers
            while simultaneously building scalable infrastructure-driven businesses designed to
            create long-term impact.
          </p>
          <p>
            His work spans cybersecurity engineering, cloud infrastructure, enterprise security
            operations, AI systems, educational technology, workforce acceleration, and operational
            leadership.
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
    period: "2019 — Present",
    description:
      "Tolulope Michael is the Founder and Chief Visionary Officer of Thelix Holdings, a technology holding company overseeing high-growth ventures across cybersecurity, fintech, global mobility, revenue operations, and workforce development. Under Thelix Holdings, he founded and scaled ExcelMindCyber, Veripass, Cosella, Credit Veto, and Skill Venture. Through Thelix Holdings, he has led the development of systems designed to create economic mobility and career transformation opportunities for Africans, Black professionals, immigrants, and underserved communities globally. His leadership has helped position Thelix Holdings as an emerging technology ecosystem focused on combining automation, education, operational excellence, and AI-driven infrastructure to solve real-world problems at scale.",
  },
  {
    role: "Security Engineer",
    org: "Amazon",
    period: "2022 — 2024",
    description:
      "As a Security Engineer at Amazon, Tolulope Michael contributed to the protection, scalability, and operational resilience of enterprise-grade cloud and security infrastructure within one of the world's most sophisticated technology environments. His work involved helping secure large-scale systems operating across distributed cloud environments while maintaining strict security, operational, and reliability standards. Areas of expertise included cloud security engineering, identity and access management, security monitoring and incident response, governance, risk and compliance, security automation, and infrastructure protection within cloud-native environments. His experience at Amazon further deepened his understanding of world-class operational standards, cloud infrastructure, security engineering discipline, and large-scale systems thinking — all of which later influenced the operational frameworks and execution culture embedded across Thelix Holdings and ExcelMindCyber.",
  },
  {
    role: "Chief Operating Officer",
    org: "PearMonie",
    period: "2022 — Present",
    description:
      "Tolulope Michael serves as the Chief Operating Officer of PearMonie, a modern fintech platform focused on empowering freelancers and digital entrepreneurs through streamlined payment infrastructure, operational tools, and financial management systems. He oversees operational strategy, scalability, product execution, and growth initiatives designed to improve financial efficiency and business expansion opportunities for freelancers operating in the digital economy.",
  },
  {
    role: "Author",
    org: "",
    period: "2020 — Present",
    description:
      "Tolulope Michael is an accomplished cybersecurity author and thought leader whose work focuses on Governance, Risk, and Compliance (GRC), cybersecurity career development, workforce transformation, and operational excellence. His books include: The GRC Bible: A Comprehensive Guide for the Modern Age · GRC Chronicles: Navigating the Cyber Seas of Governance, Risk, and Compliance · Beyond Checkboxes: The Human Element of GRC · Bridging Realms: Translating Your Non-Tech Skills into GRC Gold · Hacking Your Way to the Job of Your Dreams: The Cybersecurity Career Handbook.",
  },
  {
    role: "Senior Cloud Engineer",
    org: "Nomad Health",
    period: "December 2021 — December 2022",
    description:
      "At Nomad Health, Tolulope Michael contributed to the design and optimisation of secure cloud infrastructure supporting one of the leading digital healthcare staffing platforms in the United States. His work focused on cloud scalability, infrastructure automation, operational reliability, and security enhancement across highly sensitive healthcare-related systems operating within regulated environments.",
  },
  {
    role: "Cloud Security Engineer",
    org: "ShopRunner",
    period: "February 2019 — January 2022",
    description:
      "As a Cloud Security Engineer at ShopRunner, Tolulope Michael played a critical role in strengthening cloud security posture and supporting secure enterprise infrastructure across a large-scale e-commerce ecosystem. He contributed to cloud security operations, infrastructure protection, compliance initiatives, risk management, and secure deployment strategies designed to support millions of users and enterprise-scale operations.",
  },
  {
    role: "Cyber Security Engineer",
    org: "Insight Global",
    period: "February 2017 — December 2019",
    description:
      "Tolulope Michael worked as a Cyber Security Engineer supporting cybersecurity initiatives across multiple enterprise and government-related environments. His responsibilities included cloud security support, infrastructure protection, compliance operations, risk analysis, governance support, and enterprise security implementation for organisations operating across healthcare, finance, government, and technology sectors.",
  },
  {
    role: "Administrator",
    org: "Lagos State Government",
    period: "2013 — January 2017",
    description:
      "Tolulope Michael began his professional journey within the Lagos State Government, where he gained foundational experience in administration, operations, coordination, and organisational management within one of Africa's largest and most dynamic public sector institutions. This early experience helped shape his understanding of leadership, operational structure, public systems, and organisational execution, which later became foundational to his entrepreneurial and operational philosophy.",
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
                {exp.org && (
                  <p className="text-thelix-orange font-medium text-sm font-jakarta mt-0.5">{exp.org}</p>
                )}
                <p className="text-black/40 text-sm font-jakarta mt-1">{exp.period}</p>
              </div>
              {exp.description && (
                <p className="text-black/70 text-base leading-[27px] font-jakarta flex-1">
                  {exp.description}
                </p>
              )}
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
        <FadeUp className="flex items-center justify-between mb-12">
          <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px]">
            Books & Publications
          </h2>
          <a
            href="https://www.amazon.com/stores/Tolulope-Michael/author/B0CPT823QH?ref=sr_ntt_srch_lnk_1&qid=1779784575&sr=8-1&shoppingPortalEnabled=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-thelix-orange font-jakarta text-sm font-medium hover:underline transition-colors"
          >
            See All
          </a>
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
