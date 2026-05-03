import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusDotVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    variant: {
      running: "bg-running",
      brand: "bg-oxcil-brand-400",
      neutral: "bg-oxcil-neutral-500",
      success: "bg-oxcil-success-500",
    },
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-3 w-3",
    },
  },
  defaultVariants: {
    variant: "running",
    size: "xs",
  },
});

function StatusDot({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusDotVariants>) {
  return (
    <span
      aria-hidden="true"
      data-slot="status-dot"
      className={cn(statusDotVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { StatusDot, statusDotVariants };
