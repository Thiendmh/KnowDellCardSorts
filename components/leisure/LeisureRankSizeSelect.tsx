"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RANK_SIZES, type RankSize } from "@/types/leisureActivities";
import { useT } from "@/i18n";

interface Props {
  value: RankSize;
  onChange: (n: RankSize) => void;
  eligibleCount: number;
}

export function LeisureRankSizeSelect({ value, onChange, eligibleCount }: Props) {
  const t = useT();
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-clay-silver">
        {t.leisure.rank.sizeSelectLabel}
      </label>
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(Number(v) as RankSize)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANK_SIZES.map((n) => {
            const disabled = n > eligibleCount;
            return (
              <SelectItem
                key={n}
                value={String(n)}
                disabled={disabled}
                title={
                  disabled ? t.leisure.rank.sizeDisabledHint(n) : undefined
                }
              >
                {t.leisure.rank.sizeOption(n)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
