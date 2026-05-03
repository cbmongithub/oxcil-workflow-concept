import type { CSSProperties, HTMLAttributes } from "react";

import { getTransitionDelayStyle, MOTION_REVEAL_CLASS } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
  hiddenClassName?: string;
  visibleClassName?: string;
  delay?: number;
};

export function Reveal({
  isVisible,
  hiddenClassName = "translate-y-6 opacity-0",
  visibleClassName = "translate-y-0 opacity-100",
  delay,
  className,
  style,
  ...props
}: RevealProps) {
  const mergedStyle: CSSProperties | undefined =
    delay === undefined
      ? style
      : {
          ...getTransitionDelayStyle(delay),
          ...style,
        };

  return (
    <div
      className={cn(
        MOTION_REVEAL_CLASS,
        isVisible ? visibleClassName : hiddenClassName,
        className
      )}
      style={mergedStyle}
      {...props}
    />
  );
}
