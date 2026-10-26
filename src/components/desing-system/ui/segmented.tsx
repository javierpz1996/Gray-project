"use client";

import { cn } from "cn";
import type { ReactNode } from "react";

export function DsSegmented({
  className,
  "aria-label": ariaLabel,
  children,
}: {
  className?: string;
  "aria-label": string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("ds-ui-segmented", className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export function DsSegment({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={cn("ds-ui-segment", selected && "is-selected")}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}
