"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type FrequencyLevel,
  type LeisureActivityBucket,
  type LeisureActivityLevel,
  type LeisureActivitiesState,
  type RankSize,
  LEISURE_ACTIVITY_LEVELS,
  TOP_LEISURE_BUCKETS,
  MIN_PER_LEISURE_BUCKET,
  DEFAULT_RANK_SIZE,
  RANK_ELIGIBLE_BUCKET,
} from "@/types/leisureActivities";
import { leisureActivityCards } from "@/data/leisureActivityCards";

type SortValidationCode = "UNSORTED_REMAINING" | "BUCKET_UNDERFILLED";
type RankValidationCode = "RANK_INCOMPLETE";

interface SortValidationError {
  code: SortValidationCode;
  bucket?: LeisureActivityLevel;
  need?: number;
  unsortedCount?: number;
}

interface RankValidationError {
  code: RankValidationCode;
  need?: number;
}

interface Actions {
  assignActivity: (cardId: string, bucket: LeisureActivityBucket) => void;
  setRankSize: (n: RankSize) => void;
  setRankedTopN: (ids: string[]) => void;
  setFrequency: (cardId: string, level: FrequencyLevel) => void;
  setStep: (step: LeisureActivitiesState["currentStep"]) => void;
  canContinueFromSort: () =>
    | { ok: true }
    | { ok: false; error: SortValidationError };
  canContinueFromRank: () =>
    | { ok: true }
    | { ok: false; error: RankValidationError };
  isFrequencyComplete: () => boolean;
  resetAll: () => void;
}

function initialState(): LeisureActivitiesState {
  const activityBuckets: Record<string, LeisureActivityBucket> = {};
  for (const c of leisureActivityCards) activityBuckets[c.id] = "unsorted";
  return {
    activityBuckets,
    rankSize: DEFAULT_RANK_SIZE,
    rankedTopN: [],
    frequency: {},
    currentStep: 1,
    lastUpdatedAt: Date.now(),
  };
}

export const useLeisureActivitiesStore = create<
  LeisureActivitiesState & Actions
>()(
  persist(
    (set, get) => ({
      ...initialState(),

      assignActivity: (cardId, bucket) => {
        set((s) => {
          const nextBuckets = { ...s.activityBuckets, [cardId]: bucket };
          const stillEligible =
            bucket === RANK_ELIGIBLE_BUCKET || !s.rankedTopN.includes(cardId);
          const nextRanked = stillEligible
            ? s.rankedTopN
            : s.rankedTopN.filter((id) => id !== cardId);
          return {
            activityBuckets: nextBuckets,
            rankedTopN: nextRanked,
            lastUpdatedAt: Date.now(),
          };
        });
      },

      setRankSize: (n) => {
        set((s) => ({
          rankSize: n,
          rankedTopN: s.rankedTopN.slice(0, n),
          lastUpdatedAt: Date.now(),
        }));
      },

      setRankedTopN: (ids) => {
        set({ rankedTopN: ids, lastUpdatedAt: Date.now() });
      },

      setFrequency: (cardId, level) => {
        set((s) => ({
          frequency: { ...s.frequency, [cardId]: level },
          lastUpdatedAt: Date.now(),
        }));
      },

      setStep: (step) => set({ currentStep: step, lastUpdatedAt: Date.now() }),

      canContinueFromSort: () => {
        const s = get();
        const counts: Record<LeisureActivityBucket, number> = {
          unsorted: 0,
          "do-often": 0,
          "want-more": 0,
          "used-to": 0,
          "never-tried": 0,
          "not-interested": 0,
        };
        for (const id of Object.keys(s.activityBuckets)) {
          const b = s.activityBuckets[id];
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
        const underfilled = LEISURE_ACTIVITY_LEVELS.find(
          (b) => counts[b] < MIN_PER_LEISURE_BUCKET,
        );
        if (underfilled) {
          return {
            ok: false,
            error: {
              code: "BUCKET_UNDERFILLED",
              bucket: underfilled,
              need: MIN_PER_LEISURE_BUCKET - counts[underfilled],
            },
          };
        }
        return { ok: true };
      },

      canContinueFromRank: () => {
        const s = get();
        if (s.rankedTopN.length !== s.rankSize) {
          return {
            ok: false,
            error: {
              code: "RANK_INCOMPLETE",
              need: s.rankSize - s.rankedTopN.length,
            },
          };
        }
        return { ok: true };
      },

      isFrequencyComplete: () => {
        const s = get();
        const topSet = new Set<LeisureActivityLevel>(TOP_LEISURE_BUCKETS);
        for (const c of leisureActivityCards) {
          const b = s.activityBuckets[c.id];
          if (b && topSet.has(b as LeisureActivityLevel)) {
            if (s.frequency[c.id] === undefined) return false;
          }
        }
        return true;
      },

      resetAll: () => {
        set({ ...initialState() });
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("leisure-activities-v1");
          } catch {
            // ignore
          }
        }
      },
    }),
    {
      name: "leisure-activities-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        activityBuckets: s.activityBuckets,
        rankSize: s.rankSize,
        rankedTopN: s.rankedTopN,
        frequency: s.frequency,
        currentStep: s.currentStep,
        lastUpdatedAt: s.lastUpdatedAt,
      }),
      version: 1,
    },
  ),
);
