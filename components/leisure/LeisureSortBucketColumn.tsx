"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Card } from "@/types";
import {
  type LeisureActivityBucket,
  MIN_PER_LEISURE_BUCKET,
} from "@/types/leisureActivities";
import { DraggableCard } from "@/components/sort/DraggableCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

const IS_TOP: Record<LeisureActivityBucket, boolean> = {
  unsorted: false,
  "do-often": true,
  "want-more": true,
  "used-to": false,
  "never-tried": false,
  "not-interested": false,
};

interface LeisureSortBucketColumnProps {
  bucket: LeisureActivityBucket;
  cards: Card[];
  onCardTap: (cardId: string) => void;
}

export function LeisureSortBucketColumn({
  bucket,
  cards,
  onCardTap,
}: LeisureSortBucketColumnProps) {
  const t = useT();
  const { isOver, setNodeRef } = useDroppable({ id: bucket });
  const isRegular = bucket !== "unsorted";
  const underfilled = isRegular && cards.length < MIN_PER_LEISURE_BUCKET;
  const isTopBucket = IS_TOP[bucket];
  const isNegative = bucket === "not-interested";

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
              ? "var(--deck-color, #fc7981)"
              : isNegative
              ? "#c0272d"
              : "#9f9b93",
          }}
        >
          {t.leisure.activityLevels[bucket].label}
        </div>
        <div
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold",
            underfilled ? "bg-red-100 text-red-700" : !isRegular ? "bg-clay-oat-light text-clay-silver" : "",
          )}
          style={
            isRegular && !underfilled
              ? { backgroundColor: "var(--deck-color, #fc7981)", color: "var(--deck-text-color, #ffffff)" }
              : undefined
          }
        >
          {cards.length}
        </div>
      </div>
      <div className="min-h-20 flex-1 space-y-1.5">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-clay-oat py-6 text-[11px] text-clay-silver">
            {t.leisure.sort.unsortedLabel}
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
