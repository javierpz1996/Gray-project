import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const dsBadgeVariants = cva("ds-ui-badge", {
  variants: {
    variant: {
      default: "ds-ui-badge--default",
      subtle: "ds-ui-badge--subtle",
      outline: "ds-ui-badge--outline",
      accent: "ds-ui-badge--accent",
      blue: "ds-ui-badge--blue",
      orange: "ds-ui-badge--orange",
      yellow: "ds-ui-badge--yellow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function DsBadge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof dsBadgeVariants>) {
  return (
    <span className={cn(dsBadgeVariants({ variant }), className)} {...props} />
  );
}
