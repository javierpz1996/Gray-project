"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "cn";
import type { ComponentProps } from "react";

export function DsCheckbox({
  className,
  ...props
}: ComponentProps<typeof Checkbox>) {
  return <Checkbox className={cn("ds-ui-checkbox", className)} {...props} />;
}
