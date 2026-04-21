"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter",
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
    cta: "Join alpha",
    highlighted: false,
  },
  {
    name: "Pro",
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
    cta: "Request pilot",
    highlighted: true,
  },
  {
    name: "Enterprise",
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
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
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
    <section
      id="pricing"
      ref={ref}
      className="border-oxcil-elevated-900 overflow-hidden border-t py-24"
    >
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${isVisible ? "blur-0 translate-y-0 opacity-100" : "translate-y-12 opacity-0 blur-sm"}`}
        >
          <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold text-balance md:text-4xl">
            Launch packaging stays narrow
          </h2>
          <p className="text-oxcil-elevated-400 mt-4 text-lg">
            The commercial model should follow validated workflows, not generic seats too
            early.
          </p>
        </div>

        <div className="grid items-end gap-6 md:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : `translate-y-24 scale-90 opacity-0`
              } ${
                plan.highlighted
                  ? "border-oxcil-accent-700 from-oxcil-accent-950 to-oxcil-elevated-950 shadow-oxcil-accent-700 bg-linear-to-b shadow-[0_0_60px_-20px] md:-translate-y-4"
                  : "border-oxcil-elevated-800 bg-oxcil-elevated-950"
              }`}
              style={{
                transitionDelay: `${i === 1 ? 100 : i === 0 ? 200 : 300}ms`,
                boxShadow: plan.highlighted ? undefined : "var(--bento-shadow)",
              }}
            >
              {plan.highlighted && (
                <div
                  className={`bg-oxcil-accent-400 text-oxcil-accent-950 absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-500 ${
                    isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <LightningIcon weight="fill" className="h-3 w-3" />
                  Most popular
                </div>
              )}

              <div className="p-6 lg:p-8">
                <h3 className="text-oxcil-elevated-100 text-lg font-semibold">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-oxcil-elevated-100 text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-oxcil-elevated-500">{plan.period}</span>
                </div>
                <p className="text-oxcil-elevated-400 mt-2 text-sm">{plan.description}</p>

                <Button
                  className={`mt-6 h-11 w-full rounded-full transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-oxcil-accent-400 text-oxcil-accent-950 hover:bg-oxcil-accent-300 hover:shadow-oxcil-accent-400 hover:shadow-[0_0_20px_-5px]"
                      : "bg-oxcil-elevated-800 text-oxcil-elevated-200 hover:bg-oxcil-elevated-700"
                  }`}
                >
                  {plan.cta}
                </Button>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm transition-all duration-500 ${
                        featuresVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${fi * 50}ms` }}
                    >
                      <CheckIcon
                        weight="bold"
                        className={`h-5 w-5 shrink-0 ${plan.highlighted ? "text-oxcil-accent-400" : "text-oxcil-elevated-500"}`}
                      />
                      <span className="text-oxcil-elevated-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
