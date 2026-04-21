"use client";

import React from "react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";
import { useOccupationalInterestStore } from "@/store/useOccupationalInterestStore";
import { useHydrated } from "@/hooks/useHydrated";
import {
  RANK_SIZES,
  type RankSize,
} from "@/types/occupationalInterest";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { RankSizeSelect } from "./RankSizeSelect";
import { RankList } from "./RankList";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#43089f",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function InterestsRankClient() {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();

  const interestBuckets = useOccupationalInterestStore((s) => s.interestBuckets);
  const rankSize = useOccupationalInterestStore((s) => s.rankSize);
  const rankedTopN = useOccupationalInterestStore((s) => s.rankedTopN);
  const setRankSize = useOccupationalInterestStore((s) => s.setRankSize);
  const setRankedTopN = useOccupationalInterestStore((s) => s.setRankedTopN);
  const canContinueFromSort = useOccupationalInterestStore(
    (s) => s.canContinueFromSort,
  );
  const canContinueFromRank = useOccupationalInterestStore(
    (s) => s.canContinueFromRank,
  );
  const setStep = useOccupationalInterestStore((s) => s.setStep);

  // Guard: if sort isn't complete, send back.
  useEffect(() => {
    if (!hydrated) return;
    if (!canContinueFromSort().ok) {
      router.replace("/interests/sort");
    }
  }, [hydrated, canContinueFromSort, router]);

  const veryHighIds = useMemo(
    () =>
      occupationalInterestCards
        .filter((c) => interestBuckets[c.id] === "very-high")
        .sort((a, b) => a.order - b.order)
        .map((c) => c.id),
    [interestBuckets],
  );
  const veryHighCount = veryHighIds.length;

  // Auto-adjust rankSize if top bucket shrank below current rankSize.
  useEffect(() => {
    if (!hydrated) return;
    if (rankSize > veryHighCount) {
      const fallback = [...RANK_SIZES]
        .reverse()
        .find((n) => n <= veryHighCount) as RankSize | undefined;
      if (fallback && fallback !== rankSize) {
        setRankSize(fallback);
        toast.info(t.interests.rank.sizeAutoAdjusted(fallback));
      }
    }
  }, [hydrated, rankSize, veryHighCount, setRankSize, t]);

  const topIds = rankedTopN;
  const restIds = useMemo(
    () => veryHighIds.filter((id) => !topIds.includes(id)),
    [veryHighIds, topIds],
  );

  const validation = hydrated ? canContinueFromRank() : null;
  const canContinue = validation?.ok === true;

  function handleContinue() {
    const result = canContinueFromRank();
    if (!result.ok) {
      toast.error(t.interests.rank.incomplete(result.error.need ?? 0));
      return;
    }
    setStep(4);
    router.push("/interests/exposure");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={3}
          total={4}
          titleEn={t.interests.rank.titleEn}
          titleVi={t.interests.rank.title}
        />
        <div className="container max-w-6xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={3}
        total={4}
        titleEn={t.interests.rank.titleEn}
        titleVi={t.interests.rank.title}
      />
      <div className="container max-w-4xl space-y-4 py-4">
        <p className="text-sm text-clay-silver">
          {t.interests.rank.instruction}
        </p>
        <RankSizeSelect
          value={rankSize}
          onChange={setRankSize}
          veryHighCount={veryHighCount}
        />
        <RankList
          topIds={topIds}
          restIds={restIds}
          cards={occupationalInterestCards}
          rankSize={rankSize}
          onChange={setRankedTopN}
        />
      </div>
      <StickyFooterActions
        backHref="/interests/sort"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={
          canContinue
            ? "—"
            : t.interests.rank.incomplete(
                validation && !validation.ok && "error" in validation
                  ? (validation.error.need ?? 0)
                  : 0,
              )
        }
      />
    </main>
  );
}
