"use client";

import { useDroppable } from "@dnd-kit/core";
import type { BucketId, Card } from "@/types";
import { ALWAYS_LIMIT } from "@/types";
import { DraggableCard } from "./DraggableCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

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
  const isNever = bucket === "never";
  const overLimit = isAlways && cards.length > ALWAYS_LIMIT;

  const labelColor = isAlways
    ? "var(--deck-color, #078a52)"
    : isNever
    ? "#c0272d"
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-2xl border border-dashed border-clay-oat bg-white p-3 transition-colors shadow-clay",
        isOver && "border-solid border-clay-oat bg-clay-cream",
        overLimit && "border-solid border-red-400",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div
          className="text-[11px] font-semibold uppercase tracking-[1px]"
          style={{ color: labelColor ?? "#9f9b93" }}
        >
          {t.buckets[bucket]}
        </div>
        <div
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold",
            isAlways && cards.length === ALWAYS_LIMIT
              ? "text-white"
              : overLimit
              ? "bg-red-100 text-red-700"
              : "bg-clay-oat-light text-clay-silver",
          )}
          style={
            isAlways && cards.length === ALWAYS_LIMIT
              ? { backgroundColor: "var(--deck-color, #078a52)" }
              : undefined
          }
        >
          {isAlways ? `${cards.length} / ${ALWAYS_LIMIT}` : cards.length}
        </div>
      </div>

      <div
        className={cn(
          "min-h-20 flex-1 space-y-1.5",
          collapsedOnMobile && "hidden sm:block",
        )}
      >
        {cards.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-clay-oat py-6 text-[11px] text-clay-silver">
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
