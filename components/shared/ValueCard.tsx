"use client";

import type { Card as CardType } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage, pickCardDesc } from "@/i18n";

interface ValueCardProps {
  card: CardType;
  rank?: number;
  compact?: boolean;
  emphasis?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ValueCard({
  card,
  rank,
  compact = false,
  emphasis = false,
  className,
  children,
}: ValueCardProps) {
  const lang = useLanguage();
  const description = pickCardDesc(card, lang);

  return (
    <div
      className={cn(
        "rounded-xl border border-clay-oat bg-white p-3 shadow-clay",
        emphasis && "border-[var(--deck-color,#078a52)]",
        compact && "p-2",
        className,
      )}
      style={
        emphasis
          ? {
              boxShadow:
                "color-mix(in srgb, var(--deck-color, #078a52) 20%, transparent) 0 0 0 3px",
            }
          : undefined
      }
    >
      <div className="flex items-start gap-2">
        {typeof rank === "number" && (
          <span
            className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-clay-black font-mono text-[10px] font-bold text-white"
          >
            {rank}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-bold leading-tight text-clay-black text-[13px]">{card.en}</div>
          <div className="text-[11px] text-clay-silver">{card.vi}</div>
          {!compact && (
            <div className="mt-1 text-[10px] leading-[1.4] text-clay-charcoal">
              {description}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
