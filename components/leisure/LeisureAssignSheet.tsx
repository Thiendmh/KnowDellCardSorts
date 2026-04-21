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
  LEISURE_ACTIVITY_LEVELS,
  type LeisureActivityBucket,
  type LeisureActivityLevel,
} from "@/types/leisureActivities";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";

const COLOR: Record<LeisureActivityLevel, string> = {
  "do-often":
    "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300",
  "want-more": "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300",
  "used-to": "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300",
  "never-tried":
    "bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300",
  "not-interested":
    "bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300",
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
              {LEISURE_ACTIVITY_LEVELS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={`rounded-lg border-2 p-3 text-left transition-colors ${COLOR[b]} ${
                    currentBucket === b ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="font-semibold">
                    {t.leisure.activityLevels[b].label}
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
                  {t.leisure.sort.unsortedLabel}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
