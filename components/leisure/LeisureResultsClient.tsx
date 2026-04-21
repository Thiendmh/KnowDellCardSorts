"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { leisureActivityCards } from "@/data/leisureActivityCards";
import { useLeisureActivitiesStore } from "@/store/useLeisureActivitiesStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  LEISURE_GROUPS_ORDERED,
  type LeisureGroup,
} from "@/types/leisureActivities";
import { groupLeisureActivities } from "@/lib/leisureActivitiesScoring";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { LeisureResultsInsights } from "./LeisureResultsInsights";
import { LeisureResultsGroupSection } from "./LeisureResultsGroupSection";
import { LeisureResultsActions } from "./LeisureResultsActions";
import { useT } from "@/i18n";

export function LeisureResultsClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const activityBuckets = useLeisureActivitiesStore((s) => s.activityBuckets);
  const rankSize = useLeisureActivitiesStore((s) => s.rankSize);
  const rankedTopN = useLeisureActivitiesStore((s) => s.rankedTopN);
  const frequency = useLeisureActivitiesStore((s) => s.frequency);
  const currentStep = useLeisureActivitiesStore((s) => s.currentStep);
  const lastUpdatedAt = useLeisureActivitiesStore((s) => s.lastUpdatedAt);
  const isFrequencyComplete = useLeisureActivitiesStore(
    (s) => s.isFrequencyComplete,
  );
  const state = { activityBuckets, rankSize, rankedTopN, frequency, currentStep, lastUpdatedAt };

  useEffect(() => {
    if (!hydrated) return;
    if (!isFrequencyComplete()) {
      router.replace("/leisure/frequency");
    }
  }, [hydrated, isFrequencyComplete, router]);

  const grouped = useMemo(
    () =>
      hydrated
        ? groupLeisureActivities(state, leisureActivityCards)
        : null,
    [hydrated, activityBuckets, rankedTopN, frequency],
  );

  if (!hydrated || !grouped) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={5}
          total={4}
          titleEn={t.leisure.results.titleEn}
          titleVi={t.leisure.results.title}
        />
        <div className="container max-w-4xl py-6 text-muted-foreground">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh pb-20 print:pb-0">
      <ProgressHeader
        step={5}
        total={4}
        titleEn={t.leisure.results.titleEn}
        titleVi={t.leisure.results.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          {t.leisure.results.subtitle}
        </p>
        <LeisureResultsInsights state={state} cards={leisureActivityCards} />
        {LEISURE_GROUPS_ORDERED.map((g: LeisureGroup) => (
          <LeisureResultsGroupSection
            key={g}
            group={g}
            cards={grouped[g]}
            frequency={state.frequency}
            defaultOpen={g === "priority"}
          />
        ))}
        <LeisureResultsActions state={state} cards={leisureActivityCards} />
      </div>
    </main>
  );
}
