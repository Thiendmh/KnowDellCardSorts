"use client";

import { useEffect, useState } from "react";
import { useCardSortStore } from "@/store/useCardSortStore";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useCardSortStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useCardSortStore.persist.hasHydrated()) setHydrated(true);
    return () => {
      unsub();
    };
  }, []);
  return hydrated;
}
