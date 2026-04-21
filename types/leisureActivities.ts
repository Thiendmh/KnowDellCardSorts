export type LeisureActivityLevel =
  | "do-often"
  | "want-more"
  | "used-to"
  | "never-tried"
  | "not-interested";

export type LeisureActivityBucket = LeisureActivityLevel | "unsorted";

export const LEISURE_ACTIVITY_LEVELS: LeisureActivityLevel[] = [
  "do-often",
  "want-more",
  "used-to",
  "never-tried",
  "not-interested",
];

export const TOP_LEISURE_BUCKETS: LeisureActivityLevel[] = [
  "do-often",
  "want-more",
  "used-to",
];

export const RANK_ELIGIBLE_BUCKET: LeisureActivityLevel = "do-often";

export type FrequencyLevel = "active" | "occasional" | "not-active";

export const FREQUENCY_LEVELS: FrequencyLevel[] = [
  "active",
  "occasional",
  "not-active",
];

export type RankSize = 3 | 5 | 8;
export const RANK_SIZES: RankSize[] = [3, 5, 8];
export const DEFAULT_RANK_SIZE: RankSize = 5;

export type LeisureGroup =
  | "priority"
  | "keep-active"
  | "develop"
  | "release";

export const LEISURE_GROUPS_ORDERED: LeisureGroup[] = [
  "priority",
  "keep-active",
  "develop",
  "release",
];

export const MIN_PER_LEISURE_BUCKET = 3;

export interface LeisureActivitiesState {
  activityBuckets: Record<string, LeisureActivityBucket>;
  rankSize: RankSize;
  rankedTopN: string[];
  frequency: Record<string, FrequencyLevel>;
  currentStep: 1 | 2 | 3 | 4 | 5;
  lastUpdatedAt: number;
}
