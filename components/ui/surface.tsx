import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const surfaceVariants = cva("relative overflow-hidden border", {
  variants: {
    variant: {
      plain: "",
      glass:
        "rounded-2xl border-[color:var(--surface-glass-border)] bg-[var(--surface-glass-bg)] [box-shadow:var(--bento-shadow)] backdrop-blur-[2px]",
      panel:
        "rounded-2xl border-[color:var(--surface-panel-border)] bg-[var(--surface-panel-bg)] [box-shadow:var(--bento-shadow)]",
      panelSoft:
        "rounded-2xl border-[color:var(--surface-panel-border)] bg-[var(--surface-panel-soft-bg)] [box-shadow:var(--bento-shadow)]",
      panelSoftMuted:
        "rounded-[28px] border-[color:var(--surface-panel-soft-muted-border)] bg-[var(--surface-panel-soft-muted-bg)]",
      panelSoftPreview:
        "rounded-[28px] border-[color:var(--surface-panel-soft-preview-border)] bg-[var(--surface-panel-soft-preview-bg)] [box-shadow:var(--surface-panel-soft-preview-shadow)]",
      panelDeep:
        "rounded-[28px] border-[color:var(--surface-panel-deep-border)] bg-[var(--surface-panel-deep-bg)]",
      panelDeepActive:
        "rounded-[28px] border-[color:var(--brand-outline-border)] bg-[var(--surface-panel-deep-active-bg)] [box-shadow:var(--surface-panel-deep-active-shadow)]",
      code: "rounded-xl border-[color:var(--surface-panel-border)] bg-[var(--surface-panel-bg)]",
      feature:
        "rounded-[28px] border-[color:var(--surface-feature-border)] [background-image:var(--surface-feature-bg)] [box-shadow:var(--surface-feature-shadow)]",
    },
    interactive: {
      true: "transition-colors duration-300 hover:border-[color:var(--surface-interactive-hover-border)]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "glass",
    interactive: false,
  },
});

function Surface({
  className,
  variant,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof surfaceVariants>) {
  return (
    <div
      data-slot="surface"
      className={cn(surfaceVariants({ variant, interactive }), className)}
      {...props}
    />
  );
}

export { Surface, surfaceVariants };
