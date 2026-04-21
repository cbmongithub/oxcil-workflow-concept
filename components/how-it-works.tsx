"use client";

import { useEffect, useRef, useState } from "react";
import {
  GitBranchIcon,
  MagnifyingGlassIcon,
  RocketIcon,
} from "@phosphor-icons/react/dist/ssr";

const STEPS = [
  {
    icon: MagnifyingGlassIcon,
    number: "01",
    title: "Describe the work",
    description:
      "An operator asks for a business outcome in plain English, from lead summaries to appointment checks.",
  },
  {
    icon: GitBranchIcon,
    number: "02",
    title: "Resolve the workflow",
    description:
      "Oxcil selects or generates a structured workflow using business-action steps and required integrations.",
  },
  {
    icon: RocketIcon,
    number: "03",
    title: "Run with visibility",
    description:
      "Execution streams through plan, current step, evidence, approvals, artifacts, and final result.",
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
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
      STEPS.forEach((_, i) => {
        setTimeout(() => setActiveStep(i), 400 + i * 300);
      });
    }
  }, [isVisible]);

  return (
    <section
      id="workflow"
      ref={ref}
      className="border-oxcil-elevated-900 overflow-hidden border-t py-24"
    >
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${isVisible ? "blur-0 translate-y-0 opacity-100" : "translate-y-12 opacity-0 blur-sm"}`}
        >
          <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
            How it works
          </span>
          <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold text-balance md:text-4xl">
            Prompt, plan, run, result, reuse
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ease-out ${
                activeStep >= i
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-16 scale-95 opacity-0"
              }`}
            >
              {i < STEPS.length - 1 && (
                <div
                  className={`from-oxcil-accent-600 absolute top-10 left-[60%] hidden h-px origin-left bg-linear-to-r to-transparent transition-all duration-1000 ease-out md:block ${
                    activeStep > i ? "w-[80%] opacity-100" : "w-0 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                />
              )}

              <div className="flex flex-col items-start">
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`bg-oxcil-elevated-900 border-oxcil-elevated-800 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 ${
                      activeStep >= i
                        ? "border-oxcil-accent-700 shadow-oxcil-accent-600 shadow-[0_0_20px_-5px]"
                        : ""
                    }`}
                  >
                    <step.icon
                      weight="duotone"
                      className={`h-7 w-7 transition-colors duration-500 ${activeStep >= i ? "text-oxcil-accent-400" : "text-oxcil-elevated-600"}`}
                    />
                  </div>
                  <span
                    className={`text-5xl font-bold transition-all duration-500 ${
                      activeStep >= i
                        ? "text-oxcil-accent-800"
                        : "text-oxcil-elevated-800"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-oxcil-elevated-100 mb-2 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-oxcil-elevated-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
