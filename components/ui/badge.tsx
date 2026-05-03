import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow,border-color,background-color] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        brand:
          "oxcil-brand-surface border-[color:var(--badge-brand-border)] bg-[var(--badge-brand-bg)] text-[var(--badge-brand-foreground)] [a&]:hover:bg-[var(--badge-brand-bg-hover)]",
        neutral:
          "border-oxcil-neutral-700 bg-oxcil-neutral-900 text-oxcil-neutral-300 [a&]:hover:bg-[var(--badge-neutral-bg-hover)]",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent",
        success: "border-success/35 bg-success/10 text-oxcil-success-400",
        warning: "border-warning/35 bg-warning/10 text-oxcil-warning-400",
        danger:
          "border-danger/35 bg-danger/10 text-oxcil-danger-400 focus-visible:ring-danger/20",
        info: "border-info/35 bg-info/10 text-oxcil-info-400",
        running: "border-running/35 bg-running/10 text-oxcil-brand-400",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
