"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";
import { useOccupationalInterestStore } from "@/store/useOccupationalInterestStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  INTEREST_GROUPS_ORDERED,
  type InterestGroup,
} from "@/types/occupationalInterest";
import { groupInterestsByCategory } from "@/lib/occupationalInterestScoring";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { ResultsInsights } from "./ResultsInsights";
import { ResultsGroupSection } from "./ResultsGroupSection";
import { ResultsActions } from "./ResultsActions";
import { useT } from "@/i18n";

export function InterestsResultsClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const state = useOccupationalInterestStore();
  const isExposureComplete = useOccupationalInterestStore(
    (s) => s.isExposureComplete,
  );

  useEffect(() => {
    if (!hydrated) return;
    if (!isExposureComplete()) {
      router.replace("/interests/exposure");
    }
  }, [hydrated, isExposureComplete, router]);

  const grouped = useMemo(
    () =>
      hydrated
        ? groupInterestsByCategory(state, occupationalInterestCards)
        : null,
    [hydrated, state],
  );

  if (!hydrated || !grouped) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={5}
          total={4}
          titleEn={t.interests.results.titleEn}
          titleVi={t.interests.results.title}
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
        titleEn={t.interests.results.titleEn}
        titleVi={t.interests.results.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          {t.interests.results.subtitle}
        </p>
        <ResultsInsights state={state} cards={occupationalInterestCards} />
        {INTEREST_GROUPS_ORDERED.map((g: InterestGroup) => (
          <ResultsGroupSection
            key={g}
            group={g}
            cards={grouped[g]}
            rankedTopN={state.rankedTopN}
            exposure={state.exposure}
            defaultOpen={g === "pursue-now"}
          />
        ))}
        <ResultsActions state={state} cards={occupationalInterestCards} />
      </div>
    </main>
  );
}
