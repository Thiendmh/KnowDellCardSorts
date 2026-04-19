"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import { ALWAYS_LIMIT } from "@/types";
import { isMatrixComplete } from "@/lib/scoring";
import { ProgressHeader } from "@/components/shared/ProgressHeader";
import { TopValuesList } from "./TopValuesList";
import { ComparisonTable } from "./ComparisonTable";
import { InsightsPanel } from "./InsightsPanel";
import { ResultActions } from "./ResultActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/i18n";

export function ResultsPageClient() {
  const t = useT();
  const hydrated = useHydrated();
  const router = useRouter();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const choices = useCardSortStore((s) => s.choices);
  const matrix = useCardSortStore((s) => s.matrix);

  useEffect(() => {
    if (!hydrated) return;
    if (rankedTop8.length !== ALWAYS_LIMIT) {
      router.replace("/rank");
      return;
    }
    const complete = isMatrixComplete(
      matrix,
      rankedTop8,
      choices.map((c) => c.id),
    );
    if (!complete || choices.length < 2) router.replace("/choices");
  }, [hydrated, rankedTop8, choices, matrix, router]);

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <ProgressHeader
          step={6}
          titleEn="Your results"
          titleVi="Kết quả của bạn"
        />
        <div className="container max-w-5xl py-6 text-muted-foreground">
          {t.common.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh pb-16">
      <ProgressHeader
        step={6}
        titleEn="Your results"
        titleVi="Kết quả của bạn"
      />

      <section className="container max-w-5xl space-y-8 py-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            {t.results.top8Heading}
          </h2>
          <TopValuesList />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            {t.results.comparisonHeading}
          </h2>
          <ComparisonTable />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            {t.results.insightsHeading}
          </h2>
          <InsightsPanel />
        </div>

        <div className="border-t pt-4">
          <ResultActions />
        </div>

        <div className="no-print">
          <Button asChild variant="ghost">
            <Link href="/choices">
              <ArrowLeft />
              {t.results.backToChoices}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
