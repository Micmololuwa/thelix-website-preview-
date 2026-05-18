import { useState, useEffect } from "react";
import { Target, Eye, TrendingUp, Users, Globe, Lightbulb, Heart, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
}

// ---- Hero ----
const AboutHero = () => (
  <section
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-12">
      <h1 className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta max-w-3xl" style={{ lineHeight: 1.2 }}>
        Building Strategic Business Units for Long-term Growth
      </h1>
    </div>
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pb-16">
      <img
        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1440&h=544&fit=crop&q=80"
        alt="Team members gathered in a meeting room"
        className="w-full h-[300px] sm:h-[400px] lg:h-[544px] object-cover rounded-2xl"
      />
    </div>
  </section>
);

// ---- Our Story ----
const OurStorySection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[11px]">
        <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] lg:flex-1 flex-shrink-0">
          Our Story
        </h2>
        <div className="lg:flex-1 flex flex-col gap-[27px]">
          <p className="text-black/80 text-lg leading-[27px] font-jakarta">
            Thelix Holdings is a holding company that has built six strategic business units
            spanning Financial Services, EdTech, Cybersecurity, Education, Healthcare, and
            Identity Verification — with operations globally. Driven by our commitment to creating
            sustainable economic and social wealth, we believe in the power of building world-class
            companies from the ground up. Our approach combines deep industry expertise, strong
            operational leadership, and a proven track record of scaling businesses that deliver
            real-world impact.
          </p>
          <p className="text-black/80 text-lg leading-[27px] font-jakarta">
            Our philanthropic efforts, through the Tolu Michael Foundation community empowerment
            programs, are dedicated to encouraging entrepreneurship, advocating for economic
            development, and conducting impactful research worldwide.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ---- Mission & Vision ----
const MissionVisionSection = () => (
  <section className="bg-white pb-16 lg:pb-24" aria-label="Mission and vision statements">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">
        {/* Mission */}
        <article className="flex flex-col gap-[27px] flex-1">
          <div className="flex items-center gap-[27px]">
            <Target className="w-[45px] h-[45px] text-thelix-orange flex-shrink-0" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=390&fit=crop&q=80"
            alt="Thelix Holdings leadership team in a strategy session"
            className="w-full h-[390px] object-cover"
          />
          <div className="flex flex-col gap-[11px]">
            <h3 className="font-medium text-black text-[26px] font-jakarta tracking-[1.04px]">
              Transforming Industries, Empowering Communities
            </h3>
            <p className="text-black/80 text-lg leading-[27px] font-jakarta">
              At Thelix Holdings, our mission is to drive transformative change across diverse
              industries by building world-class business units in fintech, EdTech, cybersecurity,
              education, healthcare, and identity verification. We are dedicated to creating
              long-term value for our stakeholders through operational excellence, continuous
              innovation, and empowering communities globally with cutting-edge solutions.
            </p>
          </div>
        </article>

        {/* Vision */}
        <article className="flex flex-col gap-[27px] flex-1">
          <div className="flex items-center gap-[27px]">
            <Eye className="w-[45px] h-[45px] text-thelix-orange flex-shrink-0" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=390&fit=crop&q=80"
            alt="Global skyline representing Thelix Holdings' vision for the future"
            className="w-full h-[390px] object-cover"
          />
          <div className="flex flex-col gap-[11px]">
            <h3 className="font-medium text-black text-[26px] font-jakarta tracking-[1.04px]">
              A World Where Economic Freedom is Universal
            </h3>
            <p className="text-black/80 text-lg leading-[27px] font-jakarta">
              To be the world's most impactful holding company — empowering over 300,000
              lives by 2030 through six transformative business units, community development
              programmes, and innovative solutions that create lasting economic freedom across
              continents.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
);

// ---- Features ----
type FeatureRow = { title: string; description: string; Icon: React.ElementType }[];

