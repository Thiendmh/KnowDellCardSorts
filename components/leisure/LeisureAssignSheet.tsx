"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Card } from "@/types";
import {
  LEISURE_ACTIVITY_LEVELS,
  type LeisureActivityBucket,
  type LeisureActivityLevel,
} from "@/types/leisureActivities";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";
import { cn } from "@/lib/utils";

const LEVEL_STYLE: Record<LeisureActivityLevel, string> = {
  "do-often":       "border-[#fc7981]/50 bg-[#fff0f2] text-[#c0272d] hover:bg-[#ffd7d9]",
  "want-more":      "border-[#fc7981]/50 bg-[#fff0f2] text-[#c0272d] hover:bg-[#ffd7d9]",
  "used-to":        "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  "never-tried":    "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  "not-interested": "border-red-200 bg-[#fff0f0] text-red-800 hover:bg-red-100",
};

interface Props {
  card: Card | null;
  currentBucket: LeisureActivityBucket | null;
  onClose: () => void;
  onAssign: (bucket: LeisureActivityBucket) => void;
}

export function LeisureAssignSheet({
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
              {LEISURE_ACTIVITY_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={cn(
                    "clay-btn rounded-xl border p-3 text-left text-sm font-semibold transition-colors",
                    LEVEL_STYLE[b],
                    currentBucket === b && "ring-2 ring-offset-1 ring-[var(--deck-color,#fc7981)]",
                  )}
                >
                  {t.leisure.activityLevels[b].label}
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <button
                  onClick={() => onAssign("unsorted")}
                  className="clay-btn mt-1 flex items-center gap-2 rounded-xl border border-clay-oat px-4 py-2.5 text-sm font-medium text-clay-charcoal hover:bg-clay-oat-light"
                >
                  <Undo2 className="h-4 w-4" />
                  {t.leisure.sort.unsortedLabel}
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
