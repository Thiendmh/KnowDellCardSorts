"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCardSortStore } from "@/store/useCardSortStore";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { useT } from "@/i18n";

export function ChoiceList() {
  const t = useT();
  const choices = useCardSortStore((s) => s.choices);
  const addChoice = useCardSortStore((s) => s.addChoice);
  const removeChoice = useCardSortStore((s) => s.removeChoice);
  const renameChoice = useCardSortStore((s) => s.renameChoice);

  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");

  function onAdd() {
    const r = addChoice(newLabel);
    if (!r.ok) {
      if (r.error?.includes("trống") || r.error?.toLowerCase().includes("empty")) {
        toast.error(t.choices.labelEmpty);
      } else {
        toast.error(t.choices.maxReached);
      }
      return;
    }
    setNewLabel("");
  }

  function onSaveEdit() {
    if (!editingId) return;
    renameChoice(editingId, editingLabel);
    setEditingId(null);
    setEditingLabel("");
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">{t.choices.listHelp}</div>

      <div className="flex gap-2">
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder={t.choices.newChoicePlaceholder}
          maxLength={60}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd();
            }
          }}
        />
        <Button
          onClick={onAdd}
          disabled={choices.length >= 5 || !newLabel.trim()}
        >
          <Plus />
          {t.common.add}
        </Button>
      </div>

      <ul className="space-y-2">
        {choices.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-2 rounded-md border bg-card p-2"
          >
            {editingId === c.id ? (
              <>
                <Input
                  autoFocus
                  value={editingLabel}
                  onChange={(e) => setEditingLabel(e.target.value)}
                  maxLength={60}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSaveEdit();
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditingLabel("");
                    }
                  }}
                />
                <Button size="icon" variant="ghost" onClick={onSaveEdit}>
                  <Check />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingId(null);
                    setEditingLabel("");
                  }}
                >
                  <X />
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 truncate px-1 font-medium">
                  {c.label}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t.choices.rename}
                  onClick={() => {
                    setEditingId(c.id);
                    setEditingLabel(c.label);
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t.choices.remove}
                  onClick={() => removeChoice(c.id)}
                >
                  <Trash2 />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="text-xs text-muted-foreground">
        {choices.length} / 5 {t.choices.countSuffix}
        {choices.length < 2 && (
          <span className="ml-2 text-destructive">
            {t.choices.minRequired}
          </span>
        )}
      </div>
    </div>
  );
}
