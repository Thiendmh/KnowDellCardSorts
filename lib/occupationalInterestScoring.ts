import type { Card } from "@/types";
import type {
  ExposureLevel,
  InterestGroup,
  InterestLevel,
  OccupationalInterestState,
} from "@/types/occupationalInterest";
import { INTEREST_GROUPS_ORDERED } from "@/types/occupationalInterest";

/**
 * Precedence: pursue-now (ranked) > explore-deep | consider (high/medium interest)
 *   > skip (low/none interest). A ranked card never appears anywhere but pursue-now.
 */
export function classifyInterest(
  interest: InterestLevel,
  exposure: ExposureLevel | undefined,
  isRanked: boolean,
): InterestGroup {
  if (isRanked) return "pursue-now";
  if (interest === "low" || interest === "none") return "skip";
  // interest ∈ { very-high, high, medium }
  if (exposure === "experienced" || exposure === "explored") {
    return "explore-deep";
  }
  return "consider";
}

export function groupInterestsByCategory(
  state: OccupationalInterestState,
  cards: Card[],
): Record<InterestGroup, Card[]> {
  const out: Record<InterestGroup, Card[]> = {
    "pursue-now": [],
    "explore-deep": [],
    consider: [],
    skip: [],
  };
  const rankedSet = new Set(state.rankedTopN);
  for (const card of cards) {
    const bucket = state.interestBuckets[card.id];
    if (!bucket || bucket === "unsorted") continue;
    const group = classifyInterest(
      bucket,
      state.exposure[card.id],
      rankedSet.has(card.id),
    );
    out[group].push(card);
  }
  // pursue-now sorts by rank order
  out["pursue-now"].sort(
    (a, b) =>
      state.rankedTopN.indexOf(a.id) - state.rankedTopN.indexOf(b.id),
  );
  for (const g of INTEREST_GROUPS_ORDERED) {
    if (g === "pursue-now") continue;
    out[g].sort((a, b) => a.order - b.order);
  }
  return out;
}
