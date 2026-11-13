import { ArrowUpRight, BarChart3, Globe2, GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

const metrics = [
  { value: "5", label: "companies building practical solutions" },
  { value: "2", label: "continents connected by our work" },
  { value: "1", label: "shared purpose: expanding opportunity" },
];

const pillars = [
  { eyebrow: "Economic mobility", title: "Creating clearer paths to meaningful careers.", body: "Through practical education and career-focused platforms, we help people gain relevant skills, navigate transitions, and move toward work with greater confidence.", icon: GraduationCap, tone: "bg-[#dce8df]" },
  { eyebrow: "Access across borders", title: "Helping ambition move without boundaries.", body: "Our global mobility solutions make complex pathways easier to understand, giving founders, professionals, and families the clarity they need to pursue opportunities internationally.", icon: Globe2, tone: "bg-[#e6e1f0]" },
  { eyebrow: "Business growth", title: "Building systems that turn effort into momentum.", body: "From financial empowerment to revenue operations, our companies create practical infrastructure that helps individuals and teams make stronger decisions and grow sustainably.", icon: BarChart3, tone: "bg-[#f0dfd4]" },
];

export default function Impact() {
  const reduceMotion = useReducedMotion();
  return (
    <main className="bg-[#f5f4ef] text-black">
      <InnerPageHeader />
      <section className="px-5 pb-20 pt-40 sm:px-8 sm:pt-48 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Our Impact</motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-[1120px] text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.05em] [font-family:var(--font-display)] [text-wrap:balance]">Progress becomes meaningful when more people can take part.</motion.h1>
          <p className="mt-8 max-w-[690px] text-lg leading-[1.65] text-neutral-600">Across technology, education, finance, mobility, and business growth, we build practical systems that help people move forward.</p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-36" aria-label="Impact overview">
        <div className="mx-auto overflow-hidden rounded-[10px] bg-black p-3 shadow-[0_24px_80px_-36px_rgb(0_0_0_/_0.55)]">
          <div className="relative flex min-h-[62svh] items-end overflow-hidden rounded-[7px] bg-[#cfd5ca] p-7 sm:p-10 lg:p-14">
            <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_34%),linear-gradient(135deg,transparent_0%,rgb(0_0_0_/_0.16)_100%)]" />
            <div className="relative grid w-full gap-8 text-black lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <h2 className="max-w-[760px] text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.96] tracking-[-0.04em] [font-family:var(--font-display)]">One ecosystem. Multiple pathways to opportunity.</h2>
              <p className="max-w-[520px] text-base leading-[1.65] lg:justify-self-end">We connect expertise, technology, and long-term thinking to solve real problems—not in isolation, but as an ecosystem designed to compound value.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Breadth & direction</p>
          <div className="mt-10 grid border-y border-black/15 md:grid-cols-3">
            {metrics.map((metric, index) => <article key={metric.label} className={`py-9 md:px-8 md:py-12 ${index > 0 ? "border-t border-black/15 md:border-l md:border-t-0" : ""}`}><p className="text-[clamp(4rem,8vw,7rem)] leading-none tracking-[-0.06em] tabular-nums">{metric.value}</p><p className="mt-5 max-w-[240px] text-sm leading-[1.55] text-neutral-600">{metric.label}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-24 sm:px-8 lg:px-16 lg:pb-36">
        <div className="mx-auto max-w-[1320px] space-y-6">
          {pillars.map((pillar, index) => { const Icon = pillar.icon; return <article key={pillar.title} className={`grid min-h-[560px] overflow-hidden rounded-[10px] shadow-[0_0_0_1px_rgb(0_0_0_/_0.06),0_18px_50px_-34px_rgb(0_0_0_/_0.4)] lg:grid-cols-2 ${pillar.tone}`}><div className={`flex flex-col p-7 sm:p-10 lg:p-14 ${index % 2 ? "lg:order-2" : ""}`}><Icon className="size-9" strokeWidth={1.5} aria-hidden="true" /><p className="mt-20 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600 lg:mt-auto">{pillar.eyebrow}</p><h2 className="mt-5 max-w-[560px] text-[clamp(2.25rem,4vw,4rem)] leading-[0.98] tracking-[-0.035em] [font-family:var(--font-display)]">{pillar.title}</h2><p className="mt-7 max-w-[540px] leading-[1.65] text-neutral-700">{pillar.body}</p></div><div className={`m-3 min-h-[340px] rounded-[7px] bg-black/10 outline outline-1 -outline-offset-1 outline-black/10 ${index % 2 ? "lg:order-1" : ""}`} aria-hidden="true" /></article>; })}
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><h2 className="max-w-[820px] text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.96] tracking-[-0.04em] [font-family:var(--font-display)]">Build a more useful future with us.</h2><a href="mailto:info@thelixholdings.com" className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-150 active:scale-[0.96]">Start a conversation <ArrowUpRight className="ms-2 size-4" /></a></div>
      </section>
      <Footer />
    </main>
  );
}
