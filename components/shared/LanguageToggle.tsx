"use client";

import { usePathname } from "next/navigation";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import type { Language } from "@/types";

export function LanguageToggle() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const language = useCardSortStore((s) => s.language);
  const setLanguage = useCardSortStore((s) => s.setLanguage);

  // Landing page has its own nav with a language toggle
  if (pathname === "/") return null;

  const current: Language = hydrated ? language : "vi";

  return (
    <div
      className="fixed right-3 top-3 z-50 flex items-center rounded-full border border-clay-oat bg-clay-cream p-0.5 shadow-clay no-print sm:right-4 sm:top-4"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={current === "vi"}
        className={`clay-btn rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${
          current === "vi" ? "bg-clay-black text-white" : "text-clay-silver"
        }`}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={current === "en"}
        className={`clay-btn rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${
          current === "en" ? "bg-clay-black text-white" : "text-clay-silver"
        }`}
      >
        EN
      </button>
    </div>
  );
}
