"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BUCKETS, type BucketId, type Card } from "@/types";
import { Undo2 } from "lucide-react";
import { useT, useLanguage, pickCardDesc } from "@/i18n";
import { cn } from "@/lib/utils";

const BUCKET_STYLE: Record<Exclude<BucketId, "unsorted">, string> = {
  always: "border-matcha-300 bg-[#f0fdf6] text-matcha-800 hover:bg-matcha-300/30",
  often:   "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  sometimes: "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  seldom: "border-clay-oat bg-white text-clay-black hover:bg-clay-oat-light",
  never:  "border-red-200 bg-[#fff0f0] text-red-800 hover:bg-red-100",
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
      <DialogContent className="bg-clay-cream">
        {card && (
          <>
            <DialogHeader>
              <DialogTitle className="text-clay-black font-bold tracking-tight">
                {card.en}
              </DialogTitle>
              <p className="text-sm text-clay-silver">{card.vi}</p>
              <p className="text-xs text-clay-charcoal">{pickCardDesc(card, lang)}</p>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2">
              {BUCKETS.map((b) => (
                <button
                  key={b}
                  onClick={() => onAssign(b)}
                  className={cn(
                    "clay-btn rounded-xl border p-3 text-left text-sm font-semibold transition-colors",
                    BUCKET_STYLE[b],
                    currentBucket === b && "ring-2 ring-offset-1",
                  )}
                >
                  {t.buckets[b]}
                </button>
              ))}
              {currentBucket && currentBucket !== "unsorted" && (
                <button
                  onClick={() => onAssign("unsorted")}
                  className="clay-btn mt-1 flex items-center gap-2 rounded-xl border border-clay-oat px-4 py-2.5 text-sm font-medium text-clay-charcoal hover:bg-clay-oat-light"
                >
                  <Undo2 className="h-4 w-4" />
                  {t.sort.assignSheetReturn}
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
