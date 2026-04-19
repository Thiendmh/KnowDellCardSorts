import type { Choice, ChoiceStats, Language } from "@/types";
import { getDict } from "@/i18n";

export interface Insight {
  tone: "positive" | "info" | "warning";
  text: string;
}

export function generateInsights(
  stats: { choice: Choice; stats: ChoiceStats }[],
  lang: Language,
): Insight[] {
  if (stats.length === 0) return [];

  const dict = getDict(lang);
  const byScore = [...stats].sort(
    (a, b) => b.stats.totalScore - a.stats.totalScore,
  );
  const byUnknown = [...stats].sort(
    (a, b) => b.stats.unknownCount - a.stats.unknownCount,
  );
  const byConflict = [...stats].sort(
    (a, b) => b.stats.conflictCount - a.stats.conflictCount,
  );

  const insights: Insight[] = [];

  if (byScore[0]) {
    insights.push({
      tone: "positive",
      text: dict.insights.highestScore(
        byScore[0].choice.label,
        byScore[0].stats.totalScore,
      ),
    });
  }

  if (byUnknown[0] && byUnknown[0].stats.unknownCount > 0) {
    insights.push({
      tone: "info",
      text: dict.insights.mostUnknown(
        byUnknown[0].choice.label,
        byUnknown[0].stats.unknownCount,
      ),
    });
  }

  if (byConflict[0] && byConflict[0].stats.conflictCount > 0) {
    insights.push({
      tone: "warning",
      text: dict.insights.mostConflict(
        byConflict[0].choice.label,
        byConflict[0].stats.conflictCount,
      ),
    });
  }

  return insights;
}
