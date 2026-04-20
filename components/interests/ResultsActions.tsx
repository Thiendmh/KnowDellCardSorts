"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Printer, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useOccupationalInterestStore } from "@/store/useOccupationalInterestStore";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";
import {
  buildInterestsClipboardText,
  type ClipboardStrings,
} from "@/lib/occupationalInterestClipboard";
import type { OccupationalInterestState } from "@/types/occupationalInterest";
import type { Card } from "@/types";
import { useT, useLanguage } from "@/i18n";
import { ResetDialog } from "@/components/shared/ResetDialog";
import { useRouter } from "next/navigation";

interface Props {
  state: OccupationalInterestState;
  cards: Card[];
}

export function ResultsActions({ state, cards }: Props) {
  const t = useT();
  const lang = useLanguage();
  const router = useRouter();
  const resetAll = useOccupationalInterestStore((s) => s.resetAll);
  const [resetOpen, setResetOpen] = useState(false);

  async function handleCopy() {
    const strings: ClipboardStrings = {
      header: t.interests.clipboard.header,
      groupLabels: {
        "pursue-now": {
          en: t.interests.groups["pursue-now"].label,
          vi: t.interests.groups["pursue-now"].label,
        },
        "explore-deep": {
          en: t.interests.groups["explore-deep"].label,
          vi: t.interests.groups["explore-deep"].label,
        },
        consider: {
          en: t.interests.groups.consider.label,
          vi: t.interests.groups.consider.label,
        },
        skip: {
          en: t.interests.groups.skip.label,
          vi: t.interests.groups.skip.label,
        },
      },
      exposureLabels: {
        experienced: {
          en: t.interests.exposureLevels.experienced.label,
          vi: t.interests.exposureLevels.experienced.label,
        },
        explored: {
          en: t.interests.exposureLevels.explored.label,
          vi: t.interests.exposureLevels.explored.label,
        },
        none: {
          en: t.interests.exposureLevels.none.label,
          vi: t.interests.exposureLevels.none.label,
        },
      },
    };

    const text = buildInterestsClipboardText(state, cards, lang, strings);
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t.interests.results.actions.copied);
    } catch {
      toast.error(t.common.loading);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleResetConfirm() {
    resetAll();
    setResetOpen(false);
    router.push("/");
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <Button variant="outline" onClick={handleCopy}>
        <Copy />
        {t.interests.results.actions.copy}
      </Button>
      <Button variant="outline" onClick={handlePrint}>
        <Printer />
        {t.interests.results.actions.print}
      </Button>
      <Button variant="destructive" onClick={() => setResetOpen(true)}>
        <RotateCcw />
        {t.interests.results.actions.reset}
      </Button>
      <ResetDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onConfirm={handleResetConfirm}
        title={t.interests.reset.title}
        body={t.interests.reset.body}
        confirmLabel={t.interests.reset.confirm}
      />
    </div>
  );
}
