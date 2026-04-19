import type { ChoiceStats, Matrix } from "@/types";

export function computeChoiceStats(
  matrix: Matrix,
  choiceId: string,
  rankedTop8: string[],
): ChoiceStats {
  let totalScore = 0;
  let unknownCount = 0;
  let supportCount = 0;
  let conflictCount = 0;

  for (const cardId of rankedTop8) {
    const v = matrix[cardId]?.[choiceId];
    if (v === "unknown") {
      unknownCount++;
    } else if (typeof v === "number") {
      totalScore += v;
      if (v === 3 || v === 2) supportCount++;
      if (v === -1) conflictCount++;
    }
  }
  return { totalScore, unknownCount, supportCount, conflictCount };
}

export function isMatrixComplete(
  matrix: Matrix,
  rankedTop8: string[],
  choiceIds: string[],
): boolean {
  if (rankedTop8.length !== 8) return false;
  if (choiceIds.length < 2) return false;
  for (const cardId of rankedTop8) {
    for (const choiceId of choiceIds) {
      if (matrix[cardId]?.[choiceId] === undefined) return false;
    }
  }
  return true;
}
