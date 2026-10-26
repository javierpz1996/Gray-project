import type { ComponentProps } from "react";
import { cn } from "cn";

export function DsLabel({
  className,
  ...props
}: ComponentProps<"label">) {
  return <label className={cn("ds-ui-label", className)} {...props} />;
}

export function DsInput({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cn("ds-ui-input", className)} {...props} />;
}

export function DsTextarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea className={cn("ds-ui-textarea", className)} {...props} />;
}

export function DsField({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("ds-ui-field", className)} {...props} />;
}

export function DsFieldHint({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("ds-ui-field-hint", className)} {...props} />;
}

export function DsFieldError({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("ds-ui-field-error", className)} role="alert" {...props} />
  );
}
