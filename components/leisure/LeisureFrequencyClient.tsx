"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { leisureActivityCards } from "@/data/leisureActivityCards";
import { useLeisureActivitiesStore } from "@/store/useLeisureActivitiesStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  TOP_LEISURE_BUCKETS,
  type LeisureActivityLevel,
} from "@/types/leisureActivities";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { LeisureFrequencySectionAccordion } from "./LeisureFrequencySectionAccordion";
import type { Card } from "@/types";
import { useT } from "@/i18n";

export function LeisureFrequencyClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const activityBuckets = useLeisureActivitiesStore((s) => s.activityBuckets);
  const frequency = useLeisureActivitiesStore((s) => s.frequency);
  const setFrequency = useLeisureActivitiesStore((s) => s.setFrequency);
  const canContinueFromRank = useLeisureActivitiesStore(
    (s) => s.canContinueFromRank,
  );
  const isFrequencyComplete = useLeisureActivitiesStore(
    (s) => s.isFrequencyComplete,
  );
  const setStep = useLeisureActivitiesStore((s) => s.setStep);

  useEffect(() => {
    if (!hydrated) return;
    if (!canContinueFromRank().ok) {
      router.replace("/leisure/rank");
    }
  }, [hydrated, canContinueFromRank, router]);

  const grouped = useMemo(() => {
    const g: Record<LeisureActivityLevel, Card[]> = {
      "do-often": [],
      "want-more": [],
      "used-to": [],
      "never-tried": [],
      "not-interested": [],
    };
    for (const c of leisureActivityCards) {
      const b = activityBuckets[c.id];
      if (b && b in g) g[b as LeisureActivityLevel].push(c);
    }
    for (const k of Object.keys(g) as LeisureActivityLevel[]) {
      g[k].sort((a, b) => a.order - b.order);
    }
    return g;
  }, [activityBuckets]);

  const totalCards = TOP_LEISURE_BUCKETS.reduce(
    (n, b) => n + grouped[b].length,
    0,
  );
  const doneCount = TOP_LEISURE_BUCKETS.reduce(
    (n, b) => n + grouped[b].filter((c) => frequency[c.id] !== undefined).length,
    0,
  );

  const canContinue = hydrated ? isFrequencyComplete() : false;

  function handleContinue() {
    if (!isFrequencyComplete()) {
      toast.error(t.leisure.frequency.toastIncomplete(totalCards - doneCount));
      return;
    }
    setStep(5);
    router.push("/leisure/results");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={4}
          total={4}
          titleEn={t.leisure.frequency.titleEn}
          titleVi={t.leisure.frequency.title}
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
        titleEn={t.leisure.frequency.titleEn}
        titleVi={t.leisure.frequency.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          {t.leisure.frequency.instruction}
        </p>
        <p className="text-xs text-muted-foreground">
          {t.leisure.frequency.counter(doneCount, totalCards)}
        </p>
        {TOP_LEISURE_BUCKETS.map((b) => (
          <LeisureFrequencySectionAccordion
            key={b}
            bucket={b}
            cards={grouped[b]}
            frequency={frequency}
            onChange={setFrequency}
          />
        ))}
      </div>
      <StickyFooterActions
        backHref="/leisure/rank"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={
          canContinue
            ? "—"
            : t.leisure.frequency.counter(doneCount, totalCards)
        }
      />
    </main>
  );
}
