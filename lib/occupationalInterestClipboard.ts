import type { Card } from "@/types";
import type { Language } from "@/types";
import type {
  ExposureLevel,
  InterestGroup,
  OccupationalInterestState,
} from "@/types/occupationalInterest";
import { INTEREST_GROUPS_ORDERED } from "@/types/occupationalInterest";
import { groupInterestsByCategory } from "@/lib/occupationalInterestScoring";

const GROUP_ICONS: Record<InterestGroup, string> = {
  "pursue-now": "🎯",
  "explore-deep": "🔎",
  consider: "⚖️",
  skip: "⏭️",
};

export interface ClipboardStrings {
  header: string;
  groupLabels: Record<InterestGroup, { en: string; vi: string }>;
  exposureLabels: Record<ExposureLevel, { en: string; vi: string }>;
}

export function buildInterestsClipboardText(
  state: OccupationalInterestState,
  cards: Card[],
  lang: Language,
  strings: ClipboardStrings,
): string {
  const grouped = groupInterestsByCategory(state, cards);
  const lines: string[] = [];
  lines.push(strings.header);
  lines.push("=".repeat(strings.header.length));
  lines.push("");

  for (const g of INTEREST_GROUPS_ORDERED) {
    const list = grouped[g];
    const labelPair = strings.groupLabels[g];
    const label =
      lang === "en"
        ? `${labelPair.en} / ${labelPair.vi}`
        : `${labelPair.vi} / ${labelPair.en}`;
    lines.push(`${GROUP_ICONS[g]} ${label.toUpperCase()} (${list.length})`);

    list.forEach((card, idx) => {
      const title = lang === "en" ? card.en : card.vi;
      const exposure = state.exposure[card.id];
      const exposureSuffix =
        exposure && g !== "skip"
          ? ` (${lang === "en" ? strings.exposureLabels[exposure].en : strings.exposureLabels[exposure].vi})`
          : "";
      const prefix = g === "pursue-now" ? `  ${idx + 1}.` : "  ·";
      lines.push(`${prefix} ${title}${exposureSuffix}`);
    });
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
