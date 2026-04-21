"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ListChecks, Trophy, Activity, BarChart3 } from "lucide-react";
import { useT, useLanguage } from "@/i18n";

const STEP_ICONS = [ListChecks, Trophy, Activity, BarChart3];

export function LeisureLandingClient() {
  const t = useT();
  const lang = useLanguage();

  const steps = [
    { label: t.leisure.landing.step1Label, body: t.leisure.landing.step1Body },
    { label: t.leisure.landing.step2Label, body: t.leisure.landing.step2Body },
    { label: t.leisure.landing.step3Label, body: t.leisure.landing.step3Body },
    { label: t.leisure.landing.step4Label, body: t.leisure.landing.step4Body },
  ];

  const titlePrimary =
    lang === "en" ? t.leisure.landing.titleEn : t.leisure.landing.title;
  const titleSecondary =
    lang === "en" ? t.leisure.landing.title : t.leisure.landing.titleEn;

  return (
    <main className="min-h-dvh">
      <section className="container max-w-3xl py-12 sm:py-16">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {t.leisure.common.deckNameEn} · {t.leisure.common.deckName}
        </div>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {titlePrimary}
        </h1>
        {titlePrimary !== titleSecondary && (
          <p className="mt-1 text-lg text-muted-foreground">{titleSecondary}</p>
        )}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t.leisure.landing.body}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.leisure.landing.timeHint}
        </p>

        <h2 className="mt-10 text-xl font-semibold">
          {t.leisure.landing.stepsTitle}
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? ListChecks;
            return (
              <li
                key={i}
                className="flex flex-col rounded-lg border bg-background p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 font-semibold">{s.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/leisure/sort">
              {t.leisure.landing.cta}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
