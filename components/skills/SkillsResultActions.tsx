"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Printer, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useMotivatedSkillsStore } from "@/store/useMotivatedSkillsStore";
import { motivatedSkillCards } from "@/data/motivatedSkillCards";
import { buildMotivatedSkillsText } from "@/lib/motivatedSkillsClipboard";
import { useT, useLanguage } from "@/i18n";
import { ResetDialog } from "@/components/shared/ResetDialog";
import { useRouter } from "next/navigation";

export function SkillsResultActions() {
  const t = useT();
  const lang = useLanguage();
  const router = useRouter();
  const resetAll = useMotivatedSkillsStore((s) => s.resetAll);
  const [resetOpen, setResetOpen] = useState(false);

  async function handleCopy() {
    const state = useMotivatedSkillsStore.getState();
    const text = buildMotivatedSkillsText(state, motivatedSkillCards, lang);
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t.skills.results.copied);
    } catch {
      toast.error(t.skills.results.copyFailed);
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
        {t.skills.results.copy}
      </Button>
      <Button variant="outline" onClick={handlePrint}>
        <Printer />
        {t.skills.results.print}
      </Button>
      <Button variant="destructive" onClick={() => setResetOpen(true)}>
        <RotateCcw />
        {t.skills.results.resetButton}
      </Button>
      <ResetDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onConfirm={handleResetConfirm}
        title={t.skills.results.resetTitle}
        body={t.skills.results.resetBody}
        confirmLabel={t.skills.results.resetConfirm}
      />
    </div>
  );
}
