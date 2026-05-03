"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import { getTransitionDelayStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";

type InViewOnceProps<T extends ElementType = "div"> = {
  as?: T;
  hiddenClassName?: string;
  visibleClassName?: string;
  delay?: number;
  threshold?: number;
} & Omit<HTMLAttributes<HTMLElement>, "style"> & {
    style?: CSSProperties;
  };

export function InViewOnce<T extends ElementType = "div">({
  as,
  hiddenClassName = "translate-y-6 opacity-0",
  visibleClassName = "translate-y-0 opacity-100",
  delay,
  threshold = 0.1,
  className,
  style,
  ...props
}: InViewOnceProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const mergedStyle: CSSProperties | undefined =
    delay === undefined
      ? style
      : {
          ...getTransitionDelayStyle(delay),
          ...style,
        };

  return (
    <Comp
      ref={ref}
      className={cn(
        isVisible ? visibleClassName : hiddenClassName,
        className
      )}
      style={mergedStyle}
      {...props}
    />
  );
}
