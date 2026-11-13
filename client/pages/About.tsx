import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

const beliefs = [
  ["01", "Innovation With Purpose", "We believe the most valuable innovations solve real problems and make a meaningful difference in people’s lives."],
  ["02", "People Before Possibilities", "Technology creates its greatest value when it empowers people. Human needs and aspirations sit at the heart of what we build."],
  ["03", "Ambition Without Borders", "Great ideas should not be limited by geography. We think globally and build with a vision that extends beyond boundaries."],
  ["04", "Progress That Lasts", "Success is measured not only by what we create, but by the value it continues to deliver over time."],
];

const approach = [
  ["01", "We Identify", "Meaningful challenges, unmet needs, and opportunities where innovation can create real value."],
  ["02", "We Imagine", "We challenge conventional thinking and shape bold ideas into practical solutions."],
  ["03", "We Build", "Technology, talent, and execution come together to create businesses designed around real needs."],
  ["04", "We Grow", "We refine and scale every business with a focus on relevance, performance, and lasting impact."],
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{children}</p>;
}

export default function About() {
  return (
    <main className="bg-white text-black">
      <InnerPageHeader />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-neutral-300 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.62),rgb(0_0_0_/_0.06)),url('/joinus-image.png')] bg-cover bg-center" />
        <Reveal className="relative z-10 mx-auto w-full max-w-[1320px] text-white">
          <Label>Who we are</Label>
          <h1 id="about-hero-heading" className="mt-5 max-w-[1080px] text-[clamp(3.25rem,7vw,7rem)] leading-[0.92] tracking-[-0.045em] [font-family:var(--font-display)] [text-wrap:balance]">
            We Build Businesses That Shape What’s Next.
          </h1>
          <p className="mt-7 max-w-[670px] text-base leading-[1.6] text-white/85 sm:text-lg [text-wrap:pretty]">
            Thelix Holdings is a technology and innovation group turning ambitious ideas into businesses that solve real-world problems and create lasting value across industries.
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
          <Reveal><Label>01 — Our story</Label></Reveal>
          <Reveal>
            <h2 className="max-w-[850px] text-[clamp(2.75rem,5vw,5rem)] leading-[1] tracking-[-0.035em] [font-family:var(--font-display)] [text-wrap:balance]">Every Great Venture Begins With a Reason to Build.</h2>
            <div className="mt-10 max-w-[720px] space-y-6 text-base leading-[1.65] text-neutral-700 sm:text-lg">
              <p>Founded in 2023, Thelix Holdings was born from a belief that meaningful innovation begins with identifying real problems and having the courage to solve them.</p>
              <p>What started as an entrepreneurial vision has grown into a group of businesses operating across cybersecurity, education, financial empowerment, global mobility, and career technology.</p>
              <p>Although each business serves a different purpose, they share the same ambition: to create practical solutions that open doors, empower people, and make everyday possibilities greater.</p>
              <p className="font-semibold text-black">And for us, this is only the beginning.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal><Label>02 — Why we exist</Label><h2 className="mt-6 max-w-[1000px] text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] tracking-[-0.04em] [font-family:var(--font-display)] [text-wrap:balance]">To Make Possibility Accessible to More People.</h2></Reveal>
          <Reveal className="mt-14 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-2 lg:gap-20">
            <p className="text-lg leading-[1.6] text-white/70">We exist to bridge the gap between challenges and opportunities by building technology-driven businesses that make a meaningful difference.</p>
            <p className="text-lg leading-[1.6] text-white/70">From helping individuals develop new skills to supporting institutions, careers, and global ambitions, our purpose is to create solutions that help people move forward.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal><Label>03 — Vision & mission</Label><h2 className="mt-6 max-w-[900px] text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">Guided by Vision. Grounded in Purpose.</h2></Reveal>
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[8px] bg-[#f2f0e9] p-7 shadow-[0_0_0_1px_rgb(0_0_0_/_0.05),0_12px_32px_-20px_rgb(0_0_0_/_0.24)] sm:p-10 lg:min-h-[360px]"><Label>Our vision</Label><p className="mt-16 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.12] tracking-[-0.025em] [font-family:var(--font-display)]">To build a globally influential ecosystem of innovative businesses that transform industries, expand opportunities, and improve lives.</p></Reveal>
            <Reveal className="rounded-[8px] bg-neutral-300 p-7 shadow-[0_0_0_1px_rgb(0_0_0_/_0.05),0_12px_32px_-20px_rgb(0_0_0_/_0.24)] sm:p-10 lg:min-h-[360px]"><Label>Our mission</Label><p className="mt-16 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.12] tracking-[-0.025em] [font-family:var(--font-display)]">To identify meaningful challenges and develop technology-driven businesses that deliver practical solutions, empower people, and create sustainable value.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal><Label>04 — What we believe</Label><h2 className="mt-6 max-w-[880px] text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">Our Beliefs Shape Everything We Build.</h2></Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[8px] bg-black/10 sm:grid-cols-2">
            {beliefs.map(([number, title, description]) => <Reveal key={number} className="min-h-[300px] bg-white p-7 sm:p-10"><p className="text-xs font-semibold tracking-[0.14em] text-neutral-400">{number}</p><h3 className="mt-16 text-3xl leading-[1.05] [font-family:var(--font-display)]">{title}</h3><p className="mt-5 max-w-[470px] leading-[1.6] text-neutral-600">{description}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal><Label>05 — How we build</Label><h2 className="mt-6 max-w-[900px] text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">From Possibility to Purpose-Driven Businesses.</h2></Reveal>
          <div className="mt-16 border-t border-black">
            {approach.map(([number, title, description]) => <Reveal key={number} className="grid gap-5 border-b border-black py-8 sm:grid-cols-[80px_0.7fr_1fr] sm:items-start sm:gap-8"><p className="text-sm tabular-nums text-neutral-500">{number}</p><h3 className="text-3xl [font-family:var(--font-display)]">{title}</h3><p className="max-w-[560px] leading-[1.6] text-neutral-600">{description}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f0e9] px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal><Label>06 — Our journey</Label><h2 className="mt-6 max-w-[920px] text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">Every Milestone Is a Step Toward Something Greater.</h2></Reveal>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <Reveal><p className="text-6xl [font-family:var(--font-display)]">2023</p><h3 className="mt-6 text-xl font-semibold [font-family:var(--font-body)]">The Beginning</h3><p className="mt-4 leading-[1.6] text-neutral-600">Thelix Holdings was established to develop innovative businesses that create meaningful opportunities and solve real-world challenges.</p></Reveal>
            <Reveal><p className="text-6xl [font-family:var(--font-display)]">05</p><h3 className="mt-6 text-xl font-semibold [font-family:var(--font-body)]">A Growing Ecosystem</h3><p className="mt-4 leading-[1.6] text-neutral-600">Our journey now spans technology, education, cybersecurity, credit, global mobility, and career development.</p></Reveal>
            <Reveal><p className="text-6xl [font-family:var(--font-display)]">Now</p><h3 className="mt-6 text-xl font-semibold [font-family:var(--font-body)]">Building What’s Next</h3><p className="mt-4 leading-[1.6] text-neutral-600">We continue to strengthen our companies and pursue a future where our solutions create value globally.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20">
          <Reveal><img src="/TM's Image.png" alt="Tolulope Michael, Founder and Chief Visionary Officer" className="aspect-square w-full rounded-[8px] object-cover outline outline-1 -outline-offset-1 outline-white/10" /></Reveal>
          <Reveal><Label>07 — Our leadership</Label><h2 className="mt-6 text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">Visionary Thinking. Purposeful Leadership.</h2><p className="mt-8 max-w-[620px] text-lg leading-[1.6] text-white/70">As founder of Thelix Holdings, Tolulope Michael leads the group’s vision of building innovative, technology-driven businesses that address real-world challenges and create opportunities across industries.</p><p className="mt-8 text-sm font-bold uppercase tracking-[0.12em]">Tolulope Michael</p><p className="mt-2 text-sm text-white/60">Founder & Chief Visionary Officer</p><a href="https://tolumichael.com/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center border-b border-white text-sm font-semibold">Meet Our Founder <ArrowUpRight className="ms-2 size-4" aria-hidden="true" /></a></Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-28 text-white sm:px-8 sm:py-36 lg:px-16 lg:py-48">
        <div className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0_/_0.52),rgb(0_0_0_/_0.52)),url('/home_page_photo.jpg')] bg-cover bg-center" />
        <Reveal className="relative z-10 mx-auto max-w-[1320px] text-center"><Label>08 — Our global outlook</Label><h2 className="mx-auto mt-6 max-w-[920px] text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em] [font-family:var(--font-display)]">Our Vision Goes Beyond Borders.</h2><p className="mx-auto mt-8 max-w-[700px] text-lg leading-[1.6] text-white/80">We’re building toward a future where technology creates greater access, opportunity, and progress—taking meaningful solutions further and creating value beyond where we began.</p><a href="/#our-companies" className="mt-10 inline-flex min-h-11 items-center rounded-[3px] bg-white pl-6 pr-[22px] text-sm font-semibold text-black transition-transform duration-150 active:scale-[0.96]">Explore Our Companies <ArrowUpRight className="ms-2 size-4" aria-hidden="true" /></a></Reveal>
      </section>

      <Footer />
    </main>
  );
}
