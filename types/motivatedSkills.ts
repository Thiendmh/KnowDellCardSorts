export type EnjoymentLevel = "love" | "like-a-lot" | "like" | "dislike" | "hate";
export type EnjoymentBucket = EnjoymentLevel | "unsorted";

export const ENJOYMENT_LEVELS: EnjoymentLevel[] = [
  "love",
  "like-a-lot",
  "like",
  "dislike",
  "hate",
];

export type ProficiencyLevel = "expert" | "competent" | "learning";

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  "expert",
  "competent",
  "learning",
];

export type SkillGroup =
  | "motivated"
  | "developmental"
  | "burnout"
  | "neutral"
  | "irrelevant";

export const SKILL_GROUPS_ORDERED: SkillGroup[] = [
  "motivated",
  "developmental",
  "burnout",
  "neutral",
  "irrelevant",
];

export const MIN_PER_ENJOYMENT_BUCKET = 3;

export interface MotivatedSkillsState {
  enjoymentBuckets: Record<string, EnjoymentBucket>;
  proficiency: Record<string, ProficiencyLevel>;
  currentStep: 1 | 2 | 3 | 4;
  lastUpdatedAt: number;
}
