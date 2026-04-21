"use client";

import type { Card } from "@/types";
import { EXPOSURE_LEVELS, type ExposureLevel } from "@/types/occupationalInterest";
import { ValueCard } from "@/components/shared/ValueCard";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

interface Props {
  card: Card;
  selected: ExposureLevel | undefined;
  onChange: (level: ExposureLevel) => void;
}

export function ExposureRow({ card, selected, onChange }: Props) {
  const t = useT();
  return (
    <div className="rounded-lg border bg-clay-cream p-3">
      <ValueCard card={card} compact />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {EXPOSURE_LEVELS.map((lvl) => {
          const active = selected === lvl;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onChange(lvl)}
              aria-pressed={active}
              className={cn(
                "rounded-md border px-2 py-2 text-xs font-semibold transition-colors sm:text-sm",
                active
                  ? "border-[var(--deck-color)] bg-[var(--deck-color)] text-[var(--deck-text-color)]"
                  : "border-clay-oat bg-white text-clay-charcoal hover:bg-clay-oat-light",
              )}
            >
              {t.interests.exposureLevels[lvl].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
