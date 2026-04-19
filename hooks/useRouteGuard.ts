"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHydrated } from "./useHydrated";

export function useRouteGuard(redirectTo: string | null) {
  const hydrated = useHydrated();
  const router = useRouter();
  useEffect(() => {
    if (!hydrated) return;
    if (redirectTo) router.replace(redirectTo);
  }, [hydrated, redirectTo, router]);
  return hydrated;
}
