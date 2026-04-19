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
        "rounded-lg border bg-card p-3 shadow-sm",
        emphasis && "border-primary ring-2 ring-primary/30 bg-primary/5",
        compact && "p-2",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {typeof rank === "number" && (
          <span
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              emphasis ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {rank}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-semibold leading-tight">{card.en}</div>
          <div className="text-sm text-muted-foreground">{card.vi}</div>
          {!compact && (
            <div className="mt-1 text-xs text-muted-foreground">
              {description}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
