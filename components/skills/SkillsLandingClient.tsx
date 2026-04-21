"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ListChecks, Gauge, Grid3x3 } from "lucide-react";
import { useT, useLanguage } from "@/i18n";

const STEP_ICONS = [ListChecks, Gauge, Grid3x3];

const DECK_STYLE = {
  "--deck-color": "#fbbd41",
  "--deck-text-color": "#000000",
} as React.CSSProperties;

export function SkillsLandingClient() {
  const t = useT();
  const lang = useLanguage();
  const steps: { label: string; body: string }[] = [
    { label: t.skills.intro.step1Label, body: t.skills.intro.step1Body },
    { label: t.skills.intro.step2Label, body: t.skills.intro.step2Body },
    { label: t.skills.intro.step3Label, body: t.skills.intro.step3Body },
  ];

  const titlePrimary = lang === "en" ? t.skills.intro.titleEn : t.skills.intro.title;
  const titleSecondary = lang === "en" ? t.skills.intro.title : t.skills.intro.titleEn;

  return (
    <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
      <section className="container max-w-3xl py-12 sm:py-16">
        <div className="text-xs uppercase tracking-wide text-clay-silver">
          {t.skills.common.deckNameEn} · {t.skills.common.deckName}
        </div>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {titlePrimary}
        </h1>
        {titlePrimary !== titleSecondary && (
          <p className="mt-1 text-lg text-clay-silver">{titleSecondary}</p>
        )}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-clay-silver">
          {t.skills.intro.body}
        </p>

        <h2 className="mt-10 text-xl font-semibold">
          {t.skills.intro.stepsTitle}
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? ListChecks;
            return (
              <li
                key={i}
                className="flex flex-col rounded-lg border bg-white p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 font-semibold">{s.label}</div>
                <p className="mt-1 text-sm text-clay-silver">{s.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/skills/enjoyment">
              {t.skills.intro.cta}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
