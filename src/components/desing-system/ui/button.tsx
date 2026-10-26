"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";

const dsButtonVariants = cva("ds-ui-btn", {
  variants: {
    variant: {
      primary: "ds-ui-btn--primary",
      secondary: "ds-ui-btn--secondary",
      tertiary: "ds-ui-btn--tertiary",
      destructive: "ds-ui-btn--destructive",
      ghost: "ds-ui-btn--ghost",
    },
    size: {
      default: "",
      sm: "ds-ui-btn--sm",
      lg: "ds-ui-btn--lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export function DsButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof dsButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(dsButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
