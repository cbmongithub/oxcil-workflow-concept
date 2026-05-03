import type { ComponentProps } from "react";

import { Reveal } from "@/components/effects/reveal";
import { SectionHeader } from "@/components/layout/section-header";

import { cn } from "@/lib/utils";

type SectionIntroProps = ComponentProps<typeof SectionHeader> & {
  isVisible: boolean;
  className?: string;
  delay?: number;
  hiddenClassName?: string;
  visibleClassName?: string;
};

export function SectionIntro({
  isVisible,
  className,
  delay,
  hiddenClassName,
  visibleClassName,
  ...props
}: SectionIntroProps) {
  return (
    <Reveal
      isVisible={isVisible}
      delay={delay}
      hiddenClassName={hiddenClassName}
      visibleClassName={visibleClassName}
      className={cn("mb-16", className)}
    >
      <SectionHeader {...props} />
    </Reveal>
  );
}
