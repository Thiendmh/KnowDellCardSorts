"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Printer, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useLeisureActivitiesStore } from "@/store/useLeisureActivitiesStore";
import { leisureActivityCards } from "@/data/leisureActivityCards";
import {
  buildLeisureClipboardText,
  type ClipboardStrings,
} from "@/lib/leisureActivitiesClipboard";
import type { LeisureActivitiesState } from "@/types/leisureActivities";
import type { Card } from "@/types";
import { useT, useLanguage } from "@/i18n";
import { ResetDialog } from "@/components/shared/ResetDialog";
import { useRouter } from "next/navigation";

interface Props {
  state: LeisureActivitiesState;
  cards: Card[];
}

export function LeisureResultsActions({ state, cards }: Props) {
  const t = useT();
  const lang = useLanguage();
  const router = useRouter();
  const resetAll = useLeisureActivitiesStore((s) => s.resetAll);
  const [resetOpen, setResetOpen] = useState(false);

  async function handleCopy() {
    const strings: ClipboardStrings = {
      header: t.leisure.clipboard.header,
      groupLabels: {
        priority: {
          en: t.leisure.groups.priority.label,
          vi: t.leisure.groups.priority.label,
        },
        "keep-active": {
          en: t.leisure.groups["keep-active"].label,
          vi: t.leisure.groups["keep-active"].label,
        },
        develop: {
          en: t.leisure.groups.develop.label,
          vi: t.leisure.groups.develop.label,
        },
        release: {
          en: t.leisure.groups.release.label,
          vi: t.leisure.groups.release.label,
        },
      },
      frequencyLabels: {
        active: {
          en: t.leisure.frequencyLevels.active.label,
          vi: t.leisure.frequencyLevels.active.label,
        },
        occasional: {
          en: t.leisure.frequencyLevels.occasional.label,
          vi: t.leisure.frequencyLevels.occasional.label,
        },
        "not-active": {
          en: t.leisure.frequencyLevels["not-active"].label,
          vi: t.leisure.frequencyLevels["not-active"].label,
        },
      },
    };

    const text = buildLeisureClipboardText(state, cards, lang, strings);
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t.leisure.results.actions.copied);
    } catch {
      toast.error(t.leisure.results.actions.copyFailed);
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
        {t.leisure.results.actions.copy}
      </Button>
      <Button variant="outline" onClick={handlePrint}>
        <Printer />
        {t.leisure.results.actions.print}
      </Button>
      <Button variant="destructive" onClick={() => setResetOpen(true)}>
        <RotateCcw />
        {t.leisure.results.actions.reset}
      </Button>
      <ResetDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onConfirm={handleResetConfirm}
        title={t.leisure.reset.title}
        body={t.leisure.reset.body}
        confirmLabel={t.leisure.reset.confirm}
      />
    </div>
  );
}
