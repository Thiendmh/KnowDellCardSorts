"use client";

import React from "react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motivatedSkillCards } from "@/data/motivatedSkillCards";
import { useMotivatedSkillsStore } from "@/store/useMotivatedSkillsStore";
import { useHydrated } from "@/hooks/useHydrated";
import { SKILL_GROUPS_ORDERED } from "@/types/motivatedSkills";
import { groupSkillsByCategory } from "@/lib/motivatedSkillsScoring";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { SkillGroupAccordion } from "./SkillGroupAccordion";
import { SkillsResultActions } from "./SkillsResultActions";
import { useT, useLanguage } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#fbbd41",
  "--deck-text-color": "#000000",
} as React.CSSProperties;

export function SkillsResultsClient() {
  const t = useT();
  const lang = useLanguage();
  const hydrated = useHydrated();
  const router = useRouter();
  const enjoymentBuckets = useMotivatedSkillsStore((s) => s.enjoymentBuckets);
  const proficiency = useMotivatedSkillsStore((s) => s.proficiency);
  const currentStep = useMotivatedSkillsStore((s) => s.currentStep);
  const lastUpdatedAt = useMotivatedSkillsStore((s) => s.lastUpdatedAt);
  const isProficiencyComplete = useMotivatedSkillsStore(
    (s) => s.isProficiencyComplete,
  );

  useEffect(() => {
    if (!hydrated) return;
    if (!isProficiencyComplete()) {
      router.replace("/skills/proficiency");
    }
  }, [hydrated, isProficiencyComplete, router]);

  const grouped = useMemo(
    () =>
      groupSkillsByCategory(
        {
          enjoymentBuckets,
          proficiency,
          currentStep,
          lastUpdatedAt,
        },
        motivatedSkillCards,
      ),
    [enjoymentBuckets, proficiency, currentStep, lastUpdatedAt],
  );

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={4}
          total={3}
          titleEn={t.skills.results.titleEn}
          titleVi={t.skills.results.titleVi}
        />
        <div className="container max-w-3xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  const titlePrimary =
    lang === "en" ? t.skills.results.titleEn : t.skills.results.titleVi;

  return (
    <main className="min-h-dvh bg-clay-cream pb-16" style={DECK_STYLE}>
      <ProgressHeader
        step={4}
        total={3}
        titleEn={t.skills.results.titleEn}
        titleVi={t.skills.results.titleVi}
      />
      <div className="container max-w-3xl py-4">
        <h1 className="sr-only">{titlePrimary}</h1>
        <div className="space-y-3">
          {SKILL_GROUPS_ORDERED.map((g, idx) => (
            <SkillGroupAccordion
              key={g}
              group={g}
              cards={grouped[g]}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
        <div className="mt-6">
          <SkillsResultActions />
        </div>
      </div>
    </main>
  );
}
