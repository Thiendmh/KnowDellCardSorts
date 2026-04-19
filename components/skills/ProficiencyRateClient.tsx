"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motivatedSkillCards } from "@/data/motivatedSkillCards";
import { useMotivatedSkillsStore } from "@/store/useMotivatedSkillsStore";
import { useHydrated } from "@/hooks/useHydrated";
import { ENJOYMENT_LEVELS, type EnjoymentLevel } from "@/types/motivatedSkills";
import type { Card } from "@/types";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { ProficiencyRow } from "./ProficiencyRow";
import { useT } from "@/i18n";

export function ProficiencyRateClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const enjoymentBuckets = useMotivatedSkillsStore((s) => s.enjoymentBuckets);
  const proficiency = useMotivatedSkillsStore((s) => s.proficiency);
  const setProficiency = useMotivatedSkillsStore((s) => s.setProficiency);
  const canContinueFromEnjoyment = useMotivatedSkillsStore((s) => s.canContinueFromEnjoyment);
  const isProficiencyComplete = useMotivatedSkillsStore((s) => s.isProficiencyComplete);
  const setStep = useMotivatedSkillsStore((s) => s.setStep);

  useEffect(() => {
    if (!hydrated) return;
    if (!canContinueFromEnjoyment().ok) {
      router.replace("/skills/enjoyment");
    }
  }, [hydrated, canContinueFromEnjoyment, router]);

  const grouped = useMemo(() => {
    const g: Record<EnjoymentLevel, Card[]> = {
      love: [],
      "like-a-lot": [],
      like: [],
      dislike: [],
      hate: [],
    };
    for (const c of motivatedSkillCards) {
      const b = enjoymentBuckets[c.id];
      if (b && b !== "unsorted") g[b as EnjoymentLevel].push(c);
    }
    for (const lvl of ENJOYMENT_LEVELS) {
      g[lvl].sort((a, b) => a.order - b.order);
    }
    return g;
  }, [enjoymentBuckets]);

  const ratedCount = useMemo(
    () => motivatedSkillCards.filter((c) => proficiency[c.id] !== undefined).length,
    [proficiency],
  );
  const total = motivatedSkillCards.length;
  const complete = hydrated && isProficiencyComplete();

  function handleContinue() {
    if (!complete) {
      toast.error(t.skills.proficiency.toastIncomplete(total - ratedCount));
      return;
    }
    setStep(4);
    router.push("/skills/results");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={3}
          total={3}
          titleEn={t.skills.proficiency.titleEn}
          titleVi={t.skills.proficiency.titleVi}
        />
        <div className="container max-w-3xl py-6 text-muted-foreground">{t.common.loading}</div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh pb-20">
      <ProgressHeader
        step={3}
        total={3}
        titleEn={t.skills.proficiency.titleEn}
        titleVi={t.skills.proficiency.titleVi}
      />
      <div className="container max-w-3xl py-4">
        <div className="sticky top-0 z-10 -mx-4 mb-3 bg-background/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-lg sm:border sm:px-3">
          <div className="text-sm font-semibold">
            {t.skills.proficiency.counter(ratedCount, total)}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{t.skills.proficiency.subtitle}</p>
        </div>

        <div className="space-y-6">
          {ENJOYMENT_LEVELS.map((lvl) => {
            const cards = grouped[lvl];
            if (cards.length === 0) return null;
            return (
              <section key={lvl}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.skills.proficiency.groupLabel(t.skills.enjoyment.buckets[lvl], cards.length)}
                </h2>
                <div className="space-y-2">
                  {cards.map((c) => (
                    <ProficiencyRow
                      key={c.id}
                      card={c}
                      selected={proficiency[c.id]}
                      onSelect={(lv) => setProficiency(c.id, lv)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <StickyFooterActions
        backHref="/skills/enjoyment"
        continueDisabled={!complete}
        onContinueClick={handleContinue}
        continueLabel={t.skills.proficiency.continueLabel}
        hint={
          complete
            ? t.skills.proficiency.counter(ratedCount, total)
            : t.skills.proficiency.toastIncomplete(total - ratedCount)
        }
      />
    </main>
  );
}
