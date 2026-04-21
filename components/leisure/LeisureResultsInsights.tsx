"use client";

import { computeLeisureInsights } from "@/lib/leisureActivitiesInsights";
import type { LeisureActivitiesState } from "@/types/leisureActivities";
import type { Card } from "@/types";
import { useT } from "@/i18n";

interface Props {
  state: LeisureActivitiesState;
  cards: Card[];
}

export function LeisureResultsInsights({ state, cards }: Props) {
  const t = useT();
  const ins = computeLeisureInsights(state, cards);

  const tips: string[] = [];
  if (ins.activeInTopBuckets > 0) {
    tips.push(t.leisure.insights.tipActiveTop(ins.activeInTopBuckets));
  }
  if (ins.untriedHighInterest > 0) {
    tips.push(t.leisure.insights.tipUntriedHighInterest(ins.untriedHighInterest));
  }

  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <p className="font-medium">
        {t.leisure.insights.headline(ins.priorityCount, ins.keepActiveCount)}
      </p>
      {tips.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
