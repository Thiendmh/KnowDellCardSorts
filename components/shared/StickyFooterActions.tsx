"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const continueStyles = {
    backgroundColor: "var(--deck-color, #078a52)",
    color: "var(--deck-text-color, #ffffff)",
  };

  const continueClasses =
    "clay-btn inline-flex min-w-36 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-clay transition-colors disabled:cursor-not-allowed disabled:opacity-45";

  const continueBtn = (
    <button
      type="button"
      disabled={continueDisabled}
      onClick={onContinueClick}
      className={continueClasses}
      style={continueDisabled ? undefined : continueStyles}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 mt-6 border-t border-clay-oat-light bg-clay-cream/95 backdrop-blur no-print pb-[env(safe-area-inset-bottom)]">
      <div className="container flex max-w-5xl items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="clay-btn inline-flex items-center gap-1.5 rounded border border-transparent px-3 py-2 text-sm font-medium text-clay-charcoal hover:border-clay-oat hover:text-clay-black"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.common.back}
            </Link>
          )}
          {hint && (
            <span className="hidden text-xs text-clay-silver sm:inline">{hint}</span>
          )}
        </div>

        {continueHref && !continueDisabled ? (
          <Link href={continueHref} className={continueClasses} style={continueStyles}>
            {label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          continueBtn
        )}
      </div>

      {hint && (
        <div className="container max-w-5xl pb-3 text-xs text-clay-silver sm:hidden">
          {hint}
        </div>
      )}
    </div>
  );
}
