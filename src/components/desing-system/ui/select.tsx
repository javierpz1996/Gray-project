"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";
import type { ComponentProps } from "react";

export function DsSelect(props: ComponentProps<typeof Select>) {
  return <Select {...props} />;
}

export function DsSelectTrigger({
  className,
  ...props
}: ComponentProps<typeof SelectTrigger>) {
  return (
    <SelectTrigger className={cn("ds-ui-select-trigger", className)} {...props} />
  );
}

export function DsSelectContent({
  className,
  ...props
}: ComponentProps<typeof SelectContent>) {
  return (
    <SelectContent className={cn("ds-ui-select-content", className)} {...props} />
  );
}

export { SelectItem, SelectValue };
