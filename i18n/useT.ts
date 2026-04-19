"use client";

import { useCardSortStore } from "@/store/useCardSortStore";
import type { Language } from "@/types";
import { dictionaries } from "./dict";
import type { Dict } from "./vi";

export function useLanguage(): Language {
  return useCardSortStore((s) => s.language);
}

export function useT(): Dict {
  const lang = useLanguage();
  return dictionaries[lang];
}
