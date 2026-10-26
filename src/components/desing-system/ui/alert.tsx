import type { ComponentProps } from "react";
import { cn } from "cn";

export function DsAlert({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & {
  variant?: "default" | "destructive" | "info";
}) {
  return (
    <div
      role="alert"
      className={cn(
        "ds-ui-alert",
        variant === "destructive" && "ds-ui-alert--destructive",
        variant === "info" && "ds-ui-alert--info",
        className,
      )}
      {...props}
    />
  );
}

export function DsAlertTitle({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("ds-ui-alert-title", className)} {...props} />;
}

export function DsAlertDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("ds-ui-alert-description", className)} {...props} />;
}
