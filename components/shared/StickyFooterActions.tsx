"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

interface StickyFooterActionsProps {
  backHref?: string;
  continueHref?: string;
  continueDisabled?: boolean;
  continueLabel?: string;
  onContinueClick?: () => void;
  hint?: string;
}

export function StickyFooterActions({
  backHref,
  continueHref,
  continueDisabled = false,
  continueLabel,
  onContinueClick,
  hint,
}: StickyFooterActionsProps) {
  const t = useT();
  const label = continueLabel ?? t.common.continue;
  const continueBtn = (
    <Button
      size="lg"
      disabled={continueDisabled}
      onClick={onContinueClick}
      className="min-w-36"
    >
      {label}
      <ArrowRight />
    </Button>
  );

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 z-30 mt-6 border-t bg-background/95 backdrop-blur no-print",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <div className="container flex max-w-5xl items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          {backHref && (
            <Button asChild variant="ghost" size="lg">
              <Link href={backHref}>
                <ArrowLeft />
                {t.common.back}
              </Link>
            </Button>
          )}
          {hint && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {hint}
            </span>
          )}
        </div>
        {continueHref && !continueDisabled ? (
          <Button asChild size="lg" className="min-w-36">
            <Link href={continueHref}>
              {label}
              <ArrowRight />
            </Link>
          </Button>
        ) : (
          continueBtn
        )}
      </div>
      {hint && (
        <div className="container max-w-5xl pb-3 text-xs text-muted-foreground sm:hidden">
          {hint}
        </div>
      )}
    </div>
  );
}
