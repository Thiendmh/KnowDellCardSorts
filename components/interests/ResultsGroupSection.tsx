"use client";

import type { Card } from "@/types";
import type { ExposureLevel, InterestGroup } from "@/types/occupationalInterest";
import { ValueCard } from "@/components/shared/ValueCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

const GROUP_STYLE: Record<InterestGroup, string> = {
  "pursue-now": "border-l-emerald-500 bg-emerald-50",
  "explore-deep": "border-l-sky-500 bg-sky-50",
  consider: "border-l-amber-500 bg-amber-50",
  skip: "border-l-slate-400 bg-slate-50",
};

interface Props {
  group: InterestGroup;
  cards: Card[];
  rankedTopN: string[];
  exposure: Record<string, ExposureLevel>;
  defaultOpen?: boolean;
}

export function ResultsGroupSection({
  group,
  cards,
  rankedTopN,
  exposure,
  defaultOpen,
}: Props) {
  const t = useT();
  const meta = t.interests.groups[group];

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? group : undefined}
    >
      <AccordionItem
        value={group}
        className={cn("rounded-lg border border-l-4", GROUP_STYLE[group])}
      >
        <AccordionTrigger className="px-4">
          <div className="flex flex-1 items-baseline justify-between gap-4 text-left">
            <div className="font-semibold">{meta.label}</div>
            <div className="text-sm font-semibold">
              {t.interests.results.countBadge(cards.length)}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <p className="mb-3 text-sm text-muted-foreground">
            {meta.description}
          </p>
          {cards.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t.interests.results.emptyGroup}
            </p>
          ) : (
            <div className="space-y-2">
              {cards.map((card, idx) => {
                const exposureLevel = exposure[card.id];
                const showExposure =
                  group !== "skip" && exposureLevel !== undefined;
                const exposureLabel = showExposure
                  ? t.interests.exposureLevels[exposureLevel].label
                  : null;

                return (
                  <div key={card.id} className="flex items-start gap-2">
                    {group === "pursue-now" && (
                      <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                        {rankedTopN.indexOf(card.id) + 1}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <ValueCard card={card} compact>
                        {showExposure && exposureLabel && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {t.interests.results.exposureBadge(exposureLabel)}
                          </span>
                        )}
                      </ValueCard>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
