"use client";

import { useMemo } from "react";
import { useCardSortStore } from "@/store/useCardSortStore";
import { computeChoiceStats } from "@/lib/scoring";
import { generateInsights } from "@/lib/insights";
import { Sparkles, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, useT } from "@/i18n";

const TONE_STYLE = {
  positive: "border-emerald-300 bg-emerald-50 text-emerald-900",
  info: "border-amber-300 bg-amber-50 text-amber-900",
  warning: "border-rose-300 bg-rose-50 text-rose-900",
};
const TONE_ICON = {
  positive: Sparkles,
  info: Info,
  warning: AlertTriangle,
};

export function InsightsPanel() {
  const t = useT();
  const lang = useLanguage();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const choices = useCardSortStore((s) => s.choices);
  const matrix = useCardSortStore((s) => s.matrix);

  const insights = useMemo(
    () =>
      generateInsights(
        choices.map((choice) => ({
          choice,
          stats: computeChoiceStats(matrix, choice.id, rankedTop8),
        })),
        lang,
      ),
    [choices, matrix, rankedTop8, lang],
  );

  if (insights.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        {t.results.emptyInsights}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {insights.map((i, idx) => {
        const Icon = TONE_ICON[i.tone];
        return (
          <div
            key={idx}
            className={cn(
              "flex items-start gap-3 rounded-lg border-2 p-3",
              TONE_STYLE[i.tone],
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-relaxed">{i.text}</p>
          </div>
        );
      })}
    </div>
  );
}
