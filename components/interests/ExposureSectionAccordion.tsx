"use client";

import type { Card } from "@/types";
import type { InterestLevel, ExposureLevel } from "@/types/occupationalInterest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ExposureRow } from "./ExposureRow";
import { useT } from "@/i18n";

interface Props {
  bucket: InterestLevel;
  cards: Card[];
  exposure: Record<string, ExposureLevel>;
  onChange: (cardId: string, level: ExposureLevel) => void;
}

export function ExposureSectionAccordion({ bucket, cards, exposure, onChange }: Props) {
  const t = useT();
  const bucketLabel = t.interests.interestLevels[bucket].label;
  const count = cards.length;
  const doneCount = cards.filter((c) => exposure[c.id] !== undefined).length;

  return (
    <Accordion type="single" collapsible defaultValue="section">
      <AccordionItem value="section" className="rounded-lg border bg-card">
        <AccordionTrigger className="px-4">
          <div className="flex flex-1 items-center justify-between pr-2 text-left">
            <span className="font-semibold">
              {t.interests.exposure.sectionHeader(bucketLabel, count)}
            </span>
            <span className="ml-4 shrink-0 text-xs text-clay-silver">
              {doneCount} / {count}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-2">
            {cards.map((c) => (
              <ExposureRow
                key={c.id}
                card={c}
                selected={exposure[c.id]}
                onChange={(lvl) => onChange(c.id, lvl)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
