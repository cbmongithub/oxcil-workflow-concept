import type { Transition, Variants } from "motion/react";
import type { CSSProperties } from "react";

export const MOTION_EASE_STANDARD = [0.22, 1, 0.36, 1] as const;
export const MOTION_EASE_SOFT = [0.16, 1, 0.3, 1] as const;

export const MOTION_TRANSITION_FAST = {
  duration: 0.24,
  ease: MOTION_EASE_STANDARD,
} satisfies Transition;

export const MOTION_TRANSITION_BASE = {
  duration: 0.42,
  ease: MOTION_EASE_STANDARD,
} satisfies Transition;

export const MOTION_TRANSITION_SOFT = {
  duration: 0.68,
  ease: MOTION_EASE_SOFT,
} satisfies Transition;

export const MOTION_VIEWPORT_ONCE = {
  once: true,
  margin: "-96px",
} as const;

export const MOTION_REVEAL_CLASS = "transition-all duration-700 ease-out";
export const MOTION_REVEAL_FAST_CLASS = "transition-all duration-500";
export const MOTION_COLLAPSE_CLASS = "transition-all duration-300 ease-out";

export const MOTION_SECTION_HIDDEN_CLASS = "translate-y-12 opacity-0 blur-sm";
export const MOTION_SECTION_VISIBLE_CLASS = "translate-y-0 opacity-100 blur-0";

export const MOTION_REVEAL_VISIBLE_CLASS = "translate-x-0 translate-y-0 opacity-100";
export const MOTION_REVEAL_SCALE_VISIBLE_CLASS = "translate-y-0 scale-100 opacity-100";
export const MOTION_REVEAL_POP_VISIBLE_CLASS = "opacity-100 scale-100";
export const MOTION_REVEAL_POP_HIDDEN_CLASS = "opacity-0 scale-0";

export const MOTION_STAGGER_TIGHT_MS = 50;
export const MOTION_STAGGER_BASE_MS = 60;
export const MOTION_STAGGER_COMFORTABLE_MS = 80;
export const MOTION_SECTION_DELAY_MS = 200;

export function getStaggerDelay(index: number, stepMs: number, baseMs = 0) {
  return baseMs + index * stepMs;
}

export function getTransitionDelayStyle(
  delayMs: number
): Pick<CSSProperties, "transitionDelay"> {
  return {
    transitionDelay: `${delayMs}ms`,
  };
}

export const NAVBAR_VARIANTS = {
  initial: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: MOTION_TRANSITION_BASE,
  },
} satisfies Variants;

export const NAVBAR_CONTENT_VARIANTS = {
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    pointerEvents: "auto",
    transition: MOTION_TRANSITION_BASE,
  },
  hidden: {
    opacity: 0,
    y: -6,
    filter: "blur(6px)",
    pointerEvents: "none",
    transition: MOTION_TRANSITION_FAST,
  },
} satisfies Variants;

export const FLOATING_CTA_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    pointerEvents: "none",
    transition: MOTION_TRANSITION_FAST,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto",
    transition: MOTION_TRANSITION_BASE,
  },
} satisfies Variants;

export const HERO_CONTENT_CONTAINER_VARIANTS = {
  initial: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
} satisfies Variants;

export const HERO_CONTENT_ITEM_VARIANTS = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: MOTION_TRANSITION_SOFT,
  },
} satisfies Variants;

export const HERO_TERMINAL_VARIANTS = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...MOTION_TRANSITION_SOFT,
      delay: 0.24,
    },
  },
} satisfies Variants;
