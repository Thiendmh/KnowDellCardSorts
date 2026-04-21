"use client";

import type { Card } from "@/types";
import type { SkillGroup } from "@/types/motivatedSkills";
import { ValueCard } from "@/components/shared/ValueCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

const GROUP_STYLE: Record<SkillGroup, string> = {
  motivated: "border-l-emerald-500 bg-emerald-50",
  developmental: "border-l-amber-500 bg-amber-50",
  neutral: "border-l-slate-400 bg-slate-50",
  burnout: "border-l-orange-500 bg-orange-50",
  irrelevant: "border-l-rose-500 bg-rose-50",
};

interface Props {
  group: SkillGroup;
  cards: Card[];
  defaultOpen?: boolean;
}

export function SkillGroupAccordion({ group, cards, defaultOpen }: Props) {
  const t = useT();
  const meta = t.skills.results.groups[group];
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
            <div>
              <div className="text-base font-semibold">{meta.name}</div>
              {meta.name !== meta.nameEn && (
                <div className="text-xs text-clay-silver">
                  {meta.nameEn}
                </div>
              )}
            </div>
            <div className="text-sm font-semibold">
              {t.skills.results.groupCount(cards.length)}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <p className="mb-3 text-sm text-clay-silver">
            {meta.description}
          </p>
          {cards.length === 0 ? (
            <p className="text-sm text-clay-silver">—</p>
          ) : (
            <div className="space-y-2">
              {cards.map((c) => (
                <ValueCard key={c.id} card={c} compact />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
