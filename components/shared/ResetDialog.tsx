"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useCardSortStore } from "@/store/useCardSortStore";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n";

interface ResetDialogProps {
  // Trigger-based (legacy) usage
  trigger?: React.ReactNode;
  // Controlled usage (new) — when provided, component is fully controlled
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  // Optional custom strings (used in controlled mode)
  title?: string;
  body?: string;
  confirmLabel?: string;
}

export function ResetDialog({
  trigger,
  open,
  onOpenChange,
  onConfirm,
  title,
  body,
  confirmLabel,
}: ResetDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const resetAll = useCardSortStore((s) => s.resetAll);
  const router = useRouter();
  const t = useT();

  const isControlled =
    open !== undefined && onOpenChange !== undefined && onConfirm !== undefined;

  const dialogOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  function handleConfirm() {
    if (isControlled) {
      if (onConfirm) onConfirm();
    } else {
      resetAll();
      setInternalOpen(false);
      router.push("/");
    }
  }

  const resolvedTitle = title ?? t.reset.title;
  const resolvedBody = body ?? t.reset.body;
  const resolvedConfirm = confirmLabel ?? t.reset.confirm;

  if (isControlled) {
    return (
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{resolvedTitle}</DialogTitle>
            <DialogDescription>{resolvedBody}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => handleOpenChange(false)}>
              {t.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              {resolvedConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">
            <RotateCcw />
            {t.reset.button}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>{resolvedBody}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            {t.common.cancel}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {resolvedConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
