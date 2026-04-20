"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Card } from "@/types";
import {
  type InterestBucket,
  MIN_PER_INTEREST_BUCKET,
} from "@/types/occupationalInterest";
import { DraggableCard } from "@/components/sort/DraggableCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

const COLOR: Record<InterestBucket, string> = {
  unsorted: "border-slate-300 bg-slate-50",
  "very-high": "border-emerald-300 bg-emerald-50",
  high: "border-sky-300 bg-sky-50",
  medium: "border-amber-300 bg-amber-50",
  low: "border-orange-300 bg-orange-50",
  none: "border-rose-300 bg-rose-50",
};

interface InterestSortBucketColumnProps {
  bucket: InterestBucket;
  cards: Card[];
  onCardTap: (cardId: string) => void;
}

export function InterestSortBucketColumn({
  bucket,
  cards,
  onCardTap,
}: InterestSortBucketColumnProps) {
  const t = useT();
  const { isOver, setNodeRef } = useDroppable({ id: bucket });
  const isRegular = bucket !== "unsorted";
  const underfilled = isRegular && cards.length < MIN_PER_INTEREST_BUCKET;

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
          {t.interests.interestLevels[bucket].label}
        </div>
        <div
          className={cn(
            "rounded-full bg-white px-2 py-0.5 text-xs font-semibold",
            isRegular && !underfilled && "bg-emerald-500 text-white",
            underfilled && "bg-destructive text-destructive-foreground",
          )}
        >
          {cards.length}
        </div>
      </div>
      <div className="flex-1 space-y-2 min-h-20">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded border border-dashed border-slate-300 py-6 text-xs text-muted-foreground">
            {t.interests.sort.unsortedLabel}
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
