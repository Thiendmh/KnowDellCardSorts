"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Layers, ListOrdered, Grid3x3 } from "lucide-react";
import { useT } from "@/i18n";
import { DeckGrid } from "./DeckGrid";

const STEP_ICONS = [Layers, ListOrdered, Grid3x3];

export function LandingPageClient() {
  const t = useT();

  return (
    <main className="min-h-dvh">
      {/* Hero */}
      <section className="container max-w-4xl py-12 sm:py-20">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Lock className="h-3 w-3" />
          {t.common.private}
        </div>
        <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
          {t.landing.heroBadge}
        </div>
        <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {t.landing.heroTitle}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          {t.landing.heroSubtitle}
        </p>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {t.landing.heroDesc}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/instructions">
              {t.landing.ctaTry}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#methodology">{t.landing.ctaLearn}</Link>
          </Button>
        </div>
      </section>

      {/* Methodology */}
      <section
        id="methodology"
        className="border-t bg-muted/30"
      >
        <div className="container max-w-4xl py-12 sm:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.landing.methodologyTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.landing.methodologyBody}
          </p>

          <div className="mt-6 rounded-lg border bg-background p-5">
            <div className="text-sm font-semibold">
              {t.landing.methodologyWhoTitle}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.landing.methodologyWhoBody}
            </p>
          </div>
        </div>
      </section>

      {/* Decks */}
      <section className="border-t">
        <div className="container max-w-5xl py-12 sm:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.landing.decksTitle}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t.landing.decksSubtitle}
          </p>

          <div className="mt-8">
            <DeckGrid />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-muted/30">
        <div className="container max-w-4xl py-12 sm:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.landing.howItWorksTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.landing.howItWorksSteps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? Layers;
              return (
                <div
                  key={i}
                  className="flex flex-col rounded-lg border bg-background p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {i + 1}
                    </span>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-2 font-semibold">{s.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t">
        <div className="container max-w-3xl py-12 sm:py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.landing.finalCtaTitle}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t.landing.finalCtaBody}
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/instructions">
                {t.landing.ctaTry}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container max-w-4xl py-6 text-xs text-muted-foreground">
          {t.common.privacyFooter}
        </div>
      </footer>
    </main>
  );
}
