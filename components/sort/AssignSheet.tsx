"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BUCKETS, type BucketId, type Card } from "@/types";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";

const COLOR: Record<Exclude<BucketId, "unsorted">, string> = {
  always: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300",
  often: "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300",
  sometimes: "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300",
  seldom: "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300",
  never: "bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300",
};

interface AssignSheetProps {
  card: Card | null;
  currentBucket: BucketId | null;
  onClose: () => void;
  onAssign: (bucket: BucketId) => void;
}

export function AssignSheet({ card, currentBucket, onClose, onAssign }: AssignSheetProps) {
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
              {BUCKETS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={`rounded-lg border-2 p-3 text-left transition-colors ${COLOR[b]} ${
                    currentBucket === b ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="font-semibold">{t.buckets[b]}</div>
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <Button
                  variant="outline"
                  className="mt-1"
                  onClick={() => onAssign("unsorted")}
                >
                  <Undo2 />
                  {t.sort.assignSheetReturn}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
