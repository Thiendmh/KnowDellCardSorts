"use client";

import { Progress } from "@/components/ui/progress";
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
    <div className="border-b bg-background no-print">
      <div className="container max-w-5xl py-4 px-24 sm:px-28">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {t.progress(displayStep, total)}
            </div>
            <h1 className="text-lg font-semibold leading-tight sm:text-xl">
              {primaryTitle}
            </h1>
            <p className="text-sm text-muted-foreground">{secondaryTitle}</p>
          </div>
        </div>
        <Progress value={pct} />
      </div>
    </div>
  );
}
