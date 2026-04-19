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
  ENJOYMENT_LEVELS,
  type EnjoymentBucket,
  type EnjoymentLevel,
} from "@/types/motivatedSkills";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";

const COLOR: Record<EnjoymentLevel, string> = {
  love: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300",
  "like-a-lot": "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300",
  like: "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300",
  dislike: "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300",
  hate: "bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300",
};

interface Props {
  card: Card | null;
  currentBucket: EnjoymentBucket | null;
  onClose: () => void;
  onAssign: (bucket: EnjoymentBucket) => void;
}

export function EnjoymentAssignSheet({
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
              {ENJOYMENT_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={`rounded-lg border-2 p-3 text-left transition-colors ${COLOR[b]} ${
                    currentBucket === b ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="font-semibold">
                    {t.skills.enjoyment.buckets[b]}
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
                  {t.skills.enjoyment.assignSheetReturn}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
