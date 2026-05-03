import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center border transition-[background-color,border-color,color,box-shadow] duration-150 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "oxcil-brand-surface",
        neutral: "bg-oxcil-neutral-900 border-oxcil-neutral-800 text-oxcil-neutral-400",
        success: "bg-oxcil-success-950 border-oxcil-success-900 text-oxcil-success-400",
        warning: "bg-oxcil-warning-950 border-oxcil-warning-900 text-oxcil-warning-400",
        danger: "bg-oxcil-danger-950 border-oxcil-danger-900 text-oxcil-danger-400",
      },
      size: {
        xxs: "h-6 w-6 [&>svg]:size-4",
        xs: "h-8 w-8 [&>svg]:size-4",
        sm: "h-10 w-10 [&>svg]:size-5",
        md: "h-12 w-12 [&>svg]:size-6",
        lg: "h-14 w-14 [&>svg]:size-7",
      },
      shape: {
        soft: "rounded-lg",
        softer: "rounded-xl",
        panel: "rounded-2xl",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "sm",
      shape: "soft",
    },
  }
);

function IconTile({
  className,
  variant,
  size,
  shape,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof iconTileVariants>) {
  return (
    <div
      data-slot="icon-tile"
      className={cn(iconTileVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { IconTile, iconTileVariants };
