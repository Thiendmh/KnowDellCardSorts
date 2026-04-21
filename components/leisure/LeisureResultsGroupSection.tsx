"use client";

import type { Card } from "@/types";
import type { FrequencyLevel, LeisureGroup } from "@/types/leisureActivities";
import { ValueCard } from "@/components/shared/ValueCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

const GROUP_STYLE: Record<LeisureGroup, string> = {
  priority: "border-l-emerald-500 bg-emerald-50",
  "keep-active": "border-l-sky-500 bg-sky-50",
  develop: "border-l-purple-500 bg-purple-50",
  release: "border-l-slate-400 bg-slate-50",
};

interface Props {
  group: LeisureGroup;
  cards: Card[];
  frequency: Record<string, FrequencyLevel>;
  defaultOpen?: boolean;
}

export function LeisureResultsGroupSection({
  group,
  cards,
  frequency,
  defaultOpen,
}: Props) {
  const t = useT();
  const meta = t.leisure.groups[group];

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
              {t.leisure.results.countBadge(cards.length)}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <p className="mb-3 text-sm text-muted-foreground">
            {meta.description}
          </p>
          {cards.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t.leisure.results.emptyGroup}
            </p>
          ) : (
            <div className="space-y-2">
              {cards.map((card, idx) => {
                const frequencyLevel = frequency[card.id];
                const showFrequency =
                  group !== "release" && frequencyLevel !== undefined;
                const frequencyLabel = showFrequency
                  ? t.leisure.frequencyLevels[frequencyLevel].label
                  : null;

                return (
                  <div key={card.id} className="flex items-start gap-2">
                    {group === "priority" && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {t.leisure.results.rankIndex(idx + 1)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <ValueCard card={card} compact>
                        {showFrequency && frequencyLabel && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {t.leisure.results.frequencyBadge(frequencyLabel)}
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
