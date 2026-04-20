"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RANK_SIZES, type RankSize } from "@/types/occupationalInterest";
import { useT } from "@/i18n";

interface Props {
  value: RankSize;
  onChange: (n: RankSize) => void;
  veryHighCount: number;
}

export function RankSizeSelect({ value, onChange, veryHighCount }: Props) {
  const t = useT();
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-muted-foreground">
        {t.interests.rank.sizeSelectLabel}
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
            const disabled = n > veryHighCount;
            return (
              <SelectItem
                key={n}
                value={String(n)}
                disabled={disabled}
                title={
                  disabled ? t.interests.rank.sizeDisabledHint(n) : undefined
                }
              >
                {t.interests.rank.sizeOption(n)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
