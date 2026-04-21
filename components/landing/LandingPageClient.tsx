"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT, useLanguage } from "@/i18n";
import { DeckGrid } from "./DeckGrid";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";

export function LandingPageClient() {
  const t = useT();
  const lang = useLanguage();
  const hydrated = useHydrated();
  const setLanguage = useCardSortStore((s) => s.setLanguage);
  const current = hydrated ? lang : "vi";

  if (!hydrated) return null;

  return (
    <main className="min-h-dvh bg-clay-cream">
      {/* ——— NAV ——— */}
      <nav className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-clay-oat bg-clay-cream px-6 sm:px-10 no-print">
        <span className="font-mono text-[13px] font-bold tracking-wider text-clay-black">
          KNOWDELL
        </span>
        <div className="flex items-center gap-2">
          {/* Language toggle inline in nav */}
          <div className="flex items-center rounded-full border border-clay-oat bg-clay-cream p-0.5 shadow-clay font-mono text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              aria-pressed={current === "vi"}
              className={`clay-btn rounded-full px-3 py-1 transition-colors ${
                current === "vi" ? "bg-clay-black text-white" : "text-clay-silver"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={current === "en"}
              className={`clay-btn rounded-full px-3 py-1 transition-colors ${
                current === "en" ? "bg-clay-black text-white" : "text-clay-silver"
              }`}
            >
              EN
            </button>
          </div>
          <Link
            href="/instructions"
            className="clay-btn inline-flex items-center gap-1.5 rounded-full bg-clay-black px-4 py-2 text-sm font-semibold text-white shadow-clay hover:bg-matcha-600"
          >
            {lang === "en" ? "Start Sorting" : "Bắt đầu"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* ——— HERO ——— */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 sm:px-10 sm:pt-20">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[1.08px] text-clay-silver">
          {t.landing.heroBadge}
        </div>
        <h1 className="text-5xl font-bold leading-[1.02] tracking-[-2px] text-clay-black sm:text-6xl sm:tracking-[-2.5px]">
          {lang === "en" ? (
            <>
              Discover What<br />
              <span className="text-matcha-600">Drives</span> You
            </>
          ) : (
            <>
              Khám phá điều<br />
              <span className="text-matcha-600">thúc đẩy</span> bạn
            </>
          )}
        </h1>
        <p className="mt-5 max-w-lg text-xl leading-relaxed text-clay-charcoal">
          {t.landing.heroDesc}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/instructions"
            className="clay-btn inline-flex items-center gap-2 rounded-full bg-clay-black px-7 py-3.5 text-base font-semibold text-white shadow-clay hover:bg-matcha-600"
          >
            {t.landing.ctaTry}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#methodology"
            className="clay-btn inline-flex items-center gap-2 rounded border border-clay-silver px-7 py-3.5 text-base font-medium text-clay-black hover:bg-lemon-500"
          >
            {t.landing.ctaLearn}
          </a>
        </div>
      </section>

      {/* ——— METHODOLOGY (Matcha swatch) ——— */}
      <section id="methodology" className="bg-matcha-800 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[1.08px] text-matcha-300">
            {lang === "en" ? "The Methodology" : "Phương pháp"}
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-[-1.2px] text-white sm:text-[40px]">
            {t.landing.methodologyTitle}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-matcha-300">
            {t.landing.methodologyBody}
          </p>
          <div className="mt-6 inline-block max-w-md rounded-2xl border border-white/15 bg-white/8 p-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1px] text-matcha-300">
              {t.landing.methodologyWhoTitle}
            </div>
            <p className="text-sm leading-relaxed text-white">
              {t.landing.methodologyWhoBody}
            </p>
          </div>
        </div>
      </section>

      {/* ——— DECKS (cream) ——— */}
      <section className="border-t border-clay-oat-light px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[1.08px] text-clay-silver">
            {lang === "en" ? "The Decks" : "Các bộ bài"}
          </div>
          <h2 className="text-3xl font-bold tracking-[-1px] text-clay-black sm:text-4xl">
            {t.landing.decksTitle}
          </h2>
          <p className="mt-2 text-base text-clay-silver">{t.landing.decksSubtitle}</p>
          <div className="mt-10">
            <DeckGrid />
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS (Lemon swatch) ——— */}
      <section className="bg-lemon-500 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[1.08px] text-clay-charcoal">
            {lang === "en" ? "How It Works" : "Cách hoạt động"}
          </div>
          <h2 className="text-3xl font-bold tracking-[-1px] text-clay-black sm:text-4xl">
            {t.landing.howItWorksTitle}
          </h2>
          <p className="mt-2 text-base text-clay-charcoal">
            {lang === "en" ? "No login. No data collected. Works on any device." : "Không cần đăng nhập. Không lưu dữ liệu. Dùng được trên mọi thiết bị."}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.landing.howItWorksSteps.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-clay-oat bg-white p-5 shadow-clay"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-clay-black font-mono text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-clay-black">{s.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-clay-charcoal">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FINAL CTA ——— */}
      <section className="border-t border-dashed border-clay-oat px-6 py-16 text-center sm:px-10">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-[-1.2px] text-clay-black sm:text-4xl">
            {t.landing.finalCtaTitle}
          </h2>
          <p className="mt-3 text-clay-silver">{t.landing.finalCtaBody}</p>
          <div className="mt-8">
            <Link
              href="/instructions"
              className="clay-btn inline-flex items-center gap-2 rounded-full bg-clay-black px-7 py-3.5 text-base font-semibold text-white shadow-clay hover:bg-matcha-600"
            >
              {t.landing.ctaTry}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer className="border-t border-clay-oat px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-mono text-[11px] text-clay-silver">KNOWDELL CARD SORTS</span>
          <span className="text-[11px] text-clay-silver">{t.common.privacyFooter}</span>
        </div>
      </footer>
    </main>
  );
}
