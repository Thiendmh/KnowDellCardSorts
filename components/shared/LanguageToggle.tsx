"use client";

import { useCardSortStore } from "@/store/useCardSortStore";
import { useHydrated } from "@/hooks/useHydrated";
import type { Language } from "@/types";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const hydrated = useHydrated();
  const language = useCardSortStore((s) => s.language);
  const setLanguage = useCardSortStore((s) => s.setLanguage);

  const current: Language = hydrated ? language : "vi";

  return (
    <div
      className="fixed right-3 top-3 z-50 flex items-center gap-1 rounded-full border bg-background/95 p-1 shadow-md backdrop-blur no-print sm:right-4 sm:top-4"
      role="group"
      aria-label="Language"
    >
      <Languages
        className="ml-2 hidden h-4 w-4 text-muted-foreground sm:inline"
        aria-hidden
      />
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={current === "vi"}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          current === "vi"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={current === "en"}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          current === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </button>
    </div>
  );
}
