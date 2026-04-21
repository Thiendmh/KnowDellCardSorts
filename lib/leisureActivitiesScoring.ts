import type { Card } from "@/types";
import type {
  FrequencyLevel,
  LeisureActivitiesState,
  LeisureActivityLevel,
  LeisureGroup,
} from "@/types/leisureActivities";
import { LEISURE_GROUPS_ORDERED } from "@/types/leisureActivities";

export function classifyLeisureActivity(
  bucket: LeisureActivityLevel,
  frequency: FrequencyLevel | undefined,
  isRanked: boolean,
): LeisureGroup {
  if (isRanked) return "priority";
  if (bucket === "not-interested") return "release";
  if (bucket === "never-tried") return "develop";
  // top buckets: do-often, want-more, used-to
  if (frequency === "active" || frequency === "occasional") return "keep-active";
  return "develop"; // not-active or undefined
}

export function groupLeisureActivities(
  state: LeisureActivitiesState,
  cards: Card[],
): Record<LeisureGroup, Card[]> {
  const out: Record<LeisureGroup, Card[]> = {
    priority: [],
    "keep-active": [],
    develop: [],
    release: [],
  };
  const rankedSet = new Set(state.rankedTopN);
  for (const card of cards) {
    const bucket = state.activityBuckets[card.id];
    if (!bucket || bucket === "unsorted") continue;
    const group = classifyLeisureActivity(
      bucket,
      state.frequency[card.id],
      rankedSet.has(card.id),
    );
    out[group].push(card);
  }
  out["priority"].sort(
    (a, b) =>
      state.rankedTopN.indexOf(a.id) - state.rankedTopN.indexOf(b.id),
  );
  for (const g of LEISURE_GROUPS_ORDERED) {
    if (g === "priority") continue;
    out[g].sort((a, b) => a.order - b.order);
  }
  return out;
}
