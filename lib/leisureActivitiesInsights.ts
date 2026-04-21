import type { Card } from "@/types";
import type { LeisureActivitiesState } from "@/types/leisureActivities";

export interface LeisureInsights {
  priorityCount: number;
  keepActiveCount: number;
  developCount: number;
  releaseCount: number;
  activeInTopBuckets: number; // cards in do-often or want-more with frequency "active"
  untriedHighInterest: number; // cards in do-often or want-more with frequency "not-active", OR in "never-tried" bucket
}

export function computeLeisureInsights(
  state: LeisureActivitiesState,
  cards: Card[],
): LeisureInsights {
  let priority = 0;
  let keepActive = 0;
  let develop = 0;
  let release = 0;
  let activeInTop = 0;
  let untriedHigh = 0;

  const rankedSet = new Set(state.rankedTopN);

  for (const card of cards) {
    const bucket = state.activityBuckets[card.id];
    if (!bucket || bucket === "unsorted") continue;
    const frequency = state.frequency[card.id];

    if (rankedSet.has(card.id)) {
      priority += 1;
      continue;
    }

    if (bucket === "not-interested") {
      release += 1;
      continue;
    }

    if (bucket === "never-tried") {
      develop += 1;
      untriedHigh += 1;
      continue;
    }

    // top buckets: do-often, want-more, used-to
    if (frequency === "active" || frequency === "occasional") {
      keepActive += 1;
    } else {
      develop += 1;
    }

    if (
      (bucket === "do-often" || bucket === "want-more") &&
      frequency === "active"
    ) {
      activeInTop += 1;
    }

    if (
      (bucket === "do-often" || bucket === "want-more") &&
      frequency === "not-active"
    ) {
      untriedHigh += 1;
    }
  }

  return {
    priorityCount: priority,
    keepActiveCount: keepActive,
    developCount: develop,
    releaseCount: release,
    activeInTopBuckets: activeInTop,
    untriedHighInterest: untriedHigh,
  };
}
