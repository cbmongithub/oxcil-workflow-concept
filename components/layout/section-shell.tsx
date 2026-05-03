import { type ComponentPropsWithoutRef,forwardRef } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = ComponentPropsWithoutRef<"section"> & {
  divider?: boolean;
  spacing?: "section" | "compact" | "none";
  clip?: boolean;
};

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    { divider = false, spacing = "section", clip = false, className, ...props },
    ref
  ) {
    return (
      <section
        ref={ref}
        className={cn(
          clip && "overflow-hidden",
          divider && "border-t border-(--section-divider)",
          spacing === "section" && "py-section",
          spacing === "compact" && "py-16",
          className
        )}
        {...props}
      />
    );
  }
);
