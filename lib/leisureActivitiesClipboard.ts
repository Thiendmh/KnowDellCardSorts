import type { Card } from "@/types";
import type { Language } from "@/types";
import type {
  FrequencyLevel,
  LeisureActivitiesState,
  LeisureGroup,
} from "@/types/leisureActivities";
import { LEISURE_GROUPS_ORDERED } from "@/types/leisureActivities";
import { groupLeisureActivities } from "@/lib/leisureActivitiesScoring";

const GROUP_ICONS: Record<LeisureGroup, string> = {
  priority: "🏆",
  "keep-active": "🔄",
  develop: "🌱",
  release: "⬜",
};

export interface ClipboardStrings {
  header: string;
  groupLabels: Record<LeisureGroup, { en: string; vi: string }>;
  frequencyLabels: Record<FrequencyLevel, { en: string; vi: string }>;
}

export function buildLeisureClipboardText(
  state: LeisureActivitiesState,
  cards: Card[],
  lang: Language,
  strings: ClipboardStrings,
): string {
  const grouped = groupLeisureActivities(state, cards);
  const lines: string[] = [];
  lines.push(strings.header);
  lines.push("=".repeat(strings.header.length));
  lines.push("");

  for (const g of LEISURE_GROUPS_ORDERED) {
    const list = grouped[g];
    const labelPair = strings.groupLabels[g];
    const label =
      lang === "en"
        ? `${labelPair.en} / ${labelPair.vi}`
        : `${labelPair.vi} / ${labelPair.en}`;
    lines.push(`${GROUP_ICONS[g]} ${label.toUpperCase()} (${list.length})`);

    list.forEach((card, idx) => {
      const title = lang === "en" ? card.en : card.vi;
      const freq = state.frequency[card.id];
      const frequencySuffix =
        freq && g !== "release"
          ? ` (${lang === "en" ? strings.frequencyLabels[freq].en : strings.frequencyLabels[freq].vi})`
          : "";
      const prefix = g === "priority" ? `  ${idx + 1}.` : "  ·";
      lines.push(`${prefix} ${title}${frequencySuffix}`);
    });
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
