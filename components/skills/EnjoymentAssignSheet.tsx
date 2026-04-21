"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Card } from "@/types";
import {
  ENJOYMENT_LEVELS,
  type EnjoymentBucket,
  type EnjoymentLevel,
} from "@/types/motivatedSkills";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";
import { cn } from "@/lib/utils";

const LEVEL_STYLE: Record<EnjoymentLevel, string> = {
  love:       "border-lemon-400 bg-[#fff8e6] text-lemon-700 hover:bg-lemon-400/30",
  "like-a-lot": "border-lemon-400 bg-[#fff8e6] text-lemon-700 hover:bg-lemon-400/20",
  like:       "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  dislike:    "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  hate:       "border-red-200 bg-[#fff0f0] text-red-800 hover:bg-red-100",
};

interface Props {
  card: Card | null;
  currentBucket: EnjoymentBucket | null;
  onClose: () => void;
  onAssign: (bucket: EnjoymentBucket) => void;
}

export function EnjoymentAssignSheet({ card, currentBucket, onClose, onAssign }: Props) {
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
              {ENJOYMENT_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={cn(
                    "clay-btn rounded-xl border p-3 text-left text-sm font-semibold transition-colors",
                    LEVEL_STYLE[b],
                    currentBucket === b && "ring-2 ring-offset-1 ring-[var(--deck-color,#fbbd41)]",
                  )}
                >
                  {t.skills.enjoyment.buckets[b]}
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <button
                  onClick={() => onAssign("unsorted")}
                  className="clay-btn mt-1 flex items-center gap-2 rounded-xl border border-clay-oat px-4 py-2.5 text-sm font-medium text-clay-charcoal hover:bg-clay-oat-light"
                >
                  <Undo2 className="h-4 w-4" />
                  {t.skills.enjoyment.assignSheetReturn}
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
