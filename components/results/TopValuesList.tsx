"use client";

import { useMemo } from "react";
import { useCardSortStore } from "@/store/useCardSortStore";
import { careerValueCards } from "@/data/careerValueCards";
import { ValueCard } from "@/components/shared/ValueCard";
import { useT } from "@/i18n";

export function TopValuesList() {
  const t = useT();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const cardMap = useMemo(
    () => new Map(careerValueCards.map((c) => [c.id, c])),
    [],
  );
  const top3 = rankedTop8.slice(0, 3);
  const rest = rankedTop8.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t.results.top3}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {top3.map((id, idx) => {
            const card = cardMap.get(id);
            if (!card) return null;
            return <ValueCard key={id} card={card} rank={idx + 1} emphasis />;
          })}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t.results.ranks48}
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {rest.map((id, idx) => {
            const card = cardMap.get(id);
            if (!card) return null;
            return <ValueCard key={id} card={card} rank={idx + 4} compact />;
          })}
        </div>
      </div>
    </div>
  );
}
