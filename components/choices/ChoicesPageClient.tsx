"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import { ALWAYS_LIMIT } from "@/types";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { StickyFooterActions } from "@/components/shared/StickyFooterActions";
import { ChoiceList } from "./ChoiceList";
import { SupportMatrix } from "./SupportMatrix";
import { isMatrixComplete } from "@/lib/scoring";
import { toast } from "sonner";
import { useT } from "@/i18n";

const DECK_STYLE = {
  "--deck-color": "#078a52",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function ChoicesPageClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const choices = useCardSortStore((s) => s.choices);
  const matrix = useCardSortStore((s) => s.matrix);
  const setStep = useCardSortStore((s) => s.setStep);

  useEffect(() => {
    if (!hydrated) return;
    if (rankedTop8.length !== ALWAYS_LIMIT) router.replace("/rank");
  }, [hydrated, rankedTop8.length, router]);

  const complete = useMemo(
    () =>
      isMatrixComplete(
        matrix,
        rankedTop8,
        choices.map((c) => c.id),
      ) && choices.length >= 2,
    [matrix, rankedTop8, choices],
  );

  function onContinue() {
    if (!complete) {
      toast.error(t.choices.toastIncomplete);
      return;
    }
    setStep(6);
    router.push("/results");
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
        <ProgressHeader
          step={5}
          titleEn="Compare your choices"
          titleVi="So sánh các lựa chọn"
        />
        <div className="container max-w-5xl py-6 text-clay-silver">
          {t.common.loading}
        </div>
      </main>
    );
  }

  const hint =
    choices.length < 2
      ? t.choices.minChoices
      : !complete
        ? t.choices.matrixIncomplete
        : t.choices.matrixAllFilled;

  return (
    <main className="min-h-dvh bg-clay-cream pb-20" style={DECK_STYLE}>
      <ProgressHeader
        step={5}
        titleEn="Compare your choices"
        titleVi="So sánh các lựa chọn"
      />
      <section className="container max-w-5xl space-y-8 py-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold">{t.choices.section1}</h2>
          <ChoiceList />
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold">{t.choices.section2}</h2>
          <p className="mb-3 text-sm text-clay-silver">
            {t.choices.section2Help} <strong>3</strong>, <strong>2</strong>,{" "}
            <strong>1</strong>, <strong>−1</strong>, <strong>?</strong>.
          </p>
          <SupportMatrix />
        </div>
      </section>

      <StickyFooterActions
        backHref="/rank"
        continueLabel={t.choices.seeResults}
        onContinueClick={onContinue}
        continueDisabled={!complete}
        hint={hint}
      />
    </main>
  );
}
