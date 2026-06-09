const COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Technology:    { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200" },
  Leadership:    { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  Innovation:    { bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-200" },
  "Company News":{ bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
  Philanthropy:  { bg: "bg-rose-50",   text: "text-rose-500",   border: "border-rose-200" },
  Insights:      { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  Cybersecurity: { bg: "bg-red-50",    text: "text-red-500",    border: "border-red-200" },
  Team:          { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-200" },
  Work:          { bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-200" },
  Development:   { bg: "bg-cyan-50",   text: "text-cyan-600",   border: "border-cyan-200" },
  Design:        { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
};

const FALLBACK = { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };

export function getCategoryColor(category: string) {
  return COLORS[category] ?? FALLBACK;
}

export function CategoryChip({ category }: { category: string }) {
  const c = getCategoryColor(category);
  return (
    <span className={`text-xs font-medium font-jakarta px-2.5 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      {category}
    </span>
  );
}
