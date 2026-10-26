import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

const cardVariants = {
  default: "",
  outline: "ds-ui-card--outline",
  elevated: "ds-ui-card--elevated",
  accent: "ds-ui-card--accent",
  wash: "ds-ui-card--wash",
} as const;

export function DsCard({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & {
  variant?: keyof typeof cardVariants;
}) {
  return (
    <div
      className={cn("ds-ui-card", cardVariants[variant], className)}
      {...props}
    />
  );
}

export function DsCardHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("ds-ui-card-header", className)} {...props} />;
}

export function DsCardTitle({
  className,
  ...props
}: ComponentProps<"h4">) {
  return <h4 className={cn("ds-ui-card-title", className)} {...props} />;
}

export function DsCardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("ds-ui-card-description", className)} {...props} />;
}

export function DsCardContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("ds-ui-card-content", className)} {...props} />;
}

export function DsCardFooter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("ds-ui-card-footer", className)}>{children}</div>
  );
}
