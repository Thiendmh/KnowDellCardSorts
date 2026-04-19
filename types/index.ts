export type BucketId =
  | "unsorted"
  | "always"
  | "often"
  | "sometimes"
  | "seldom"
  | "never";

export const BUCKETS: Exclude<BucketId, "unsorted">[] = [
  "always",
  "often",
  "sometimes",
  "seldom",
  "never",
];

export const BUCKET_LABELS: Record<BucketId, { en: string; vi: string }> = {
  unsorted: { en: "Unsorted", vi: "Chưa phân loại" },
  always: { en: "Always Valued", vi: "Luôn coi trọng" },
  often: { en: "Often Valued", vi: "Thường coi trọng" },
  sometimes: { en: "Sometimes Valued", vi: "Đôi khi coi trọng" },
  seldom: { en: "Seldom Valued", vi: "Hiếm khi coi trọng" },
  never: { en: "Never Valued", vi: "Không coi trọng" },
};

export const ALWAYS_LIMIT = 8;

export interface Card {
  id: string;
  order: number;
  en: string;
  vi: string;
  shortDescription: string;
  descriptionEn: string;
}

export type SupportValue = 3 | 2 | 1 | -1 | "unknown";

export const SUPPORT_OPTIONS: {
  value: SupportValue;
  labelEn: string;
  labelVi: string;
  display: string;
}[] = [
  { value: 3, labelEn: "Strong support", labelVi: "Hỗ trợ mạnh", display: "3" },
  { value: 2, labelEn: "Moderate support", labelVi: "Hỗ trợ vừa", display: "2" },
  { value: 1, labelEn: "Unclear", labelVi: "Chưa rõ / cần thêm thông tin", display: "1" },
  { value: -1, labelEn: "Conflict", labelVi: "Xung đột", display: "-1" },
  { value: "unknown", labelEn: "Unknown", labelVi: "Không rõ", display: "?" },
];

export interface Choice {
  id: string;
  label: string;
}

export type Matrix = Record<string, Record<string, SupportValue>>;

export type Language = "en" | "vi";

export interface AppState {
  cardBuckets: Record<string, BucketId>;
  rankedTop8: string[];
  choices: Choice[];
  matrix: Matrix;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
  lastUpdatedAt: number;
  language: Language;
}

export interface ChoiceStats {
  totalScore: number;
  unknownCount: number;
  supportCount: number;
  conflictCount: number;
}
