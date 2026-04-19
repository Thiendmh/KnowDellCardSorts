"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ValueCard } from "@/components/shared/ValueCard";
import type { Card } from "@/types";
import { cn } from "@/lib/utils";

interface DraggableCardProps {
  card: Card;
  compact?: boolean;
  onTap?: () => void;
  dragDisabled?: boolean;
}

export function DraggableCard({
  card,
  compact = false,
  onTap,
  dragDisabled = false,
}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: card.id, disabled: dragDisabled });
  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={(e) => {
        if (isDragging) return;
        onTap?.();
        e.currentTarget.blur();
      }}
      style={style}
      className={cn(
        "block w-full text-left touch-none",
        isDragging && "opacity-40",
      )}
      {...listeners}
      {...attributes}
      aria-label={`Assign ${card.en}`}
    >
      <ValueCard card={card} compact={compact} />
    </button>
  );
}
