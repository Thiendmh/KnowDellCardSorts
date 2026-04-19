import type { Card } from "@/types";
import type {
  EnjoymentLevel,
  MotivatedSkillsState,
  ProficiencyLevel,
  SkillGroup,
} from "@/types/motivatedSkills";
import { SKILL_GROUPS_ORDERED } from "@/types/motivatedSkills";

export function classifySkill(
  enjoyment: EnjoymentLevel,
  proficiency: ProficiencyLevel,
): SkillGroup {
  if (enjoyment === "like") return "neutral";
  const likesIt = enjoyment === "love" || enjoyment === "like-a-lot";
  const isSkilled = proficiency === "expert" || proficiency === "competent";
  if (likesIt && isSkilled) return "motivated";
  if (likesIt && !isSkilled) return "developmental";
  if (!likesIt && isSkilled) return "burnout";
  return "irrelevant";
}

export function groupSkillsByCategory(
  state: MotivatedSkillsState,
  cards: Card[],
): Record<SkillGroup, Card[]> {
  const result: Record<SkillGroup, Card[]> = {
    motivated: [],
    developmental: [],
    neutral: [],
    burnout: [],
    irrelevant: [],
  };
  for (const card of cards) {
    const enj = state.enjoymentBuckets[card.id];
    const prof = state.proficiency[card.id];
    if (!enj || enj === "unsorted" || !prof) continue;
    result[classifySkill(enj, prof)].push(card);
  }
  for (const g of SKILL_GROUPS_ORDERED) {
    result[g].sort((a, b) => a.order - b.order);
  }
  return result;
}
