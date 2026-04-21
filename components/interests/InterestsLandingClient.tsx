"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ListChecks, Trophy, Telescope, BarChart3 } from "lucide-react";
import { useT, useLanguage } from "@/i18n";

const STEP_ICONS = [ListChecks, Trophy, Telescope, BarChart3];

const DECK_STYLE = {
  "--deck-color": "#43089f",
  "--deck-text-color": "#ffffff",
} as React.CSSProperties;

export function InterestsLandingClient() {
  const t = useT();
  const lang = useLanguage();

  const steps = [
    { label: t.interests.landing.step1Label, body: t.interests.landing.step1Body },
    { label: t.interests.landing.step2Label, body: t.interests.landing.step2Body },
    { label: t.interests.landing.step3Label, body: t.interests.landing.step3Body },
    { label: t.interests.landing.step4Label, body: t.interests.landing.step4Body },
  ];

  const titlePrimary =
    lang === "en" ? t.interests.landing.titleEn : t.interests.landing.title;
  const titleSecondary =
    lang === "en" ? t.interests.landing.title : t.interests.landing.titleEn;

  return (
    <main className="min-h-dvh bg-clay-cream" style={DECK_STYLE}>
      <section className="container max-w-3xl py-12 sm:py-16">
        <div className="text-xs uppercase tracking-wide text-clay-silver">
          {t.interests.common.deckNameEn} · {t.interests.common.deckName}
        </div>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {titlePrimary}
        </h1>
        {titlePrimary !== titleSecondary && (
          <p className="mt-1 text-lg text-clay-silver">{titleSecondary}</p>
        )}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-clay-silver">
          {t.interests.landing.body}
        </p>
        <p className="mt-2 text-sm text-clay-silver">
          {t.interests.landing.timeHint}
        </p>

        <h2 className="mt-10 text-xl font-semibold">
          {t.interests.landing.stepsTitle}
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? ListChecks;
            return (
              <li
                key={i}
                className="flex flex-col rounded-lg border bg-white p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--deck-color)_15%,transparent)] text-sm font-semibold text-[var(--deck-color)]">
                    {i + 1}
                  </span>
                  <Icon className="h-4 w-4 text-[var(--deck-color)]" />
                </div>
                <div className="mt-2 font-semibold">{s.label}</div>
                <p className="mt-1 text-sm text-clay-silver">{s.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/interests/sort">
              {t.interests.landing.cta}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
