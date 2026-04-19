"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppState, BucketId, Choice, Language, SupportValue } from "@/types";
import { ALWAYS_LIMIT } from "@/types";
import { careerValueCards } from "@/data/careerValueCards";

interface Actions {
  assignCard: (cardId: string, bucket: BucketId) => { ok: boolean; error?: string };
  setRankOrder: (ids: string[]) => void;
  moveCardInRank: (fromIndex: number, toIndex: number) => void;
  addChoice: (label: string) => { ok: boolean; error?: string };
  removeChoice: (id: string) => void;
  renameChoice: (id: string, label: string) => void;
  setCell: (cardId: string, choiceId: string, value: SupportValue) => void;
  resetAll: () => void;
  setStep: (step: AppState["currentStep"]) => void;
  syncRankedFromAlways: () => void;
  setLanguage: (lang: Language) => void;
}

function initialState(): AppState {
  const cardBuckets: Record<string, BucketId> = {};
  for (const c of careerValueCards) cardBuckets[c.id] = "unsorted";
  return {
    cardBuckets,
    rankedTop8: [],
    choices: [],
    matrix: {},
    currentStep: 1,
    lastUpdatedAt: Date.now(),
    language: "vi",
  };
}

function genId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export const useCardSortStore = create<AppState & Actions>()(
  persist(
    (set, get) => ({
      ...initialState(),

      assignCard: (cardId, bucket) => {
        const state = get();
        if (bucket === "always") {
          const alwaysCount = Object.values(state.cardBuckets).filter(
            (b) => b === "always",
          ).length;
          const currentBucket = state.cardBuckets[cardId];
          const willAdd = currentBucket !== "always";
          if (willAdd && alwaysCount >= ALWAYS_LIMIT) {
            return {
              ok: false,
              error: `"Always Valued" chỉ được tối đa ${ALWAYS_LIMIT} thẻ.`,
            };
          }
        }
        set((s) => ({
          cardBuckets: { ...s.cardBuckets, [cardId]: bucket },
          lastUpdatedAt: Date.now(),
        }));
        return { ok: true };
      },

      setRankOrder: (ids) => {
        set({ rankedTop8: ids, lastUpdatedAt: Date.now() });
      },

      moveCardInRank: (fromIndex, toIndex) => {
        const s = get();
        const arr = [...s.rankedTop8];
        if (toIndex < 0 || toIndex >= arr.length) return;
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        set({ rankedTop8: arr, lastUpdatedAt: Date.now() });
      },

      syncRankedFromAlways: () => {
        const s = get();
        const alwaysIds = Object.entries(s.cardBuckets)
          .filter(([, b]) => b === "always")
          .map(([id]) => id);
        const prev = s.rankedTop8.filter((id) => alwaysIds.includes(id));
        const missing = alwaysIds.filter((id) => !prev.includes(id));
        const next = [...prev, ...missing];
        set({ rankedTop8: next, lastUpdatedAt: Date.now() });
      },

      addChoice: (label) => {
        const trimmed = label.trim();
        if (!trimmed) return { ok: false, error: "Nhãn không được để trống." };
        const s = get();
        if (s.choices.length >= 5) {
          return { ok: false, error: "Tối đa 5 lựa chọn." };
        }
        const newChoice: Choice = { id: genId(), label: trimmed };
        set({
          choices: [...s.choices, newChoice],
          lastUpdatedAt: Date.now(),
        });
        return { ok: true };
      },

      removeChoice: (id) => {
        set((s) => {
          const nextMatrix = { ...s.matrix };
          for (const cardId of Object.keys(nextMatrix)) {
            if (nextMatrix[cardId]?.[id] !== undefined) {
              const row = { ...nextMatrix[cardId] };
              delete row[id];
              nextMatrix[cardId] = row;
            }
          }
          return {
            choices: s.choices.filter((c) => c.id !== id),
            matrix: nextMatrix,
            lastUpdatedAt: Date.now(),
          };
        });
      },

      renameChoice: (id, label) => {
        const trimmed = label.trim();
        if (!trimmed) return;
        set((s) => ({
          choices: s.choices.map((c) =>
            c.id === id ? { ...c, label: trimmed.slice(0, 60) } : c,
          ),
          lastUpdatedAt: Date.now(),
        }));
      },

      setCell: (cardId, choiceId, value) => {
        set((s) => ({
          matrix: {
            ...s.matrix,
            [cardId]: { ...(s.matrix[cardId] ?? {}), [choiceId]: value },
          },
          lastUpdatedAt: Date.now(),
        }));
      },

      resetAll: () => {
        set({ ...initialState() });
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("career-values-v1");
          } catch {
            // ignore
          }
        }
      },

      setStep: (step) => set({ currentStep: step, lastUpdatedAt: Date.now() }),

      setLanguage: (lang) =>
        set({ language: lang, lastUpdatedAt: Date.now() }),
    }),
    {
      name: "career-values-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        cardBuckets: s.cardBuckets,
        rankedTop8: s.rankedTop8,
        choices: s.choices,
        matrix: s.matrix,
        currentStep: s.currentStep,
        lastUpdatedAt: s.lastUpdatedAt,
        language: s.language,
      }),
      version: 1,
    },
  ),
);