const featureRows: FeatureRow[] = [
  [
    {
      title: "Purposeful Business Building",
      description:
        "We build and scale companies from the ground up in high-potential sectors, ensuring every business unit creates measurable economic and social value for all stakeholders.",
      Icon: TrendingUp,
    },
    {
      title: "Deep Industry Expertise",
      description:
        "Our leadership team brings decades of cross-sector experience, embedded directly in our business units to drive operational excellence and sustainable, scalable growth.",
      Icon: Users,
    },
    {
      title: "Global Reach, Local Impact",
      description:
        "With business units operating across multiple continents, we understand local market dynamics while leveraging global networks to drive meaningful scale.",
      Icon: Globe,
    },
  ],
  [
    {
      title: "Innovation-Led Growth",
      description:
        "Every company we build is rooted in transformative technology that disrupts legacy industries and creates entirely new markets for underserved populations.",
      Icon: Lightbulb,
    },
    {
      title: "Community Empowerment",
      description:
        "Through the Tolu Michael Foundation, we invest in people — funding entrepreneurship programmes, education initiatives, and economic research worldwide.",
      Icon: Heart,
    },
    {
      title: "Responsible Operations",
      description:
        "ESG principles guide every decision we make, ensuring each of our business units contributes positively to the environment, society, and governance standards globally.",
      Icon: ShieldCheck,
    },
  ],
];

const FeaturesSection = () => (
  <section className="bg-[#07060f] py-[70px]">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[101px]">
      <div className="max-w-[1238px] mx-auto flex flex-col gap-[72px]">
        <h2 className="text-white text-4xl sm:text-[45px] font-bold font-jakarta tracking-[1.8px]">
          What Sets Thelix Holdings Apart
        </h2>
        <div className="flex flex-col gap-[50px]">
          {featureRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-col sm:flex-row items-start gap-10 sm:gap-[55px]"
            >
              {row.map((feature) => (
                <article
                  key={feature.title}
                  className="flex flex-col gap-[35px] flex-1 min-w-0"
                >
                  <feature.Icon className="w-[41px] h-[41px] text-thelix-orange flex-shrink-0" />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-[26.8px] font-bold font-jakarta">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-[18.6px] font-jakarta leading-[30.9px]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---- Team ----
const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data: TeamMember[]) => setMembers(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const featured = members[0] ?? null;
  const rest = members.slice(1);

  return (
    <section className="bg-[#f8f8f7] py-16 lg:py-24" aria-labelledby="team-title">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <h2
          id="team-title"
          className="text-4xl sm:text-[45px] font-bold text-black font-jakarta text-center mb-16"
        >
          Meet The Team
        </h2>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#F48220] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && members.length === 0 && (
          <p className="text-center text-black/40 font-jakarta">
            Team members coming soon.
          </p>
        )}

        {!loading && featured && (
          <>
            {/* Featured / CVO slot */}
            <div className="flex justify-center mb-12">
              <article className="flex flex-col items-center gap-4">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={`${featured.name} portrait`}
                    className="w-[280px] sm:w-[344px] h-auto aspect-square object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-[280px] sm:w-[344px] aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                <div className="text-center">
                  <h3 className="font-bold text-[#07060f] text-2xl font-jakarta">
                    {featured.name}
                  </h3>
                  <p className="text-[#4c4c4c] text-sm font-jakarta leading-[30px]">
                    {featured.designation}
                  </p>
                </div>
              </article>
            </div>

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {rest.map((member) => (
                  <article key={member.id} className="flex flex-col items-center gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} portrait`}
                        className="w-full h-[200px] sm:h-[285px] object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-[200px] sm:h-[285px] bg-gray-100 rounded-xl flex items-center justify-center">
                        <Users className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-bold text-[#07060f] text-xl sm:text-2xl font-jakarta">
                        {member.name}
                      </h3>
                      <p className="text-[#4c4c4c] text-sm font-jakarta leading-[30px]">
                        {member.designation}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// ---- Page ----
export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHero />
      <OurStorySection />
      <MissionVisionSection />
      <FeaturesSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
