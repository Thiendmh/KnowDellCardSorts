"use client";

import { useMemo } from "react";
import { useCardSortStore } from "@/store/useCardSortStore";
import { careerValueCards } from "@/data/careerValueCards";
import { SUPPORT_OPTIONS, type SupportValue } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

export function SupportMatrix() {
  const t = useT();
  const rankedTop8 = useCardSortStore((s) => s.rankedTop8);
  const choices = useCardSortStore((s) => s.choices);
  const matrix = useCardSortStore((s) => s.matrix);
  const setCell = useCardSortStore((s) => s.setCell);

  const cardMap = useMemo(
    () => new Map(careerValueCards.map((c) => [c.id, c])),
    [],
  );

  if (choices.length < 2) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        {t.choices.emptyMatrix}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full border-collapse">
        <thead className="bg-muted/50">
          <tr>
            <th className="sticky left-0 z-10 min-w-[220px] bg-muted/50 p-3 text-left text-xs font-semibold uppercase tracking-wide">
              {t.choices.columnValue}
            </th>
            {choices.map((c) => (
              <th
                key={c.id}
                className="min-w-[140px] p-3 text-left text-xs font-semibold uppercase tracking-wide"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rankedTop8.map((cardId, idx) => {
            const card = cardMap.get(cardId);
            if (!card) return null;
            return (
              <tr key={cardId} className="border-t">
                <td className="sticky left-0 z-10 bg-background p-3 align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        idx < 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted",
                      )}
                    >
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight">
                        {card.en}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {card.vi}
                      </div>
                    </div>
                  </div>
                </td>
                {choices.map((choice) => {
                  const value = matrix[cardId]?.[choice.id];
                  return (
                    <td key={choice.id} className="p-2 align-top">
                      <Select
                        value={value === undefined ? undefined : String(value)}
                        onValueChange={(v) => {
                          const parsed: SupportValue =
                            v === "unknown" ? "unknown" : (Number(v) as SupportValue);
                          setCell(cardId, choice.id, parsed);
                        }}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-9",
                            value === undefined &&
                              "border-destructive/60 text-muted-foreground",
                          )}
                        >
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUPPORT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.display} value={String(opt.value)}>
                              <span className="font-mono">{opt.display}</span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {t.support[String(opt.value)]}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
