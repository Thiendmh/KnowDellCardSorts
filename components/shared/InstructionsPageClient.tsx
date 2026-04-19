"use client";

import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

const BUCKET_ORDER = ["always", "often", "sometimes", "seldom", "never"] as const;
const BUCKET_STYLE: Record<(typeof BUCKET_ORDER)[number], string> = {
  always: "bg-emerald-50 border-emerald-300 text-emerald-900",
  often: "bg-sky-50 border-sky-300 text-sky-900",
  sometimes: "bg-amber-50 border-amber-300 text-amber-900",
  seldom: "bg-orange-50 border-orange-300 text-orange-900",
  never: "bg-rose-50 border-rose-300 text-rose-900",
};

export function InstructionsPageClient() {
  const t = useT();
  return (
    <main className="min-h-dvh">
      <ProgressHeader
        step={2}
        titleEn="How to sort"
        titleVi="Hướng dẫn phân loại"
      />
      <section className="container max-w-3xl py-6">
        <p className="text-muted-foreground">{t.instructions.intro}</p>

        <div className="mt-6 space-y-3">
          {BUCKET_ORDER.map((b) => (
            <div
              key={b}
              className={`rounded-lg border-2 p-4 ${BUCKET_STYLE[b]}`}
            >
              <div className="font-semibold">{t.buckets[b]}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border-2 border-primary bg-primary/5 p-4">
          <div className="font-semibold text-primary">
            {t.instructions.alwaysRule}
          </div>
          <div className="mt-1 text-sm">{t.instructions.alwaysRuleBody}</div>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">{t.instructions.tipLabel}</strong>{" "}
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
