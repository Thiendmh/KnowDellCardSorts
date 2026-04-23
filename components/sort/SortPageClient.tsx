"use client";

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
import { careerValueCards } from "@/data/careerValueCards";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import { BUCKETS, ALWAYS_LIMIT, type BucketId, type Card } from "@/types";
import { BucketColumn } from "./BucketColumn";
import { AssignSheet } from "./AssignSheet";
import { ValueCard } from "@/components/shared/ValueCard";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#078a52",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function SortPageClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const cardBuckets = useCardSortStore((s) => s.cardBuckets);
  const assignCard = useCardSortStore((s) => s.assignCard);
  const syncRankedFromAlways = useCardSortStore((s) => s.syncRankedFromAlways);
  const setStep = useCardSortStore((s) => s.setStep);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
  );

  const cardMap = useMemo(
    () => new Map(careerValueCards.map((c) => [c.id, c])),
    [],
  );

  const grouped = useMemo(() => {
    const g: Record<BucketId, Card[]> = {
      unsorted: [],
      always: [],
      often: [],
      sometimes: [],
      seldom: [],
      never: [],
    };
    for (const c of careerValueCards) {
      const b = cardBuckets[c.id] ?? "unsorted";
      g[b].push(c);
    }
    return g;
  }, [cardBuckets]);

  const unsortedCount = grouped.unsorted.length;
  const alwaysCount = grouped.always.length;
  const canContinue = hydrated && unsortedCount === 0 && alwaysCount === ALWAYS_LIMIT;

  const activeCard = activeCardId ? cardMap.get(activeCardId) ?? null : null;
  const tappedCard = tappedCardId ? cardMap.get(tappedCardId) ?? null : null;

  function handleDragStart(e: DragStartEvent) {
    setActiveCardId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveCardId(null);
    if (!e.over) return;
    const overId = String(e.over.id) as BucketId;
    const cardId = String(e.active.id);
    const result = assignCard(cardId, overId);
    if (!result.ok) toast.error(t.sort.toastAlwaysFull(ALWAYS_LIMIT));
  }

  function handleTapAssign(bucket: BucketId) {
    if (!tappedCardId) return;
    const r = assignCard(tappedCardId, bucket);
    if (!r.ok) toast.error(t.sort.toastAlwaysFull(ALWAYS_LIMIT));
    setTappedCardId(null);
  }

  function handleContinue() {
    if (!canContinue) {
      toast.error(t.sort.toastIncomplete);
      return;
    }
    syncRankedFromAlways();
    setStep(4);
    router.push("/rank");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={3}
          titleEn="Sort your 54 career values"
          titleVi="Phân loại 54 giá trị nghề nghiệp"
        />
        <div className="container max-w-6xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  const hint = canContinue
    ? t.sort.ready
    : unsortedCount > 0
      ? t.sort.remaining(unsortedCount)
      : alwaysCount < ALWAYS_LIMIT
        ? t.sort.needMore(ALWAYS_LIMIT - alwaysCount)
        : t.sort.tooMany(alwaysCount - ALWAYS_LIMIT);

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={3}
        titleEn="Sort your 54 career values"
        titleVi="Phân loại 54 giá trị nghề nghiệp"
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container max-w-6xl space-y-4 py-4">
          <BucketColumn
            bucket="unsorted"
            cards={grouped.unsorted}
            onCardTap={(id) => setTappedCardId(id)}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BUCKETS.map((b) => (
              <BucketColumn
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

      <AssignSheet
        card={tappedCard}
        currentBucket={tappedCardId ? cardBuckets[tappedCardId] ?? null : null}
        onClose={() => setTappedCardId(null)}
        onAssign={handleTapAssign}
      />

      <StickyFooterActions
        backHref="/instructions"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={hint}
      />
    </main>
  );
}
