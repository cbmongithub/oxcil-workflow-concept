"use client";

import { useEffect, useRef, useState } from "react";
import {
  GitBranchIcon,
  MagnifyingGlassIcon,
  RocketIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionIntro } from "@/components/layout/section-intro";
import { SectionShell } from "@/components/layout/section-shell";
import { IconTile } from "@/components/ui/icon-tile";
import { surfaceVariants } from "@/components/ui/surface";

import {
  MOTION_SECTION_HIDDEN_CLASS,
  MOTION_SECTION_VISIBLE_CLASS,
  MOTION_TRANSITION_BASE,
  MOTION_TRANSITION_FAST,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: MagnifyingGlassIcon,
    number: "01",
    title: "Describe work",
    description:
      "An operator asks for a business outcome in plain English, from lead summaries to appointment checks.",
  },
  {
    icon: GitBranchIcon,
    number: "02",
    title: "Generate workflow",
    description:
      "Oxcil selects or generates a structured workflow using business-action steps and required integrations.",
  },
  {
    icon: RocketIcon,
    number: "03",
    title: "Run chain",
    description:
      "Execution streams through plan, current step, evidence, approvals, artifacts, and final result.",
  },
];

const STEP_FOCUS_DURATION_MS = 3600;

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedStep, setRevealedStep] = useState(-1);
  const [focusedStep, setFocusedStep] = useState(0);
  const [focusProgress, setFocusProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeouts = STEPS.map((_, i) =>
        window.setTimeout(() => setRevealedStep(i), 320 + i * 220)
      );
      let frameId = 0;
      let cycleStart = performance.now();
      let currentStep = 0;

      setFocusedStep(0);
      setFocusProgress(0);

      const tick = (now: number) => {
        const elapsed = now - cycleStart;
        const progress = Math.min(elapsed / STEP_FOCUS_DURATION_MS, 1);
        setFocusProgress(progress);

        if (elapsed >= STEP_FOCUS_DURATION_MS) {
          currentStep = (currentStep + 1) % STEPS.length;
          setFocusedStep(currentStep);
          setFocusProgress(0);
          cycleStart = now;
        }

        frameId = window.requestAnimationFrame(tick);
      };

      frameId = window.requestAnimationFrame(tick);

      return () => {
        timeouts.forEach((timeout) => window.clearTimeout(timeout));
        window.cancelAnimationFrame(frameId);
      };
    }
  }, [isVisible]);

  return (
    <SectionShell id="how-it-works" ref={ref} divider clip>
      <PageContainer>
        <SectionIntro
          isVisible={isVisible}
          hiddenClassName={MOTION_SECTION_HIDDEN_CLASS}
          visibleClassName={MOTION_SECTION_VISIBLE_CLASS}
          eyebrow="How it works"
          title="Prompt, plan, run, result, reuse"
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.985 }
          }
          transition={{ ...MOTION_TRANSITION_BASE, delay: 0.18 }}
        >
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className={cn(
                  surfaceVariants({
                    variant: focusedStep === i ? "panelDeepActive" : "panelDeep",
                  }),
                  "relative px-6 py-8 md:px-8 md:py-10"
                )}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={
                  revealedStep >= i
                    ? { opacity: 1, y: focusedStep === i ? -4 : 0, scale: 1 }
                    : { opacity: 0, y: 36, scale: 0.96 }
                }
                transition={MOTION_TRANSITION_BASE}
              >
                {focusedStep === i && revealedStep >= i && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[28px] p-px"
                    style={{
                      background: `conic-gradient(from -90deg, rgba(92, 146, 255, 0.8) 0deg, rgba(92, 146, 255, 0.6) ${
                        focusProgress * 360
                      }deg, rgba(92, 146, 255, 0.08) ${
                        focusProgress * 360
                      }deg, rgba(92, 146, 255, 0.08) 360deg)`,
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={
                        revealedStep >= i
                          ? {
                              scale: focusedStep === i ? 1.03 : 1,
                              opacity: 1,
                            }
                          : { scale: 0.94, opacity: 0.78 }
                      }
                      transition={MOTION_TRANSITION_FAST}
                    >
                      <IconTile
                        variant={focusedStep === i ? "brand" : "neutral"}
                        size="lg"
                        shape="panel"
                        className={
                          focusedStep === i
                            ? "shadow-oxcil-focus border-(--brand-outline-border) ring-1 ring-(--brand-outline-border)"
                            : revealedStep >= i
                              ? ""
                              : "text-oxcil-neutral-600"
                        }
                      >
                        <step.icon weight="duotone" />
                      </IconTile>
                    </motion.div>
                    <div className="pt-1">
                      <div
                        className={`text-xs font-medium tracking-[0.24em] uppercase ${
                          focusedStep === i
                            ? "text-oxcil-brand-400"
                            : revealedStep >= i
                              ? "text-oxcil-neutral-500"
                              : "text-oxcil-neutral-600"
                        }`}
                      >
                        Step {step.number}
                      </div>
                      <h3 className="text-oxcil-neutral-100 mt-2 text-lg font-semibold tracking-tight md:text-xl xl:text-2xl">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-oxcil-neutral-400 mt-6 max-w-sm text-base leading-8">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </PageContainer>
    </SectionShell>
  );
}
