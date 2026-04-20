"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";
import { useOccupationalInterestStore } from "@/store/useOccupationalInterestStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  TOP_INTEREST_BUCKETS,
  type InterestLevel,
} from "@/types/occupationalInterest";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { ExposureSectionAccordion } from "./ExposureSectionAccordion";
import type { Card } from "@/types";
import { useT } from "@/i18n";

export function InterestsExposureClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const interestBuckets = useOccupationalInterestStore((s) => s.interestBuckets);
  const exposure = useOccupationalInterestStore((s) => s.exposure);
  const setExposure = useOccupationalInterestStore((s) => s.setExposure);
  const canContinueFromRank = useOccupationalInterestStore(
    (s) => s.canContinueFromRank,
  );
  const isExposureComplete = useOccupationalInterestStore(
    (s) => s.isExposureComplete,
  );
  const setStep = useOccupationalInterestStore((s) => s.setStep);

  useEffect(() => {
    if (!hydrated) return;
    if (!canContinueFromRank().ok) {
      router.replace("/interests/rank");
    }
  }, [hydrated, canContinueFromRank, router]);

  const grouped = useMemo(() => {
    const g: Record<InterestLevel, Card[]> = {
      "very-high": [],
      high: [],
      medium: [],
      low: [],
      none: [],
    };
    for (const c of occupationalInterestCards) {
      const b = interestBuckets[c.id];
      if (b && b in g) g[b as InterestLevel].push(c);
    }
    for (const k of Object.keys(g) as InterestLevel[]) {
      g[k].sort((a, b) => a.order - b.order);
    }
    return g;
  }, [interestBuckets]);

  const totalCards = TOP_INTEREST_BUCKETS.reduce(
    (n, b) => n + grouped[b].length,
    0,
  );
  const doneCount = TOP_INTEREST_BUCKETS.reduce(
    (n, b) => n + grouped[b].filter((c) => exposure[c.id] !== undefined).length,
    0,
  );

  const canContinue = hydrated ? isExposureComplete() : false;

  function handleContinue() {
    if (!isExposureComplete()) {
      toast.error(t.interests.exposure.toastIncomplete(totalCards - doneCount));
      return;
    }
    setStep(5);
    router.push("/interests/results");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={4}
          total={4}
          titleEn={t.interests.exposure.titleEn}
          titleVi={t.interests.exposure.title}
        />
        <div className="container max-w-4xl py-6 text-muted-foreground">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh pb-20">
      <ProgressHeader
        step={4}
        total={4}
        titleEn={t.interests.exposure.titleEn}
        titleVi={t.interests.exposure.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          {t.interests.exposure.instruction}
        </p>
        <p className="text-xs text-muted-foreground">
          {t.interests.exposure.counter(doneCount, totalCards)}
        </p>
        {TOP_INTEREST_BUCKETS.map((b) => (
          <ExposureSectionAccordion
            key={b}
            bucket={b}
            cards={grouped[b]}
            exposure={exposure}
            onChange={setExposure}
          />
        ))}
      </div>
      <StickyFooterActions
        backHref="/interests/rank"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={
          canContinue
            ? "—"
            : t.interests.exposure.counter(doneCount, totalCards)
        }
      />
    </main>
  );
}
