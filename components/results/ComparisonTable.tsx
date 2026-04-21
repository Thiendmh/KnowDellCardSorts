"use client";

import { useMemo } from "react";
import { useCardSortStore } from "@/store/useCardSortStore";
import { computeChoiceStats } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

export function ComparisonTable() {
  const t = useT();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const choices = useCardSortStore((s) => s.choices);
  const matrix = useCardSortStore((s) => s.matrix);

  const rows = useMemo(
    () =>
      choices.map((choice) => ({
        choice,
        stats: computeChoiceStats(matrix, choice.id, rankedTop8),
      })),
    [choices, matrix, rankedTop8],
  );

  const maxScore = Math.max(...rows.map((r) => r.stats.totalScore), 0);

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-clay-oat-light/50">
          <tr>
            <th className="p-3 text-left text-xs font-semibold uppercase tracking-wide">
              {t.results.colChoice}
            </th>
            <th className="p-3 text-right text-xs font-semibold uppercase tracking-wide">
              {t.results.colTotal}
            </th>
            <th className="p-3 text-right text-xs font-semibold uppercase tracking-wide">
              {t.results.colSupport}
            </th>
            <th className="p-3 text-right text-xs font-semibold uppercase tracking-wide">
              {t.results.colUnknown}
            </th>
            <th className="p-3 text-right text-xs font-semibold uppercase tracking-wide">
              {t.results.colConflict}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ choice, stats }) => (
            <tr key={choice.id} className="border-t">
              <td className="p-3 font-medium">{choice.label}</td>
              <td
                className={cn(
                  "p-3 text-right font-mono text-base",
                  stats.totalScore === maxScore &&
                    maxScore > 0 &&
                    "font-bold text-matcha-600",
                )}
              >
                {stats.totalScore}
              </td>
              <td className="p-3 text-right font-mono text-emerald-700">
                {stats.supportCount}
              </td>
              <td className="p-3 text-right font-mono text-amber-700">
                {stats.unknownCount}
              </td>
              <td className="p-3 text-right font-mono text-rose-700">
                {stats.conflictCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
