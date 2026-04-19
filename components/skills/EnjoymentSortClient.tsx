"use client";

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
import { motivatedSkillCards } from "@/data/motivatedSkillCards";
import { useMotivatedSkillsStore } from "@/store/useMotivatedSkillsStore";
import { useHydrated } from "@/hooks/useHydrated";
import { ENJOYMENT_LEVELS, type EnjoymentBucket } from "@/types/motivatedSkills";
import type { Card } from "@/types";
import { EnjoymentBucketColumn } from "./EnjoymentBucketColumn";
import { EnjoymentAssignSheet } from "./EnjoymentAssignSheet";
import { ValueCard } from "@/components/shared/ValueCard";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { useT } from "@/i18n";

export function EnjoymentSortClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const enjoymentBuckets = useMotivatedSkillsStore((s) => s.enjoymentBuckets);
  const assignEnjoyment = useMotivatedSkillsStore((s) => s.assignEnjoyment);
  const canContinueFromEnjoyment = useMotivatedSkillsStore(
    (s) => s.canContinueFromEnjoyment,
  );
  const setStep = useMotivatedSkillsStore((s) => s.setStep);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const cardMap = useMemo(
    () => new Map(motivatedSkillCards.map((c) => [c.id, c])),
    [],
  );

  const grouped = useMemo(() => {
    const g: Record<EnjoymentBucket, Card[]> = {
      unsorted: [],
      love: [],
      "like-a-lot": [],
      like: [],
      dislike: [],
      hate: [],
    };
    for (const c of motivatedSkillCards) {
      const b = enjoymentBuckets[c.id] ?? "unsorted";
      g[b].push(c);
    }
    return g;
  }, [enjoymentBuckets]);

  const unsortedCount = grouped.unsorted.length;
  const validation = hydrated ? canContinueFromEnjoyment() : { ok: false as const };
  const canContinue = validation.ok;

  const activeCard = activeCardId ? cardMap.get(activeCardId) ?? null : null;
  const tappedCard = tappedCardId ? cardMap.get(tappedCardId) ?? null : null;

  function handleDragStart(e: DragStartEvent) {
    setActiveCardId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveCardId(null);
    if (!e.over) return;
    const overId = String(e.over.id) as EnjoymentBucket;
    const cardId = String(e.active.id);
    assignEnjoyment(cardId, overId);
  }

  function handleTapAssign(bucket: EnjoymentBucket) {
    if (!tappedCardId) return;
    assignEnjoyment(tappedCardId, bucket);
    setTappedCardId(null);
  }

  function handleContinue() {
    const result = canContinueFromEnjoyment();
    if (!result.ok) {
      if (result.error.code === "UNSORTED_REMAINING") {
        toast.error(
          t.skills.enjoyment.toastUnsorted(result.error.unsortedCount ?? 0),
        );
      } else if (
        result.error.code === "BUCKET_UNDERFILLED" &&
        result.error.bucket
      ) {
        toast.error(
          t.skills.enjoyment.toastBucketUnderfilled(
            t.skills.enjoyment.buckets[result.error.bucket],
            result.error.need ?? 0,
          ),
        );
      }
      return;
    }
    setStep(3);
    router.push("/skills/proficiency");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={2}
          total={3}
          titleEn={t.skills.enjoyment.titleEn}
          titleVi={t.skills.enjoyment.titleVi}
        />
        <div className="container max-w-6xl py-6 text-muted-foreground">
          {t.common.loading}
        </div>
      </main>
    );
  }

  const hint = canContinue
    ? "—"
    : unsortedCount > 0
      ? t.skills.enjoyment.toastUnsorted(unsortedCount)
      : t.skills.enjoyment.subtitle;

  return (
    <main className="min-h-dvh pb-20">
      <ProgressHeader
        step={2}
        total={3}
        titleEn={t.skills.enjoyment.titleEn}
        titleVi={t.skills.enjoyment.titleVi}
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container max-w-6xl space-y-4 py-4">
          <EnjoymentBucketColumn
            bucket="unsorted"
            cards={grouped.unsorted}
            onCardTap={(id) => setTappedCardId(id)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ENJOYMENT_LEVELS.map((b) => (
              <EnjoymentBucketColumn
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

      <EnjoymentAssignSheet
        card={tappedCard}
        currentBucket={
          tappedCardId ? (enjoymentBuckets[tappedCardId] ?? null) : null
        }
        onClose={() => setTappedCardId(null)}
        onAssign={handleTapAssign}
      />

      <StickyFooterActions
        backHref="/skills"
        continueDisabled={!canContinue}
        onContinueClick={handleContinue}
        hint={hint}
      />
    </main>
  );
}
