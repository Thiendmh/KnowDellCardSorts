export type InterestLevel =
  | "very-high"
  | "high"
  | "medium"
  | "low"
  | "none";

export type InterestBucket = InterestLevel | "unsorted";

export const INTEREST_LEVELS: InterestLevel[] = [
  "very-high",
  "high",
  "medium",
  "low",
  "none",
];

// The 3 top buckets require an exposure rating in step 3.
export const TOP_INTEREST_BUCKETS: InterestLevel[] = [
  "very-high",
  "high",
  "medium",
];

export type ExposureLevel = "experienced" | "explored" | "none";

export const EXPOSURE_LEVELS: ExposureLevel[] = [
  "experienced",
  "explored",
  "none",
];

export type RankSize = 3 | 5 | 8;
export const RANK_SIZES: RankSize[] = [3, 5, 8];
export const DEFAULT_RANK_SIZE: RankSize = 5;

export type InterestGroup =
  | "pursue-now"
  | "explore-deep"
  | "consider"
  | "skip";

export const INTEREST_GROUPS_ORDERED: InterestGroup[] = [
  "pursue-now",
  "explore-deep",
  "consider",
  "skip",
];

// Minimum cards required per interest bucket. Prevents "dump into one bucket".
// Also the floor that makes even the smallest RankSize (3) feasible.
export const MIN_PER_INTEREST_BUCKET = 3;

export interface OccupationalInterestState {
  interestBuckets: Record<string, InterestBucket>;
  rankSize: RankSize;
  rankedTopN: string[];
  exposure: Record<string, ExposureLevel>;
  currentStep: 1 | 2 | 3 | 4 | 5;
  lastUpdatedAt: number;
}
