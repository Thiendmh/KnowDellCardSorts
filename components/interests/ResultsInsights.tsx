"use client";

import { computeInterestInsights } from "@/lib/occupationalInterestInsights";
import type { OccupationalInterestState } from "@/types/occupationalInterest";
import type { Card } from "@/types";
import { useT } from "@/i18n";

interface Props {
  state: OccupationalInterestState;
  cards: Card[];
}

export function ResultsInsights({ state, cards }: Props) {
  const t = useT();
  const ins = computeInterestInsights(state, cards);

  const tips: string[] = [];
  if (ins.experiencedInTopInterest > 0) {
    tips.push(t.interests.insights.tipExperiencedTop(ins.experiencedInTopInterest));
  }
  if (ins.untriedInTopInterest > 0) {
    tips.push(t.interests.insights.tipUntriedTop(ins.untriedInTopInterest));
  }
  if (ins.exploredBackup > 0) {
    tips.push(t.interests.insights.tipBackupDeep(ins.exploredBackup));
  }

  return (
    <div className="rounded-lg border bg-clay-oat-light/60 p-4">
      <p className="font-medium">
        {t.interests.insights.headline(ins.pursueNowCount, ins.exploreDeepCount)}
      </p>
      {tips.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-clay-silver">
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
