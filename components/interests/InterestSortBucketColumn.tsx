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

const IS_TOP: Record<InterestBucket, boolean> = {
  unsorted: false,
  "very-high": true,
  high: true,
  medium: false,
  low: false,
  none: false,
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
  const isTopBucket = IS_TOP[bucket];
  const isNone = bucket === "none";

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-2xl border border-dashed border-clay-oat bg-white p-3 transition-colors shadow-clay",
        isOver && "border-solid border-clay-oat bg-clay-cream",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div
          className="text-[11px] font-semibold uppercase tracking-[1px]"
          style={{
            color: isTopBucket
              ? "var(--deck-color, #43089f)"
              : isNone
              ? "#c0272d"
              : "#9f9b93",
          }}
        >
          {t.interests.interestLevels[bucket].label}
        </div>
        <div
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold",
            underfilled ? "bg-red-100 text-red-700" : !isRegular ? "bg-clay-oat-light text-clay-silver" : "",
          )}
          style={
            isRegular && !underfilled
              ? { backgroundColor: "var(--deck-color, #43089f)", color: "var(--deck-text-color, #ffffff)" }
              : undefined
          }
        >
          {cards.length}
        </div>
      </div>
      <div className="min-h-20 flex-1 space-y-1.5">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-clay-oat py-6 text-[11px] text-clay-silver">
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
