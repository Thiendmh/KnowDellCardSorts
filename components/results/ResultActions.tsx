"use client";

import { Button } from "@/components/ui/button";
import { Copy, Printer } from "lucide-react";
import { toast } from "sonner";
import { useCardSortStore } from "@/store/useCardSortStore";
import { buildResultsText, copyToClipboard } from "@/lib/clipboard";
import { ResetDialog } from "@/components/shared/ResetDialog";
import { useT, useLanguage } from "@/i18n";

export function ResultActions() {
  const t = useT();
  const lang = useLanguage();
  const state = useCardSortStore();

  async function onCopy() {
    const text = buildResultsText(state, lang);
    const ok = await copyToClipboard(text);
    if (ok) toast.success(t.results.copied);
    else toast.error(t.results.copyFailed);
  }

  function onPrint() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <Button onClick={onCopy} variant="outline">
        <Copy />
        {t.results.copy}
      </Button>
      <Button onClick={onPrint} variant="outline">
        <Printer />
        {t.results.print}
      </Button>
      <ResetDialog />
    </div>
  );
}
