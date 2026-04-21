"use client";

import Link from "next/link";
import { useT, useLanguage } from "@/i18n";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Deck } from "@/data/decks";

interface DeckCardProps {
  deck: Deck;
}

export function DeckCard({ deck }: DeckCardProps) {
  const t = useT();
  const lang = useLanguage();
  const purpose = lang === "en" ? deck.purposeEn : deck.purposeVi;
  const available = deck.status === "available";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-clay-oat bg-white p-5 shadow-clay",
        available ? "transition-transform hover:-translate-y-0.5 hover:shadow-md" : "opacity-75",
      )}
    >
      {/* Deck swatch bar */}
      <div
        className="absolute inset-x-0 top-0 h-[5px] rounded-t-2xl"
        style={{ backgroundColor: deck.swatchColor }}
      />

      <div className="mt-2 mb-3 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px]"
          style={
            available
              ? {
                  backgroundColor: `${deck.swatchColor}20`,
                  color: deck.swatchColor,
                }
              : { backgroundColor: "#eee9df", color: "#9f9b93" }
          }
        >
          {!available && <Lock className="h-2.5 w-2.5" />}
          {available ? t.landing.available : t.landing.comingSoon}
        </span>
      </div>

      <div className="mb-1 text-base font-bold leading-tight text-clay-black">
        {deck.nameEn}
      </div>
      <div className="mb-3 text-xs text-clay-silver">{deck.nameVi}</div>

      <p className="flex-1 text-sm leading-relaxed text-clay-charcoal">{purpose}</p>

      <div className="mt-4">
        {available ? (
          <Link
            href={deck.href}
            className="clay-btn flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: deck.swatchColor,
              color: deck.swatchTextColor,
            }}
          >
            {t.landing.tryNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-clay-oat py-2.5 text-sm font-semibold text-clay-silver opacity-60 cursor-not-allowed"
          >
            <Lock className="h-3.5 w-3.5" />
            {t.landing.comingSoon}
          </button>
        )}
      </div>
    </div>
  );
}
