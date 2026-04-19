"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { ValueCard } from "@/components/shared/ValueCard";
import type { Card } from "@/types";
import { ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

interface SortableRankRowProps {
  card: Card;
  rank: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SortableRankRow({
  card,
  rank,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: SortableRankRowProps) {
  const t = useT();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-stretch gap-2", isDragging && "opacity-50")}
    >
      <button
        className="hidden shrink-0 items-center justify-center rounded-md border bg-background px-2 text-muted-foreground hover:bg-accent sm:flex"
        aria-label={t.rank.dragReorder}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <ValueCard card={card} rank={rank} emphasis={rank <= 3} />
      </div>
      <div className="flex shrink-0 flex-col gap-1 sm:hidden">
        <Button
          size="icon"
          variant="outline"
          disabled={!canMoveUp}
          onClick={onMoveUp}
          aria-label={t.rank.moveUp}
        >
          <ArrowUp />
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={!canMoveDown}
          onClick={onMoveDown}
          aria-label={t.rank.moveDown}
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}
