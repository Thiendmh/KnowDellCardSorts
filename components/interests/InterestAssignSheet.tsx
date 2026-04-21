"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Card } from "@/types";
import {
  INTEREST_LEVELS,
  type InterestBucket,
  type InterestLevel,
} from "@/types/occupationalInterest";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";
import { cn } from "@/lib/utils";

const LEVEL_STYLE: Record<InterestLevel, string> = {
  "very-high": "border-ube-300 bg-[#f3f0ff] text-ube-800 hover:bg-[#ebe5ff]",
  high:        "border-ube-300 bg-[#f3f0ff] text-ube-800 hover:bg-[#ebe5ff]",
  medium:      "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  low:         "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  none:        "border-red-200 bg-[#fff0f0] text-red-800 hover:bg-red-100",
};

interface Props {
  card: Card | null;
  currentBucket: InterestBucket | null;
  onClose: () => void;
  onAssign: (bucket: InterestBucket) => void;
}

export function InterestAssignSheet({
  card,
  currentBucket,
  onClose,
  onAssign,
}: Props) {
  const t = useT();
  const lang = useLanguage();
  return (
    <Dialog open={!!card} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-clay-cream">
        {card && (
          <>
            <DialogHeader>
              <DialogTitle className="font-bold tracking-tight text-clay-black">
                {card.en}
              </DialogTitle>
              <p className="text-sm text-clay-silver">{card.vi}</p>
              <p className="text-xs text-clay-charcoal">{pickCardDesc(card, lang)}</p>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2">
              {INTEREST_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={cn(
                    "clay-btn rounded-xl border p-3 text-left text-sm font-semibold transition-colors",
                    LEVEL_STYLE[b],
                    currentBucket === b && "ring-2 ring-offset-1 ring-[var(--deck-color,#43089f)]",
                  )}
                >
                  {t.interests.interestLevels[b].label}
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <button
                  onClick={() => onAssign("unsorted")}
                  className="clay-btn mt-1 flex items-center gap-2 rounded-xl border border-clay-oat px-4 py-2.5 text-sm font-medium text-clay-charcoal hover:bg-clay-oat-light"
                >
                  <Undo2 className="h-4 w-4" />
                  {t.interests.sort.unsortedLabel}
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
