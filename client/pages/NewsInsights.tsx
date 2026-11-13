import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

interface Article { id: string; title: string; description: string; image: string; url: string; date: string; source: string; }
const filters = ["All", "Company news", "Technology", "Leadership", "Impact"];

export default function NewsInsights() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [active, setActive] = useState("All");
  useEffect(() => { fetch("/api/news").then((response) => response.json()).then((data) => setArticles(Array.isArray(data) ? data : data.articles ?? [])).catch(() => setArticles([])); }, []);
  const visible = useMemo(() => active === "All" ? articles : articles.filter((article) => `${article.title} ${article.description}`.toLowerCase().includes(active === "Technology" ? "tech" : active.split(" ")[0].toLowerCase())), [active, articles]);
  const featured = articles.slice(0, 5);

  return (
    <main className="bg-[#f5f4ef] text-black">
      <InnerPageHeader />
      <section className="px-5 pb-16 pt-40 sm:px-8 sm:pt-48 lg:px-16 lg:pb-24"><div className="mx-auto max-w-[1320px]"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">News & Insights</p><h1 className="mt-6 text-[clamp(4rem,9vw,9rem)] leading-[0.84] tracking-[-0.055em] [font-family:var(--font-display)]">What’s moving us forward.</h1></div></section>
      <section className="overflow-hidden pb-24 lg:pb-36" aria-label="Featured stories"><div className="flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(4rem,calc((100vw-1320px)/2))]">{featured.map((article, index) => <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className={`group relative flex min-h-[520px] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] p-7 text-white shadow-[0_18px_55px_-32px_rgb(0_0_0_/_0.55)] sm:p-9 ${index === 0 ? "w-[86vw] max-w-[760px]" : "w-[78vw] max-w-[520px]"}`}><img src={article.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" /><p className="relative text-xs font-semibold uppercase tracking-[0.15em] text-white/65">{article.source || "Thelix Holdings"} · {article.date}</p><div className="relative mt-auto"><h2 className="text-[clamp(2rem,4vw,4rem)] leading-[0.98] tracking-[-0.035em] [font-family:var(--font-display)]">{article.title}</h2><span className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold">Read more <ArrowUpRight className="ms-2 size-4" /></span></div></a>)}</div></section>
      <section className="bg-white px-5 py-24 sm:px-8 lg:px-16 lg:py-36"><div className="mx-auto max-w-[1320px]"><div className="flex flex-col justify-between gap-8 border-b border-black/15 pb-8 lg:flex-row lg:items-end"><h2 className="text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-0.04em] [font-family:var(--font-display)]">All stories</h2><div className="flex flex-wrap gap-2" aria-label="Filter stories">{filters.map((filter) => <button key={filter} type="button" onClick={() => setActive(filter)} className={`min-h-11 rounded-full px-5 text-sm transition-[background-color,color,transform] duration-150 active:scale-[0.96] ${active === filter ? "bg-black text-white" : "bg-neutral-100 text-black hover:bg-neutral-200"}`}>{filter}</button>)}</div></div><div className="grid gap-x-5 gap-y-14 pt-10 sm:grid-cols-2 lg:grid-cols-3">{visible.map((article) => <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-[4/3] overflow-hidden rounded-[8px] bg-neutral-200 outline outline-1 -outline-offset-1 outline-black/10">{article.image && <img src={article.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}</div><p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{article.source} · {article.date}</p><h3 className="mt-3 text-[clamp(1.55rem,2.2vw,2.25rem)] leading-[1.08] tracking-[-0.025em] [font-family:var(--font-display)]">{article.title}</h3></a>)}</div>{articles.length === 0 && <p className="py-20 text-center text-neutral-500">Loading the latest stories…</p>}</div></section>
      <section className="bg-black px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-32"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-[800px] text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.96] tracking-[-0.04em] [font-family:var(--font-display)]">Have a media or press enquiry?</h2><a href="mailto:info@thelixholdings.com" className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-150 active:scale-[0.96]">Contact Thelix <ArrowUpRight className="ms-2 size-4" /></a></div></section>
      <Footer />
    </main>
  );
}
