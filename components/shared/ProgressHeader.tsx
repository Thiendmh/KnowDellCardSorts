"use client";

import { useT, useLanguage } from "@/i18n";

interface ProgressHeaderProps {
  step: 2 | 3 | 4 | 5 | 6;
  titleEn: string;
  titleVi: string;
  total?: number;
}

const DEFAULT_TOTAL = 5;

export function ProgressHeader({ step, titleEn, titleVi, total = DEFAULT_TOTAL }: ProgressHeaderProps) {
  const t = useT();
  const lang = useLanguage();
  const displayStep = step - 1;
  const pct = (displayStep / total) * 100;
  const primaryTitle = lang === "en" ? titleEn : titleVi;
  const secondaryTitle = lang === "en" ? titleVi : titleEn;

  return (
    <div className="relative border-b border-clay-oat-light bg-clay-cream no-print">
      {/* 3px deck color stripe across full width */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: "var(--deck-color, #078a52)" }}
      />

      <div className="container max-w-5xl px-24 py-4 sm:px-28">
        <div className="mb-2">
          <div className="text-[10px] font-semibold uppercase tracking-[1.08px] text-clay-silver">
            {t.progress(displayStep, total)}
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-[-0.4px] text-clay-black sm:text-xl">
            {primaryTitle}
          </h1>
          <p className="text-xs text-clay-silver">{secondaryTitle}</p>
        </div>

        {/* Progress track */}
        <div className="h-1 overflow-hidden rounded-full bg-clay-oat-light">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${pct}%`,
              backgroundColor: "var(--deck-color, #078a52)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
