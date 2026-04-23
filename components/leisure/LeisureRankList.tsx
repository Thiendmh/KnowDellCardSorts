"use client";

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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValueCard } from "@/components/shared/ValueCard";
import { useT } from "@/i18n";
import type { Card } from "@/types";
import type { RankSize } from "@/types/leisureActivities";
import { cn } from "@/lib/utils";

interface RankListProps {
  topIds: string[];
  restIds: string[];
  cards: Card[];
  rankSize: RankSize;
  onChange: (topIds: string[]) => void;
}

interface RowProps {
  card: Card;
  rank?: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  emphasis?: boolean;
}

function SortableRow({
  card,
  rank,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  emphasis = false,
}: RowProps) {
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
        className="hidden shrink-0 items-center justify-center rounded-md border bg-clay-cream px-2 text-clay-silver hover:bg-clay-oat-light sm:flex"
        aria-label={t.rank.dragReorder}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <ValueCard card={card} rank={rank} emphasis={emphasis} />
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

export function LeisureRankList({
  topIds,
  restIds,
  cards,
  rankSize,
  onChange,
}: RankListProps) {
  const t = useT();

  const cardMap = new Map(cards.map((c) => [c.id, c]));

  // Combined list for DnD: top zone first, then rest zone.
  const combined = [...topIds, ...restIds];

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = combined.indexOf(String(active.id));
    const newIndex = combined.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(combined, oldIndex, newIndex);
    // The first rankSize items are "top", the rest are "rest".
    onChange(reordered.slice(0, rankSize));
  }

  /**
   * Move a card by delta within the combined list, then recompute top/rest split.
   * Positions 0..rankSize-1 are "top"; rankSize.. are "rest".
   */
  function moveBy(fromIndex: number, delta: number) {
    const to = fromIndex + delta;
    if (to < 0 || to >= combined.length) return;
    const reordered = arrayMove(combined, fromIndex, to);
    onChange(reordered.slice(0, rankSize));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={combined} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {/* Top zone */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              {t.leisure.rank.topZoneLabel(rankSize)}
            </p>
            <div className="space-y-2 rounded-lg border-2 border-clay-oat bg-clay-oat-light/40 p-3">
              {topIds.length === 0 && (
                <p className="py-4 text-center text-sm text-clay-silver">
                  {t.leisure.rank.incomplete(rankSize)}
                </p>
              )}
              {topIds.map((id, idx) => {
                const card = cardMap.get(id);
                if (!card) return null;
                const globalIdx = idx; // top zone starts at 0
                return (
                  <SortableRow
                    key={id}
                    card={card}
                    rank={idx + 1}
                    emphasis={idx < 3}
                    canMoveUp={globalIdx > 0}
                    canMoveDown={globalIdx < combined.length - 1}
                    onMoveUp={() => moveBy(globalIdx, -1)}
                    onMoveDown={() => moveBy(globalIdx, 1)}
                  />
                );
              })}
            </div>
          </div>

          {/* Rest zone */}
          {restIds.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-clay-silver">
                {t.leisure.rank.restZoneLabel}
              </p>
              <div className="space-y-2 rounded-lg border bg-clay-oat-light/30 p-3">
                {restIds.map((id, idx) => {
                  const card = cardMap.get(id);
                  if (!card) return null;
                  const globalIdx = topIds.length + idx; // offset into combined
                  return (
                    <SortableRow
                      key={id}
                      card={card}
                      canMoveUp={globalIdx > 0}
                      canMoveDown={globalIdx < combined.length - 1}
                      onMoveUp={() => moveBy(globalIdx, -1)}
                      onMoveDown={() => moveBy(globalIdx, 1)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
