"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr";

import { PageContainer } from "@/components/layout/page-container";
import { SectionIntro } from "@/components/layout/section-intro";
import { SectionShell } from "@/components/layout/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

import {
  getStaggerDelay,
  getTransitionDelayStyle,
  MOTION_REVEAL_CLASS,
  MOTION_REVEAL_FAST_CLASS,
  MOTION_SECTION_HIDDEN_CLASS,
  MOTION_SECTION_VISIBLE_CLASS,
  MOTION_STAGGER_TIGHT_MS,
} from "@/lib/motion";

const PLANS = [
  {
    name: "Starter",
    label: "Foundation",
    price: "Alpha",
    period: "internal",
    description: "For validating the core operator loop",
    features: [
      "One operator workspace",
      "Manual workflow triggers",
      "Basic run history",
      "Plan and step streaming",
      "Screenshot artifacts",
    ],
    cta: "Select Alpha",
    highlighted: false,
  },
  {
    name: "Pro",
    label: "Most popular",
    price: "V1",
    period: "pilot",
    description: "For one niche workflow pack",
    features: [
      "3-5 workflow templates",
      "Saved workflows and reruns",
      "Approval Iconpoints",
      "Token and cost usage",
      "Basic scheduling",
      "Artifact downloads",
      "One browser fallback path",
    ],
    cta: "Select Pilot",
    highlighted: true,
  },
  {
    name: "Enterprise",
    label: "Custom rollout",
    price: "Custom",
    period: "",
    description: "For repeatable implementation packs",
    features: [
      "Custom workflow pack",
      "Connector mapping",
      "Credential and scope model",
      "Admin workflow studio",
      "Operational onboarding",
      "Run analytics",
      "Priority implementation support",
    ],
    cta: "Select Custom",
    highlighted: false,
  },
];

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setFeaturesVisible(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell id="pricing" ref={ref} divider clip>
      <PageContainer>
        <SectionIntro
          isVisible={isVisible}
          hiddenClassName={MOTION_SECTION_HIDDEN_CLASS}
          visibleClassName={MOTION_SECTION_VISIBLE_CLASS}
          eyebrow="Pricing"
          title="Launch packaging stays narrow"
          description="The commercial model should follow validated workflows, not generic seats too early."
        />

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => {
            const isPersistentlySelected = selectedPlan === plan.name;
            const isPreviewed = hoveredPlan === plan.name && !isPersistentlySelected;
            const isRecommended = plan.highlighted;

            return (
              <Surface
                key={plan.name}
                variant={
                  isPersistentlySelected
                    ? "feature"
                    : isPreviewed
                      ? "panelSoftPreview"
                      : "panelSoftMuted"
                }
                interactive={false}
                onClick={() => setSelectedPlan(plan.name)}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                onFocus={() => setHoveredPlan(plan.name)}
                onBlur={() => setHoveredPlan(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedPlan(plan.name);
                  }
                }}
                className={`relative flex h-full cursor-pointer flex-col border ${MOTION_REVEAL_CLASS} ${
                  isVisible
                    ? "translate-y-0 scale-100 opacity-100"
                    : `translate-y-24 scale-90 opacity-0`
                } hover:-translate-y-2`}
                style={getTransitionDelayStyle(i === 1 ? 100 : i === 0 ? 200 : 300)}
                tabIndex={0}
                role="button"
                aria-pressed={selectedPlan === plan.name}
              >
                <div className="flex h-full flex-col p-6 lg:p-8">
                  <div className="flex min-h-8 items-center justify-between gap-3">
                    <div
                      className={`${MOTION_REVEAL_FAST_CLASS} ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={getTransitionDelayStyle(500)}
                    >
                      <Badge
                        variant={isPersistentlySelected ? "brand" : "neutral"}
                        className="px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase transition-[background-color,border-color,color] duration-200"
                      >
                        {isRecommended && (
                          <LightningIcon weight="fill" className="h-3 w-3" />
                        )}
                        {plan.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-oxcil-neutral-100 text-xl font-semibold">
                      {plan.name}
                    </h3>
                    <p className="text-oxcil-neutral-400 mt-2 min-h-10 text-sm leading-6">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex min-h-12 items-end gap-2">
                      <span className="text-oxcil-neutral-100 text-4xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-oxcil-neutral-500 pb-1 text-sm">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant={isPersistentlySelected ? "brand" : "neutral"}
                    shape="pill"
                    className={`mt-8 h-11 w-full ${
                      isPreviewed && !isPersistentlySelected
                        ? "bg-[var(--pricing-preview-button-bg)] text-[var(--pricing-preview-button-foreground)] hover:bg-[var(--pricing-preview-button-bg-hover)]"
                        : ""
                    }`}
                  >
                    {isPersistentlySelected ? "Active plan" : plan.cta}
                  </Button>

                  <ul
                    className={`mt-8 flex-1 space-y-3 border-t pt-6 ${
                      isPersistentlySelected
                        ? "border-[color:var(--pricing-divider-selected)]"
                        : isPreviewed
                          ? "border-[color:var(--pricing-divider-preview)]"
                          : "border-[color:var(--pricing-divider-default)]"
                    }`}
                  >
                    {plan.features.map((feature, fi) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-3 text-sm ${MOTION_REVEAL_FAST_CLASS} ${
                          featuresVisible
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                        style={getTransitionDelayStyle(
                          getStaggerDelay(fi, MOTION_STAGGER_TIGHT_MS)
                        )}
                      >
                        <CheckIcon
                          weight="bold"
                          className={`h-5 w-5 shrink-0 ${
                            isPersistentlySelected
                              ? "text-oxcil-brand-400"
                              : isPreviewed
                                ? "text-oxcil-neutral-300"
                                : "text-oxcil-neutral-500"
                          }`}
                        />
                        <span className="text-oxcil-neutral-300 leading-6">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            );
          })}
        </div>
      </PageContainer>
    </SectionShell>
  );
}
