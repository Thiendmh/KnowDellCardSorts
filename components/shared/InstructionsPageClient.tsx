"use client";

import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

const BUCKET_ORDER = ["always", "often", "sometimes", "seldom", "never"] as const;
const BUCKET_STYLE: Record<(typeof BUCKET_ORDER)[number], string> = {
  always:    "border-matcha-300 bg-[#f0fdf6] text-matcha-800",
  often:     "border-clay-oat bg-white text-clay-black",
  sometimes: "border-clay-oat bg-white text-clay-black",
  seldom:    "border-clay-oat bg-white text-clay-black",
  never:     "border-red-200 bg-[#fff0f0] text-red-800",
};

const DECK_STYLE = {
  "--deck-color": "#078a52",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function InstructionsPageClient() {
  const t = useT();
  return (
    <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
      <ProgressHeader step={2} titleEn="How to sort" titleVi="Hướng dẫn phân loại" />
      <section className="container max-w-3xl py-6">
        <p className="text-clay-charcoal">{t.instructions.intro}</p>
        <div className="mt-6 space-y-3">
          {BUCKET_ORDER.map((b) => (
            <div key={b} className={`rounded-xl border p-4 ${BUCKET_STYLE[b]}`}>
              <div className="font-semibold">{t.buckets[b]}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-matcha-300 bg-[#f0fdf6] p-4">
          <div className="font-semibold text-matcha-600">{t.instructions.alwaysRule}</div>
          <div className="mt-1 text-sm text-clay-charcoal">{t.instructions.alwaysRuleBody}</div>
        </div>
        <div className="mt-6 rounded-xl border border-clay-oat bg-clay-cream p-4 text-sm text-clay-charcoal">
          <strong className="text-clay-black">{t.instructions.tipLabel}</strong>{" "}
          {t.instructions.tipBody}
        </div>
      </section>
      <StickyFooterActions
        backHref="/"
        continueHref="/sort"
        continueLabel={t.instructions.startSorting}
      />
    </main>
  );
}
