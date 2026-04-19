import type { Card, Language } from "@/types";
import { en } from "./en";
import { vi } from "./vi";
import type { Dict } from "./vi";

export type { Dict } from "./vi";

export const dictionaries: Record<Language, Dict> = { en, vi };

export function getDict(lang: Language): Dict {
  return dictionaries[lang];
}

export function pickCardDesc(card: Card, lang: Language): string {
  return lang === "en" ? card.descriptionEn : card.shortDescription;
}
