import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function SectionEyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-kicker text-oxcil-brand-400 font-medium tracking-wider uppercase",
        className
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-section-title text-oxcil-neutral-100 mt-stack-sm font-bold text-balance md:text-4xl",
        className
      )}
      {...props}
    />
  );
}

export function SectionDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-oxcil-neutral-400 mt-stack text-lg", className)} {...props} />
  );
}
