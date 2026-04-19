import { careerValueCards } from "@/data/careerValueCards";
import { computeChoiceStats } from "@/lib/scoring";
import { generateInsights } from "@/lib/insights";
import { getDict } from "@/i18n";
import type { AppState, Language } from "@/types";

export function buildResultsText(state: AppState, lang: Language): string {
  const dict = getDict(lang);
  const cardMap = new Map(careerValueCards.map((c) => [c.id, c]));
  const lines: string[] = [];

  lines.push(dict.clipboard.header);
  lines.push("========================");
  lines.push("");
  lines.push(dict.clipboard.topSection);
  lines.push("-------------------");
  state.rankedTop8.forEach((id, i) => {
    const c = cardMap.get(id);
    if (!c) return;
    const desc = lang === "en" ? c.descriptionEn : c.shortDescription;
    lines.push(`${i + 1}. ${c.en} / ${c.vi}`);
    lines.push(`   ${desc}`);
  });
  lines.push("");

  if (state.choices.length > 0) {
    lines.push(dict.clipboard.comparisonSection);
    lines.push("----------------");
    lines.push(
      dict.clipboard.cols.choice.padEnd(32) +
        dict.clipboard.cols.total.padEnd(8) +
        dict.clipboard.cols.support.padEnd(10) +
        dict.clipboard.cols.unknown.padEnd(10) +
        dict.clipboard.cols.conflict,
    );
    for (const choice of state.choices) {
      const s = computeChoiceStats(state.matrix, choice.id, state.rankedTop8);
      lines.push(
        choice.label.slice(0, 30).padEnd(32) +
          String(s.totalScore).padEnd(8) +
          String(s.supportCount).padEnd(10) +
          String(s.unknownCount).padEnd(10) +
          String(s.conflictCount),
      );
    }
    lines.push("");

    const insights = generateInsights(
      state.choices.map((choice) => ({
        choice,
        stats: computeChoiceStats(state.matrix, choice.id, state.rankedTop8),
      })),
      lang,
    );
    if (insights.length > 0) {
      lines.push(dict.clipboard.insightsSection);
      lines.push("--------");
      insights.forEach((i, idx) => lines.push(`${idx + 1}. ${i.text}`));
      lines.push("");
    }
  }

  return lines.join("\n");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
