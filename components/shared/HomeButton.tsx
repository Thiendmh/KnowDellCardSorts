"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useLanguage } from "@/i18n";
import { vi as viDict } from "@/i18n/vi";
import { en as enDict } from "@/i18n/en";
import { cn } from "@/lib/utils";

export function HomeButton() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const lang = useLanguage();
  const label = hydrated
    ? (lang === "en" ? enDict.common.home : viDict.common.home)
    : viDict.common.home;

  if (pathname === "/") return null;
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn(
        "fixed left-3 top-3 z-50 inline-flex items-center gap-1.5",
        "rounded-full border bg-background/95 px-3 py-1.5",
        "text-xs font-semibold shadow-md backdrop-blur transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "no-print sm:left-4 sm:top-4",
      )}
    >
      <Home className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
