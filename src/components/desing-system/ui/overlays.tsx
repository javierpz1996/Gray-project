"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "cn";
import type { ComponentProps } from "react";

export {
  Dialog as DsDialog,
  DialogTrigger as DsDialogTrigger,
  DialogHeader as DsDialogHeader,
  DialogTitle as DsDialogTitle,
  DialogDescription as DsDialogDescription,
  DialogFooter as DsDialogFooter,
  DropdownMenu as DsDropdownMenu,
  DropdownMenuTrigger as DsDropdownMenuTrigger,
  DropdownMenuContent as DsDropdownMenuContent,
  DropdownMenuLabel as DsDropdownMenuLabel,
  DropdownMenuItem as DsDropdownMenuItem,
  DropdownMenuSeparator as DsDropdownMenuSeparator,
  DropdownMenuCheckboxItem as DsDropdownMenuCheckboxItem,
  Popover as DsPopover,
  PopoverTrigger as DsPopoverTrigger,
  PopoverHeader as DsPopoverHeader,
  PopoverTitle as DsPopoverTitle,
  PopoverDescription as DsPopoverDescription,
  Sheet as DsSheet,
  SheetTrigger as DsSheetTrigger,
  SheetHeader as DsSheetHeader,
  SheetTitle as DsSheetTitle,
  SheetDescription as DsSheetDescription,
  Tooltip as DsTooltip,
  TooltipTrigger as DsTooltipTrigger,
  Accordion as DsAccordion,
  AccordionItem as DsAccordionItem,
  AccordionTrigger as DsAccordionTrigger,
  AccordionContent as DsAccordionContent,
  Avatar as DsAvatar,
  AvatarImage as DsAvatarImage,
  AvatarFallback as DsAvatarFallback,
};

export function DsDialogContent({
  className,
  ...props
}: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn("ds-ui-dialog-content", className)}
      {...props}
    />
  );
}

export function DsPopoverContent({
  className,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      className={cn("ds-ui-popover-content", className)}
      {...props}
    />
  );
}

export function DsSheetContent({
  className,
  ...props
}: ComponentProps<typeof SheetContent>) {
  return (
    <SheetContent
      className={cn("ds-ui-sheet-content", className)}
      {...props}
    />
  );
}

export function DsTooltipContent({
  className,
  ...props
}: ComponentProps<typeof TooltipContent>) {
  return (
    <TooltipContent
      className={cn("ds-ui-tooltip-content", className)}
      {...props}
    />
  );
}

export function DsProgress({
  className,
  ...props
}: ComponentProps<typeof Progress>) {
  return <Progress className={cn("ds-ui-progress", className)} {...props} />;
}

export function DsSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return <Separator className={cn("ds-ui-separator", className)} {...props} />;
}
