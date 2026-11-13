import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

const inputClass = "min-h-12 w-full border-b border-black/25 bg-transparent py-3 text-base text-black outline-none transition-[border-color] duration-150 placeholder:text-neutral-400 focus:border-black";

export default function Contact() {
  return (
    <main className="bg-white text-black">
      <InnerPageHeader />
      <section className="px-5 pb-24 pt-40 sm:px-8 sm:pb-32 sm:pt-48 lg:px-16 lg:pb-40">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Contact us</p>
            <h1 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.045em] [font-family:var(--font-display)]">Let’s Build What’s Possible.</h1>
            <p className="mt-8 max-w-[560px] text-lg leading-[1.6] text-neutral-600">Whether you want to learn more about Thelix, connect with one of our companies, or start a conversation, we’d be glad to hear from you.</p>
            <div className="mt-14 space-y-8 text-sm">
              <div><p className="font-semibold uppercase tracking-[0.12em]">Email</p><a href="mailto:info@thelixholdings.com" className="mt-2 inline-block text-neutral-600">info@thelixholdings.com</a></div>
              <div><p className="font-semibold uppercase tracking-[0.12em]">Dallas</p><address className="mt-2 not-italic leading-6 text-neutral-600">14160 N Dallas Parkway, Suite 760<br />Dallas, TX 75254</address></div>
              <div><p className="font-semibold uppercase tracking-[0.12em]">Lagos</p><address className="mt-2 not-italic leading-6 text-neutral-600">5 Balogun Street, Anifowose<br />Ikeja, Lagos</address></div>
            </div>
          </div>
          <form action="mailto:info@thelixholdings.com" method="post" encType="text/plain" className="rounded-[8px] bg-[#f2f0e9] p-6 shadow-[0_0_0_1px_rgb(0_0_0_/_0.05),0_18px_40px_-28px_rgb(0_0_0_/_0.3)] sm:p-10">
            <h2 className="text-3xl [font-family:var(--font-display)]">Send us a message</h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">First name<input name="firstName" required className={inputClass} placeholder="Your first name" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">Last name<input name="lastName" required className={inputClass} placeholder="Your last name" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">Email address<input name="email" type="email" required className={inputClass} placeholder="you@company.com" /></label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">How can we help?<textarea name="message" required rows={5} className={`${inputClass} resize-y`} placeholder="Tell us a little about your enquiry" /></label>
            </div>
            <button type="submit" className="mt-10 min-h-12 rounded-[3px] bg-black px-7 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.96]">Send Message</button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
