import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PAGE_SIZE = 15;

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  source: string;
}

// ---- Hero ----
const NewsHero = () => (
  <section
    aria-labelledby="hero-intro-title"
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-20 text-center flex flex-col items-center">
      <h1
        id="hero-intro-title"
        className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta leading-tight mb-4"
      >
        Stay Informed with the Latest<br /> from Thelix Holdings
      </h1>
      <p className="text-black/80 text-base leading-[25px] font-jakarta max-w-[675px]">
        Explore our latest news, insights, and updates — from press coverage and industry blogs
        to milestone announcements across global media.
      </p>
    </div>
  </section>
);

// ---- Featured Article ----
const FeaturedArticle = ({ article }: { article: Article }) => (
  <section aria-labelledby="featured-heading" className="bg-white py-10 lg:py-14">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Image */}
        <div className="lg:flex-[1.4] flex-shrink-0">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[280px] sm:h-[380px] lg:h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-[280px] sm:h-[380px] lg:h-full bg-gray-100 rounded-2xl" />
          )}
        </div>

        {/* Text */}
        <div className="lg:flex-1 bg-[#f6f5f5] rounded-2xl p-6 lg:p-10 flex flex-col gap-6 justify-center">
          <time className="text-black/40 text-sm font-jakarta">
            {article.source && <span>{article.source} · </span>}
            {article.date}
          </time>
          <h2
            id="featured-heading"
            className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-[1.12px] leading-snug"
          >
            {article.title}
          </h2>
          {article.description && (
            <p className="text-black/80 text-base leading-[27px] font-jakarta">
              {article.description}
            </p>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white rounded border border-thelix-orange/40 w-fit hover:bg-orange-50 transition-colors"
          >
            <span className="text-thelix-orange text-base font-medium font-jakarta">Read article</span>
            <ExternalLink size={16} className="text-thelix-orange" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ---- Article Card ----
const ArticleCard = ({ article }: { article: Article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col gap-3 group"
  >
    {article.image ? (
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-[220px] object-cover rounded-xl group-hover:opacity-90 transition-opacity"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-[220px] rounded-xl bg-gray-100 flex items-center justify-center">
        <span className="text-black/20 text-sm font-jakarta">No image</span>
      </div>
    )}
    <div className="flex flex-col gap-1">
      <h3 className="text-black font-medium text-xl sm:text-[22px] font-jakarta leading-snug group-hover:text-thelix-orange transition-colors">
        {article.title}
      </h3>
      <p className="text-black/50 text-sm font-jakarta">
        {article.source && <span>{article.source} · </span>}
        {article.date}
      </p>
    </div>
  </a>
);

// ---- Skeleton ----
const SkeletonCard = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    <div className="w-full h-[220px] rounded-xl bg-gray-100" />
    <div className="h-5 bg-gray-100 rounded w-4/5" />
    <div className="h-4 bg-gray-100 rounded w-1/3" />
  </div>
);

// ---- Pagination ----
const Pagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="flex items-center justify-center gap-4 mt-14">
    <button
      onClick={onPrev}
      disabled={page === 1}
      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded text-sm font-jakarta text-black disabled:opacity-30 hover:border-thelix-orange hover:text-thelix-orange transition-colors"
    >
      <ChevronLeft size={16} /> Previous
    </button>
    <span className="text-sm font-jakarta text-black/50">
      Page {page} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={page === totalPages}
      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded text-sm font-jakarta text-black disabled:opacity-30 hover:border-thelix-orange hover:text-thelix-orange transition-colors"
    >
      Next <ChevronRight size={16} />
    </button>
  </div>
);

// ---- Page ----
export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: Article[]) => setArticles(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const featured = articles[0] ?? null;
  const rest = articles.slice(1);

  // Pagination on rest (14 per page, since featured takes 1 slot on page 1)
  const GRID_SIZE = PAGE_SIZE - 1;
  const totalPages = Math.max(1, Math.ceil(rest.length / GRID_SIZE));
  const paginated = rest.slice((page - 1) * GRID_SIZE, page * GRID_SIZE);

  const goUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <Navbar />
      <NewsHero />

      {loading && (
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </section>
      )}

      {!loading && articles.length === 0 && (
        <section className="bg-white py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] text-center">
            <p className="text-black/40 font-jakarta text-lg">
              No articles published yet. Add some from the admin panel.
            </p>
          </div>
        </section>
      )}

      {!loading && featured && (
        <>
          {/* Only show featured on page 1 */}
          {page === 1 && <FeaturedArticle article={featured} />}

          <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
              <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] mb-12">
                {page === 1 ? "Latest News" : `All News — Page ${page}`}
              </h2>

              {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {paginated.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="text-black/40 font-jakarta text-sm">
                  Only one article published so far.
                </p>
              )}

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={() => { setPage((p) => p - 1); goUp(); }}
                  onNext={() => { setPage((p) => p + 1); goUp(); }}
                />
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
