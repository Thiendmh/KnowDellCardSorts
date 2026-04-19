"use client";

import Link from "next/link";
import { useT, useLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Deck } from "@/data/decks";

interface DeckCardProps {
  deck: Deck;
}

export function DeckCard({ deck }: DeckCardProps) {
  const t = useT();
  const lang = useLanguage();
  const Icon = deck.icon;
  const purpose = lang === "en" ? deck.purposeEn : deck.purposeVi;
  const example = lang === "en" ? deck.exampleEn : deck.exampleVi;
  const available = deck.status === "available";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br p-5 transition-shadow",
        deck.accent,
        available ? "hover:shadow-md" : "opacity-80",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="rounded-lg bg-background/80 p-2">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            available
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {!available && <Lock className="h-3 w-3" />}
          {available ? t.landing.available : t.landing.comingSoon}
        </span>
      </div>

      <div>
        <div className="text-lg font-semibold leading-tight">{deck.nameEn}</div>
        <div className="text-sm text-muted-foreground">{deck.nameVi}</div>
      </div>

      <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
        {t.landing.purposeLabel}
      </div>
      <p className="text-sm text-foreground/90">{purpose}</p>

      <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
        {t.landing.deckExampleLabel}
      </div>
      <p className="text-xs text-muted-foreground">{example}</p>

      <div className="mt-4 pt-1">
        {available ? (
          <Button asChild size="sm" className="w-full">
            <Link href={deck.href}>
              {t.landing.tryNow}
              <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button size="sm" variant="outline" disabled className="w-full">
            {t.landing.comingSoon}
          </Button>
        )}
      </div>
    </div>
  );
}
