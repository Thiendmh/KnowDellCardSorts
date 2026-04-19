"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type EnjoymentBucket,
  type EnjoymentLevel,
  type MotivatedSkillsState,
  type ProficiencyLevel,
  ENJOYMENT_LEVELS,
  MIN_PER_ENJOYMENT_BUCKET,
} from "@/types/motivatedSkills";
import { motivatedSkillCards } from "@/data/motivatedSkillCards";

type BucketValidationCode =
  | "UNSORTED_REMAINING"
  | "BUCKET_UNDERFILLED";

interface BucketValidationError {
  code: BucketValidationCode;
  bucket?: EnjoymentLevel;
  need?: number;
  unsortedCount?: number;
}

interface Actions {
  assignEnjoyment: (cardId: string, bucket: EnjoymentBucket) => void;
  setProficiency: (cardId: string, level: ProficiencyLevel) => void;
  canContinueFromEnjoyment: () =>
    | { ok: true }
    | { ok: false; error: BucketValidationError };
  isProficiencyComplete: () => boolean;
  resetAll: () => void;
  setStep: (step: MotivatedSkillsState["currentStep"]) => void;
}

function initialState(): MotivatedSkillsState {
  const enjoymentBuckets: Record<string, EnjoymentBucket> = {};
  for (const c of motivatedSkillCards) enjoymentBuckets[c.id] = "unsorted";
  return {
    enjoymentBuckets,
    proficiency: {},
    currentStep: 1,
    lastUpdatedAt: Date.now(),
  };
}

export const useMotivatedSkillsStore = create<
  MotivatedSkillsState & Actions
>()(
  persist(
    (set, get) => ({
      ...initialState(),

      assignEnjoyment: (cardId, bucket) => {
        set((s) => ({
          enjoymentBuckets: { ...s.enjoymentBuckets, [cardId]: bucket },
          lastUpdatedAt: Date.now(),
        }));
      },

      setProficiency: (cardId, level) => {
        set((s) => ({
          proficiency: { ...s.proficiency, [cardId]: level },
          lastUpdatedAt: Date.now(),
        }));
      },

      canContinueFromEnjoyment: () => {
        const s = get();
        const counts: Record<EnjoymentBucket, number> = {
          unsorted: 0,
          love: 0,
          "like-a-lot": 0,
          like: 0,
          dislike: 0,
          hate: 0,
        };
        for (const id of Object.keys(s.enjoymentBuckets)) {
          const b = s.enjoymentBuckets[id];
          counts[b] = (counts[b] ?? 0) + 1;
        }
        if (counts.unsorted > 0) {
          return {
            ok: false,
            error: {
              code: "UNSORTED_REMAINING",
              unsortedCount: counts.unsorted,
            },
          };
        }
        const underfilled = ENJOYMENT_LEVELS.find(
          (b) => counts[b] < MIN_PER_ENJOYMENT_BUCKET,
        );
        if (underfilled) {
          return {
            ok: false,
            error: {
              code: "BUCKET_UNDERFILLED",
              bucket: underfilled,
              need: MIN_PER_ENJOYMENT_BUCKET - counts[underfilled],
            },
          };
        }
        return { ok: true };
      },

      isProficiencyComplete: () => {
        const s = get();
        return motivatedSkillCards.every(
          (c) => s.proficiency[c.id] !== undefined,
        );
      },

      resetAll: () => {
        set({ ...initialState() });
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("motivated-skills-v1");
          } catch {
            // ignore
          }
        }
      },

      setStep: (step) =>
        set({ currentStep: step, lastUpdatedAt: Date.now() }),
    }),
    {
      name: "motivated-skills-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        enjoymentBuckets: s.enjoymentBuckets,
        proficiency: s.proficiency,
        currentStep: s.currentStep,
        lastUpdatedAt: s.lastUpdatedAt,
      }),
      version: 1,
    },
  ),
);
