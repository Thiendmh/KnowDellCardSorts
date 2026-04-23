"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import { careerValueCards } from "@/data/careerValueCards";
import { ALWAYS_LIMIT } from "@/types";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { SortableRankRow } from "./SortableRankRow";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#078a52",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function RankPageClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const cardBuckets = useCardSortStore((s) => s.cardBuckets);
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const setRankOrder = useCardSortStore((s) => s.setRankOrder);
  const syncRankedFromAlways = useCardSortStore((s) => s.syncRankedFromAlways);
  const setStep = useCardSortStore((s) => s.setStep);

  const cardMap = useMemo(
    () => new Map(careerValueCards.map((c) => [c.id, c])),
    [],
  );

  const alwaysCount = useMemo(
    () => Object.values(cardBuckets).filter((b) => b === "always").length,
    [cardBuckets],
  );

  useEffect(() => {
    if (!hydrated) return;
    if (alwaysCount !== ALWAYS_LIMIT) {
      router.replace("/sort");
      return;
    }
    if (rankedTop8.length !== ALWAYS_LIMIT) syncRankedFromAlways();
  }, [hydrated, alwaysCount, rankedTop8.length, router, syncRankedFromAlways]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = rankedTop8.indexOf(String(active.id));
    const newIndex = rankedTop8.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    setRankOrder(arrayMove(rankedTop8, oldIndex, newIndex));
  }

  function moveBy(fromIndex: number, delta: number) {
    const to = fromIndex + delta;
    if (to < 0 || to >= rankedTop8.length) return;
    setRankOrder(arrayMove(rankedTop8, fromIndex, to));
  }

  function handleContinue() {
    setStep(5);
    router.push("/choices");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={4}
          titleEn="Rank your top 8 from most to least important"
          titleVi="Xếp hạng 8 giá trị quan trọng nhất (1 = quan trọng nhất)"
        />
        <div className="container max-w-3xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={4}
        titleEn="Rank your top 8 from most to least important"
        titleVi="Xếp hạng 8 giá trị quan trọng nhất (1 = quan trọng nhất)"
      />
      <section className="container max-w-3xl py-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rankedTop8}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {rankedTop8.map((id, idx) => {
                const card = cardMap.get(id);
                if (!card) return null;
                return (
                  <SortableRankRow
                    key={id}
                    card={card}
                    rank={idx + 1}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < rankedTop8.length - 1}
                    onMoveUp={() => moveBy(idx, -1)}
                    onMoveDown={() => moveBy(idx, 1)}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
        <p className="mt-4 text-sm text-clay-silver">{t.rank.tip}</p>
      </section>

      <StickyFooterActions
        backHref="/sort"
        onContinueClick={handleContinue}
        continueDisabled={rankedTop8.length !== ALWAYS_LIMIT}
      />
    </main>
  );
}
