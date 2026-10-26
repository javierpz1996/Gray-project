"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";

const stickerButtonVariants = cva("ds-play-btn", {
  variants: {
    variant: {
      progress: "ds-play-btn--progress",
      outline: "ds-play-btn--outline",
    },
    size: {
      default: "",
      sm: "ds-play-btn--sm",
    },
  },
  defaultVariants: {
    variant: "progress",
    size: "default",
  },
});

export function DsStickerButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof stickerButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(stickerButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function DsStickerPill({
  className,
  active,
  ...props
}: ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn("ds-play-pill", active && "is-active", className)}
      {...props}
    />
  );
}

export function DsPlayWash({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("ds-play-wash", className)} {...props} />;
}

export function DsPlayBand({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("ds-play-band", className)} {...props} />;
}
