"use client";

import React from "react";
import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";
import { useOccupationalInterestStore } from "@/store/useOccupationalInterestStore";
import { useHydrated } from "@/hooks/useHydrated";
import { INTEREST_LEVELS, type InterestBucket } from "@/types/occupationalInterest";
import type { Card } from "@/types";
import { InterestSortBucketColumn } from "./InterestSortBucketColumn";
import { InterestAssignSheet } from "./InterestAssignSheet";
import { ValueCard } from "@/components/shared/ValueCard";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#43089f",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function InterestsSortClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const interestBuckets = useOccupationalInterestStore((s) => s.interestBuckets);
  const assignInterest = useOccupationalInterestStore((s) => s.assignInterest);
  const canContinueFromSort = useOccupationalInterestStore(
    (s) => s.canContinueFromSort,
  );
  const setStep = useOccupationalInterestStore((s) => s.setStep);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
  );

  const cardMap = useMemo(
    () => new Map(occupationalInterestCards.map((c) => [c.id, c])),
    [],
  );

  const grouped = useMemo(() => {
    const g: Record<InterestBucket, Card[]> = {
      unsorted: [],
      "very-high": [],
      high: [],
      medium: [],
      low: [],
      none: [],
    };
    for (const c of occupationalInterestCards) {
      const b = interestBuckets[c.id] ?? "unsorted";
      g[b].push(c);
    }
    return g;
  }, [interestBuckets]);

  const sortedCount = occupationalInterestCards.length - grouped.unsorted.length;
  const total = occupationalInterestCards.length;
  const validation = hydrated ? canContinueFromSort() : { ok: false as const };
  const canContinue = validation.ok;

  const activeCard = activeCardId ? cardMap.get(activeCardId) ?? null : null;
  const tappedCard = tappedCardId ? cardMap.get(tappedCardId) ?? null : null;

  function handleDragStart(e: DragStartEvent) {
    setActiveCardId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveCardId(null);
    if (!e.over) return;
    const overId = String(e.over.id) as InterestBucket;
    const cardId = String(e.active.id);
    assignInterest(cardId, overId);
  }

  function handleTapAssign(bucket: InterestBucket) {
    if (!tappedCardId) return;
    assignInterest(tappedCardId, bucket);
    setTappedCardId(null);
  }

  function handleContinue() {
    const result = canContinueFromSort();
    if (!result.ok) {
      if (result.error.code === "UNSORTED_REMAINING") {
        toast.error(
          t.interests.sort.toastUnsorted(result.error.unsortedCount ?? 0),
        );
      } else if (
        result.error.code === "BUCKET_UNDERFILLED" &&
        result.error.bucket
      ) {
        toast.error(
          t.interests.sort.toastBucketUnderfilled(
            t.interests.interestLevels[result.error.bucket].label,
            result.error.need ?? 0,
          ),
        );
      }
      return;
    }
    setStep(3);
    router.push("/interests/rank");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={2}
          total={4}
          titleEn={t.interests.sort.titleEn}
          titleVi={t.interests.sort.title}
        />
        <div className="container max-w-6xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  const hint = canContinue
    ? "—"
    : grouped.unsorted.length > 0
      ? t.interests.sort.toastUnsorted(grouped.unsorted.length)
      : t.interests.sort.instruction;

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={2}
        total={4}
        titleEn={t.interests.sort.titleEn}
        titleVi={t.interests.sort.title}
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container max-w-6xl space-y-4 py-4">
          <div className="text-sm text-clay-silver">
            {t.interests.sort.counter(sortedCount, total)}
          </div>
          <InterestSortBucketColumn
            bucket="unsorted"
            cards={grouped.unsorted}
            onCardTap={(id) => setTappedCardId(id)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {INTEREST_LEVELS.map((b) => (
              <InterestSortBucketColumn
                key={b}
                bucket={b}
                cards={grouped[b]}
                onCardTap={(id) => setTappedCardId(id)}
              />
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeCard ? <ValueCard card={activeCard} compact /> : null}
        </DragOverlay>
      </DndContext>

      <InterestAssignSheet
        card={tappedCard}
        currentBucket={
          tappedCardId ? (interestBuckets[tappedCardId] ?? null) : null
        }
        onClose={() => setTappedCardId(null)}
        onAssign={handleTapAssign}
      />

      <StickyFooterActions
        backHref="/interests"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={hint}
      />
    </main>
  );
}
