import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

const inputClass = "min-h-12 w-full border-b border-white/25 bg-transparent py-3 text-base text-white outline-none transition-[border-color] duration-150 placeholder:text-white/35 focus:border-white";

export default function Partnerships() {
  return (
    <main className="bg-black text-white">
      <InnerPageHeader />
      <section className="px-5 pb-24 pt-40 sm:px-8 sm:pb-32 sm:pt-48 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-[1320px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Partnerships & enquiries</p>
          <h1 className="mt-6 max-w-[1100px] text-[clamp(3.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.045em] [font-family:var(--font-display)] [text-wrap:balance]">Let’s Create Meaningful Possibilities Together.</h1>
          <p className="mt-8 max-w-[680px] text-lg leading-[1.6] text-white/65">We collaborate with organizations, institutions, investors, and innovators who share our belief that technology and purposeful business can unlock greater opportunity.</p>
        </div>
      </section>

      <section className="border-t border-white/15 px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] leading-none tracking-[-0.035em] [font-family:var(--font-display)]">Start a conversation.</h2>
            <p className="mt-7 max-w-[500px] leading-[1.65] text-white/60">Tell us what you’re building, the opportunity you see, and how you imagine working with Thelix. Our team will direct your enquiry to the right people.</p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {["Strategic partnerships", "Investment enquiries", "Institutional collaboration", "Media and speaking"].map((item, index) => <div key={item} className="flex items-center gap-4 border-t border-white/15 py-5"><span className="text-xs tabular-nums text-white/35">0{index + 1}</span><p>{item}</p></div>)}
            </div>
          </div>
          <form action="mailto:info@thelixholdings.com" method="post" encType="text/plain" className="rounded-[8px] bg-white/5 p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)] sm:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">Name<input name="name" required className={inputClass} placeholder="Your full name" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">Organization<input name="organization" className={inputClass} placeholder="Company or institution" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">Work email<input name="email" type="email" required className={inputClass} placeholder="you@company.com" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">Partnership type<select name="partnershipType" className={inputClass} defaultValue=""><option value="" disabled className="text-black">Select an option</option><option className="text-black">Strategic partnership</option><option className="text-black">Investment enquiry</option><option className="text-black">Institutional collaboration</option><option className="text-black">Media or speaking</option></select></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">Tell us about the opportunity<textarea name="message" required rows={5} className={`${inputClass} resize-y`} placeholder="Share the context, opportunity, and what success could look like" /></label>
            </div>
            <button type="submit" className="mt-10 min-h-12 rounded-[3px] bg-white px-7 text-sm font-semibold text-black transition-transform duration-150 active:scale-[0.96]">Submit Enquiry</button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
