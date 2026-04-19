"use client";

import { useDroppable } from "@dnd-kit/core";
import type { BucketId, Card } from "@/types";
import { ALWAYS_LIMIT } from "@/types";
import { DraggableCard } from "./DraggableCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

const COLOR: Record<BucketId, string> = {
  unsorted: "border-slate-300 bg-slate-50",
  always: "border-emerald-300 bg-emerald-50",
  often: "border-sky-300 bg-sky-50",
  sometimes: "border-amber-300 bg-amber-50",
  seldom: "border-orange-300 bg-orange-50",
  never: "border-rose-300 bg-rose-50",
};

interface BucketColumnProps {
  bucket: BucketId;
  cards: Card[];
  onCardTap: (cardId: string) => void;
  collapsedOnMobile?: boolean;
}

export function BucketColumn({
  bucket,
  cards,
  onCardTap,
  collapsedOnMobile = false,
}: BucketColumnProps) {
  const t = useT();
  const { isOver, setNodeRef } = useDroppable({ id: bucket });
  const isAlways = bucket === "always";
  const overLimit = isAlways && cards.length > ALWAYS_LIMIT;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-lg border-2 p-3 transition-colors",
        COLOR[bucket],
        isOver && "ring-2 ring-primary ring-offset-2",
        overLimit && "ring-2 ring-destructive",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm leading-tight">
            {t.buckets[bucket]}
          </div>
        </div>
        <div
          className={cn(
            "rounded-full bg-white px-2 py-0.5 text-xs font-semibold",
            isAlways && cards.length === ALWAYS_LIMIT && "bg-primary text-primary-foreground",
            overLimit && "bg-destructive text-destructive-foreground",
          )}
        >
          {isAlways ? `${cards.length} / ${ALWAYS_LIMIT}` : cards.length}
        </div>
      </div>
      <div
        className={cn(
          "flex-1 space-y-2 min-h-20",
          collapsedOnMobile && "hidden sm:block",
        )}
      >
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded border border-dashed border-slate-300 py-6 text-xs text-muted-foreground">
            {t.sort.dropHere}
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
