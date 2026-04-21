"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { leisureActivityCards } from "@/data/leisureActivityCards";
import { useLeisureActivitiesStore } from "@/store/useLeisureActivitiesStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  RANK_SIZES,
  type RankSize,
  RANK_ELIGIBLE_BUCKET,
} from "@/types/leisureActivities";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { LeisureRankSizeSelect } from "./LeisureRankSizeSelect";
import { LeisureRankList } from "./LeisureRankList";
import { useT } from "@/i18n";

export function LeisureRankClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const activityBuckets = useLeisureActivitiesStore((s) => s.activityBuckets);
  const rankSize = useLeisureActivitiesStore((s) => s.rankSize);
  const rankedTopN = useLeisureActivitiesStore((s) => s.rankedTopN);
  const setRankSize = useLeisureActivitiesStore((s) => s.setRankSize);
  const setRankedTopN = useLeisureActivitiesStore((s) => s.setRankedTopN);
  const canContinueFromSort = useLeisureActivitiesStore(
    (s) => s.canContinueFromSort,
  );
  const canContinueFromRank = useLeisureActivitiesStore(
    (s) => s.canContinueFromRank,
  );
  const setStep = useLeisureActivitiesStore((s) => s.setStep);

  // Guard: if sort isn't complete, send back.
  useEffect(() => {
    if (!hydrated) return;
    if (!canContinueFromSort().ok) {
      router.replace("/leisure/sort");
    }
  }, [hydrated, canContinueFromSort, router]);

  const doOftenIds = useMemo(
    () =>
      leisureActivityCards
        .filter((c) => activityBuckets[c.id] === RANK_ELIGIBLE_BUCKET)
        .sort((a, b) => a.order - b.order)
        .map((c) => c.id),
    [activityBuckets],
  );
  const doOftenCount = doOftenIds.length;

  // Auto-adjust rankSize if top bucket shrank below current rankSize.
  useEffect(() => {
    if (!hydrated) return;
    if (rankSize > doOftenCount) {
      const fallback = [...RANK_SIZES]
        .reverse()
        .find((n) => n <= doOftenCount) as RankSize | undefined;
      if (fallback && fallback !== rankSize) {
        setRankSize(fallback);
        toast.info(t.leisure.rank.sizeAutoAdjusted(fallback));
      }
    }
  }, [hydrated, rankSize, doOftenCount, setRankSize, t]);

  const topIds = rankedTopN;
  const restIds = useMemo(
    () => doOftenIds.filter((id) => !topIds.includes(id)),
    [doOftenIds, topIds],
  );

  const validation = hydrated ? canContinueFromRank() : null;
  const canContinue = validation?.ok === true;

  function handleContinue() {
    const result = canContinueFromRank();
    if (!result.ok) {
      toast.error(t.leisure.rank.incomplete(result.error.need ?? 0));
      return;
    }
    setStep(4);
    router.push("/leisure/frequency");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={3}
          total={4}
          titleEn={t.leisure.rank.titleEn}
          titleVi={t.leisure.rank.title}
        />
        <div className="container max-w-6xl py-6 text-muted-foreground">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh pb-20">
      <ProgressHeader
        step={3}
        total={4}
        titleEn={t.leisure.rank.titleEn}
        titleVi={t.leisure.rank.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          {t.leisure.rank.instruction}
        </p>
        <LeisureRankSizeSelect
          value={rankSize}
          onChange={setRankSize}
          eligibleCount={doOftenCount}
        />
        <LeisureRankList
          topIds={topIds}
          restIds={restIds}
          cards={leisureActivityCards}
          rankSize={rankSize}
          onChange={setRankedTopN}
        />
      </div>
      <StickyFooterActions
        backHref="/leisure/sort"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={
          canContinue
            ? "—"
            : t.leisure.rank.incomplete(
                validation && !validation.ok && "error" in validation
                  ? (validation.error.need ?? 0)
                  : 0,
              )
        }
      />
    </main>
  );
}
