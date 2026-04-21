"use client";

import React from "react";
import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { leisureActivityCards } from "@/data/leisureActivityCards";
import { useLeisureActivitiesStore } from "@/store/useLeisureActivitiesStore";
import { useHydrated } from "@/hooks/useHydrated";
import { LEISURE_ACTIVITY_LEVELS, type LeisureActivityBucket } from "@/types/leisureActivities";
import type { Card } from "@/types";
import { LeisureSortBucketColumn } from "./LeisureSortBucketColumn";
import { LeisureAssignSheet } from "./LeisureAssignSheet";
import { ValueCard } from "@/components/shared/ValueCard";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#fc7981",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function LeisureSortClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const activityBuckets = useLeisureActivitiesStore((s) => s.activityBuckets);
  const assignActivity = useLeisureActivitiesStore((s) => s.assignActivity);
  const canContinueFromSort = useLeisureActivitiesStore(
    (s) => s.canContinueFromSort,
  );
  const setStep = useLeisureActivitiesStore((s) => s.setStep);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const cardMap = useMemo(
    () => new Map(leisureActivityCards.map((c) => [c.id, c])),
    [],
  );

  const grouped = useMemo(() => {
    const g: Record<LeisureActivityBucket, Card[]> = {
      unsorted: [],
      "do-often": [],
      "want-more": [],
      "used-to": [],
      "never-tried": [],
      "not-interested": [],
    };
    for (const c of leisureActivityCards) {
      const b = activityBuckets[c.id] ?? "unsorted";
      g[b].push(c);
    }
    return g;
  }, [activityBuckets]);

  const sortedCount = leisureActivityCards.length - grouped.unsorted.length;
  const total = leisureActivityCards.length;
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
    const overId = String(e.over.id) as LeisureActivityBucket;
    const cardId = String(e.active.id);
    assignActivity(cardId, overId);
  }

  function handleTapAssign(bucket: LeisureActivityBucket) {
    if (!tappedCardId) return;
    assignActivity(tappedCardId, bucket);
    setTappedCardId(null);
  }

  function handleContinue() {
    const result = canContinueFromSort();
    if (!result.ok) {
      if (result.error.code === "UNSORTED_REMAINING") {
        toast.error(
          t.leisure.sort.toastUnsorted(result.error.unsortedCount ?? 0),
        );
      } else if (
        result.error.code === "BUCKET_UNDERFILLED" &&
        result.error.bucket
      ) {
        toast.error(
          t.leisure.sort.toastBucketUnderfilled(
            t.leisure.activityLevels[result.error.bucket].label,
            result.error.need ?? 0,
          ),
        );
      }
      return;
    }
    setStep(3);
    router.push("/leisure/rank");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={2}
          total={4}
          titleEn={t.leisure.sort.titleEn}
          titleVi={t.leisure.sort.title}
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
      ? t.leisure.sort.toastUnsorted(grouped.unsorted.length)
      : t.leisure.sort.instruction;

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={2}
        total={4}
        titleEn={t.leisure.sort.titleEn}
        titleVi={t.leisure.sort.title}
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container max-w-6xl space-y-4 py-4">
          <div className="text-sm text-clay-silver">
            {t.leisure.sort.counter(sortedCount, total)}
          </div>
          <LeisureSortBucketColumn
            bucket="unsorted"
            cards={grouped.unsorted}
            onCardTap={(id) => setTappedCardId(id)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LEISURE_ACTIVITY_LEVELS.map((b) => (
              <LeisureSortBucketColumn
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

      <LeisureAssignSheet
        card={tappedCard}
        currentBucket={
          tappedCardId ? (activityBuckets[tappedCardId] ?? null) : null
        }
        onClose={() => setTappedCardId(null)}
        onAssign={handleTapAssign}
      />

      <StickyFooterActions
        backHref="/leisure"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={hint}
      />
    </main>
  );
}
