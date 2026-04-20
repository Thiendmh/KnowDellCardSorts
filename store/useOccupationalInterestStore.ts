"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type ExposureLevel,
  type InterestBucket,
  type InterestLevel,
  type OccupationalInterestState,
  type RankSize,
  INTEREST_LEVELS,
  TOP_INTEREST_BUCKETS,
  MIN_PER_INTEREST_BUCKET,
  DEFAULT_RANK_SIZE,
} from "@/types/occupationalInterest";
import { occupationalInterestCards } from "@/data/occupationalInterestCards";

type SortValidationCode = "UNSORTED_REMAINING" | "BUCKET_UNDERFILLED";
type RankValidationCode = "RANK_INCOMPLETE";

interface SortValidationError {
  code: SortValidationCode;
  bucket?: InterestLevel;
  need?: number;
  unsortedCount?: number;
}

interface RankValidationError {
  code: RankValidationCode;
  need?: number;
}

interface Actions {
  assignInterest: (cardId: string, bucket: InterestBucket) => void;
  setRankSize: (n: RankSize) => void;
  setRankedTopN: (ids: string[]) => void;
  setExposure: (cardId: string, level: ExposureLevel) => void;
  setStep: (step: OccupationalInterestState["currentStep"]) => void;
  canContinueFromSort: () =>
    | { ok: true }
    | { ok: false; error: SortValidationError };
  canContinueFromRank: () =>
    | { ok: true }
    | { ok: false; error: RankValidationError };
  isExposureComplete: () => boolean;
  resetAll: () => void;
}

function initialState(): OccupationalInterestState {
  const interestBuckets: Record<string, InterestBucket> = {};
  for (const c of occupationalInterestCards) interestBuckets[c.id] = "unsorted";
  return {
    interestBuckets,
    rankSize: DEFAULT_RANK_SIZE,
    rankedTopN: [],
    exposure: {},
    currentStep: 1,
    lastUpdatedAt: Date.now(),
  };
}

export const useOccupationalInterestStore = create<
  OccupationalInterestState & Actions
>()(
  persist(
    (set, get) => ({
      ...initialState(),

      assignInterest: (cardId, bucket) => {
        set((s) => {
          const nextBuckets = { ...s.interestBuckets, [cardId]: bucket };
          // If the card leaves "very-high", drop it from rankedTopN.
          const stillEligible =
            bucket === "very-high" || !s.rankedTopN.includes(cardId);
          const nextRanked = stillEligible
            ? s.rankedTopN
            : s.rankedTopN.filter((id) => id !== cardId);
          return {
            interestBuckets: nextBuckets,
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

      setExposure: (cardId, level) => {
        set((s) => ({
          exposure: { ...s.exposure, [cardId]: level },
          lastUpdatedAt: Date.now(),
        }));
      },

      setStep: (step) => set({ currentStep: step, lastUpdatedAt: Date.now() }),

      canContinueFromSort: () => {
        const s = get();
        const counts: Record<InterestBucket, number> = {
          unsorted: 0,
          "very-high": 0,
          high: 0,
          medium: 0,
          low: 0,
          none: 0,
        };
        for (const id of Object.keys(s.interestBuckets)) {
          const b = s.interestBuckets[id];
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
        const underfilled = INTEREST_LEVELS.find(
          (b) => counts[b] < MIN_PER_INTEREST_BUCKET,
        );
        if (underfilled) {
          return {
            ok: false,
            error: {
              code: "BUCKET_UNDERFILLED",
              bucket: underfilled,
              need: MIN_PER_INTEREST_BUCKET - counts[underfilled],
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

      isExposureComplete: () => {
        const s = get();
        const topSet = new Set<InterestLevel>(TOP_INTEREST_BUCKETS);
        for (const c of occupationalInterestCards) {
          const b = s.interestBuckets[c.id];
          if (b && topSet.has(b as InterestLevel)) {
            if (s.exposure[c.id] === undefined) return false;
          }
        }
        return true;
      },

      resetAll: () => {
        set({ ...initialState() });
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("occupational-interest-v1");
          } catch {
            // ignore
          }
        }
      },
    }),
    {
      name: "occupational-interest-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        interestBuckets: s.interestBuckets,
        rankSize: s.rankSize,
        rankedTopN: s.rankedTopN,
        exposure: s.exposure,
        currentStep: s.currentStep,
        lastUpdatedAt: s.lastUpdatedAt,
      }),
      version: 1,
    },
  ),
);
