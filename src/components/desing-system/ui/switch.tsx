"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "cn";
import type { ComponentProps } from "react";

export function DsSwitch({
  className,
  ...props
}: ComponentProps<typeof Switch>) {
  return <Switch className={cn("ds-ui-switch", className)} {...props} />;
}
