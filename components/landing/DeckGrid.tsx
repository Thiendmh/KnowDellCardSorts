"use client";

import { decks } from "@/data/decks";
import { DeckCard } from "./DeckCard";

export function DeckGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {decks.map((d) => (
        <DeckCard key={d.id} deck={d} />
      ))}
    </div>
  );
}
