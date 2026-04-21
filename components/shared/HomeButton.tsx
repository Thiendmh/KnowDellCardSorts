"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useLanguage } from "@/i18n";

export function HomeButton() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const lang = useLanguage();
  const label = hydrated ? (lang === "en" ? "Home" : "Trang chủ") : "Trang chủ";

  if (pathname === "/") return null;
  return (
    <Link
      href="/"
      aria-label={label}
      className="clay-btn fixed left-3 top-3 z-50 inline-flex items-center gap-1.5 rounded-full border border-clay-oat bg-clay-cream px-3 py-1.5 text-xs font-semibold text-clay-black shadow-clay backdrop-blur hover:bg-matcha-600 hover:border-transparent hover:text-white no-print sm:left-4 sm:top-4"
    >
      <Home className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
