"use client";

import type { Card } from "@/types";
import type { LeisureActivityLevel, FrequencyLevel } from "@/types/leisureActivities";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LeisureFrequencyRow } from "./LeisureFrequencyRow";
import { useT } from "@/i18n";

interface Props {
  bucket: LeisureActivityLevel;
  cards: Card[];
  frequency: Record<string, FrequencyLevel>;
  onChange: (cardId: string, level: FrequencyLevel) => void;
}

export function LeisureFrequencySectionAccordion({ bucket, cards, frequency, onChange }: Props) {
  const t = useT();
  const bucketLabel = t.leisure.activityLevels[bucket].label;
  const count = cards.length;
  const doneCount = cards.filter((c) => frequency[c.id] !== undefined).length;

  return (
    <Accordion type="single" collapsible defaultValue="section">
      <AccordionItem value="section" className="rounded-lg border bg-card">
        <AccordionTrigger className="px-4">
          <div className="flex flex-1 items-center justify-between pr-2 text-left">
            <span className="font-semibold">
              {t.leisure.frequency.sectionHeader(bucketLabel, count)}
            </span>
            <span className="ml-4 shrink-0 text-xs text-muted-foreground">
              {doneCount} / {count}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-2">
            {cards.map((c) => (
              <LeisureFrequencyRow
                key={c.id}
                card={c}
                selected={frequency[c.id]}
                onChange={(lvl) => onChange(c.id, lvl)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
