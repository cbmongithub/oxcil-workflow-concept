import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const PAGE_CONTAINER_SIZES = {
  default: "max-w-350",
  medium: "max-w-250",
  narrow: "max-w-200",
} as const;

type PageContainerSize = keyof typeof PAGE_CONTAINER_SIZES;

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: PageContainerSize;
};

export function PageContainer({
  size = "default",
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-12",
        PAGE_CONTAINER_SIZES[size],
        className
      )}
      {...props}
    />
  );
}
