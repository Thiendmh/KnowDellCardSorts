"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Card } from "@/types";
import {
  INTEREST_LEVELS,
  type InterestBucket,
  type InterestLevel,
} from "@/types/occupationalInterest";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";

const COLOR: Record<InterestLevel, string> = {
  "very-high":
    "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300",
  high: "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300",
  medium: "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300",
  low: "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300",
  none: "bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300",
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
      <DialogContent>
        {card && (
          <>
            <DialogHeader>
              <DialogTitle>{card.en}</DialogTitle>
              <p className="text-sm text-muted-foreground">{card.vi}</p>
              <p className="text-xs text-muted-foreground">
                {pickCardDesc(card, lang)}
              </p>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2">
              {INTEREST_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={`rounded-lg border-2 p-3 text-left transition-colors ${COLOR[b]} ${
                    currentBucket === b ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="font-semibold">
                    {t.interests.interestLevels[b].label}
                  </div>
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <Button
                  variant="outline"
                  className="mt-1"
                  onClick={() => onAssign("unsorted")}
                >
                  <Undo2 />
                  {t.interests.sort.unsortedLabel}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
