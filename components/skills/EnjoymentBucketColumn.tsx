"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Card } from "@/types";
import {
  type EnjoymentBucket,
  MIN_PER_ENJOYMENT_BUCKET,
} from "@/types/motivatedSkills";
import { DraggableCard } from "@/components/sort/DraggableCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

const COLOR: Record<EnjoymentBucket, string> = {
  unsorted: "border-slate-300 bg-slate-50",
  love: "border-emerald-300 bg-emerald-50",
  "like-a-lot": "border-sky-300 bg-sky-50",
  like: "border-amber-300 bg-amber-50",
  dislike: "border-orange-300 bg-orange-50",
  hate: "border-rose-300 bg-rose-50",
};

interface EnjoymentBucketColumnProps {
  bucket: EnjoymentBucket;
  cards: Card[];
  onCardTap: (cardId: string) => void;
}

export function EnjoymentBucketColumn({
  bucket,
  cards,
  onCardTap,
}: EnjoymentBucketColumnProps) {
  const t = useT();
  const { isOver, setNodeRef } = useDroppable({ id: bucket });
  const isRegular = bucket !== "unsorted";
  const underfilled = isRegular && cards.length < MIN_PER_ENJOYMENT_BUCKET;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-lg border-2 p-3 transition-colors",
        COLOR[bucket],
        isOver && "ring-2 ring-primary ring-offset-2",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="font-semibold text-sm leading-tight">
          {t.skills.enjoyment.buckets[bucket]}
        </div>
        <div
          className={cn(
            "rounded-full bg-white px-2 py-0.5 text-xs font-semibold",
            isRegular && !underfilled && "bg-emerald-500 text-white",
            underfilled && "bg-destructive text-destructive-foreground",
          )}
        >
          {isRegular
            ? t.skills.enjoyment.counterBelow(cards.length)
            : cards.length}
        </div>
      </div>
      <div className="flex-1 space-y-2 min-h-20">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded border border-dashed border-slate-300 py-6 text-xs text-muted-foreground">
            {t.skills.enjoyment.dropHere}
          </div>
        ) : (
          cards.map((c) => (
            <DraggableCard
              key={c.id}
              card={c}
              compact
              onTap={() => onCardTap(c.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
