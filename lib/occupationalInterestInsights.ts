import type { Card } from "@/types";
import type {
  ExposureLevel,
  InterestLevel,
  OccupationalInterestState,
} from "@/types/occupationalInterest";

export interface InterestInsights {
  pursueNowCount: number;
  exploreDeepCount: number;
  considerCount: number;
  skipCount: number;
  // Top-bucket cards (very-high + high) that already have direct experience.
  experiencedInTopInterest: number;
  // Top-bucket cards (very-high + high) that user has never been exposed to.
  untriedInTopInterest: number;
  // Medium-bucket cards with any exposure — "backup" options worth a look.
  exploredBackup: number;
}

export function computeInterestInsights(
  state: OccupationalInterestState,
  cards: Card[],
): InterestInsights {
  let pursueNow = 0;
  let exploreDeep = 0;
  let consider = 0;
  let skip = 0;
  let experiencedTop = 0;
  let untriedTop = 0;
  let exploredBackup = 0;

  const rankedSet = new Set(state.rankedTopN);

  for (const card of cards) {
    const bucket = state.interestBuckets[card.id];
    if (!bucket || bucket === "unsorted") continue;
    const exposure: ExposureLevel | undefined = state.exposure[card.id];

    if (rankedSet.has(card.id)) {
      pursueNow += 1;
      continue;
    }

    if (bucket === "low" || bucket === "none") {
      skip += 1;
      continue;
    }

    // bucket is very-high | high | medium
    const topInterest: InterestLevel[] = ["very-high", "high"];
    const isTopInterest = (topInterest as InterestLevel[]).includes(bucket);
    const hasExposure = exposure === "experienced" || exposure === "explored";

    if (hasExposure) exploreDeep += 1;
    else consider += 1;

    if (isTopInterest && exposure === "experienced") experiencedTop += 1;
    if (isTopInterest && exposure === "none") untriedTop += 1;
    if (bucket === "medium" && hasExposure) exploredBackup += 1;
  }

  return {
    pursueNowCount: pursueNow,
    exploreDeepCount: exploreDeep,
    considerCount: consider,
    skipCount: skip,
    experiencedInTopInterest: experiencedTop,
    untriedInTopInterest: untriedTop,
    exploredBackup: exploredBackup,
  };
}
