import type { Card } from "@/types";
import type { Language } from "@/types";
import type {
  MotivatedSkillsState,
  SkillGroup,
} from "@/types/motivatedSkills";
import { SKILL_GROUPS_ORDERED } from "@/types/motivatedSkills";
import { getDict } from "@/i18n";
import { groupSkillsByCategory } from "./motivatedSkillsScoring";

export function buildMotivatedSkillsText(
  state: MotivatedSkillsState,
  cards: Card[],
  lang: Language,
): string {
  const dict = getDict(lang);
  const grouped = groupSkillsByCategory(state, cards);
  const lines: string[] = [];
  lines.push(dict.skills.clipboard.header);
  lines.push("=".repeat(dict.skills.clipboard.header.length));
  lines.push("");
  for (const g of SKILL_GROUPS_ORDERED) {
    const groupName = dict.skills.results.groups[g].name;
    const groupDesc = dict.skills.results.groups[g].description;
    const cardsInGroup = grouped[g];
    lines.push(`[${groupName}] (${cardsInGroup.length})`);
    lines.push(groupDesc);
    if (cardsInGroup.length === 0) {
      lines.push("  —");
    } else {
      for (const c of cardsInGroup) {
        const title = lang === "en" ? c.en : `${c.en} · ${c.vi}`;
        lines.push(`  - ${title}`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}
