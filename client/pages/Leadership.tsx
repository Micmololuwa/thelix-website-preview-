import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

const principles = [
  ["01", "Clarity before speed", "We define the problem, the people it affects, and the outcome that matters before we begin building."],
  ["02", "Ownership in action", "We lead close to the work, make thoughtful decisions, and remain accountable for what those decisions create."],
  ["03", "Long-term value", "We build companies and systems designed to remain useful as markets, technologies, and communities evolve."],
  ["04", "People at the centre", "Progress is meaningful when it expands access, creates opportunity, and gives more people room to grow."],
];

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
}

export default function Leadership() {
  const reduceMotion = useReducedMotion();
  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [loadingLeaders, setLoadingLeaders] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/team")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load leadership team");
        return response.json();
      })
      .then((data) => {
        if (active) setLeaders(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setLeaders([]);
      })
      .finally(() => {
        if (active) setLoadingLeaders(false);
      });

    return () => {
      active = false;
    };
  }, []);
  return (
    <main className="bg-white text-black">
      <InnerPageHeader />
      <section className="bg-white px-5 pb-24 pt-40 sm:px-8 sm:pb-28 sm:pt-48 lg:px-16 lg:pb-36" aria-labelledby="leadership-team-heading">
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-[900px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Our people</p>
            <h2 id="leadership-team-heading" className="mt-6 text-[clamp(2.75rem,5vw,5rem)] leading-[0.96] tracking-[-0.04em] [font-family:var(--font-display)]">
              <span className="block">The leaders moving</span>
              <span className="block">our work forward.</span>
            </h2>
            <p className="mt-7 max-w-[620px] text-lg leading-[1.65] text-neutral-600">Meet the people guiding strategy, operations, innovation, and growth across Thelix Holdings and our companies.</p>
          </div>

          {loadingLeaders ? (
            <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading leadership team">
              {Array.from({ length: 8 }).map((_, index) => <div key={index} className="animate-pulse"><div className="aspect-[1.03/1] rounded-[10px] bg-neutral-200" /><div className="mx-auto mt-5 h-6 w-3/4 rounded bg-neutral-200" /><div className="mx-auto mt-3 h-4 w-1/2 rounded bg-neutral-100" /></div>)}
            </div>
          ) : leaders.length > 0 ? (
            <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader, index) => (
                <motion.article
                  key={leader.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="aspect-[1.03/1] overflow-hidden rounded-[10px] bg-neutral-200 shadow-[0_0_0_1px_rgb(0_0_0_/_0.08),0_18px_40px_-30px_rgb(0_0_0_/_0.45)]">
                    {leader.image ? <img src={leader.image} alt={leader.name} loading="lazy" className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10" /> : <div className="flex h-full w-full items-center justify-center text-5xl text-neutral-400 [font-family:var(--font-display)]" aria-hidden="true">{leader.name.charAt(0)}</div>}
                  </div>
                  <h3 className="mt-5 text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.1] tracking-[-0.025em] [font-family:var(--font-body)] font-semibold">{leader.name}</h3>
                  <p className="mt-2 text-sm leading-[1.5] text-neutral-500">{leader.designation}</p>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="mt-16 rounded-[10px] bg-[#f3f1eb] px-6 py-16 text-center shadow-[0_0_0_1px_rgb(0_0_0_/_0.05)]"><p className="text-neutral-600">Leadership profiles are being updated.</p></div>
          )}
        </div>
      </section>
      <section className="bg-[#f3f1eb] px-5 py-24 sm:px-8 lg:px-16 lg:py-36"><div className="mx-auto max-w-[1320px]"><div className="grid gap-8 lg:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">How we lead</p><h2 className="mt-6 max-w-[580px] text-[clamp(2.75rem,5vw,5rem)] leading-[0.96] tracking-[-0.04em] [font-family:var(--font-display)]">Principles that move through every company.</h2></div><p className="max-w-[560px] text-lg leading-[1.65] text-neutral-600 lg:justify-self-end lg:pt-9">Leadership at Thelix is a shared operating practice. These principles shape how we choose opportunities, build teams, and measure progress.</p></div><div className="mt-16 border-t border-black/15">{principles.map(([number, title, body]) => <article key={number} className="grid gap-5 border-b border-black/15 py-8 sm:grid-cols-[80px_0.8fr_1.2fr] sm:items-start sm:gap-8 sm:py-10"><p className="text-sm tabular-nums text-neutral-500">{number}</p><h3 className="text-2xl leading-tight [font-family:var(--font-display)]">{title}</h3><p className="max-w-[540px] leading-[1.65] text-neutral-600">{body}</p></article>)}</div></div></section>
      <Footer />
    </main>
  );
}
