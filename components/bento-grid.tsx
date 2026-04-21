"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowsOutCardinalIcon,
  ChartLineUpIcon,
  CpuIcon,
  GitBranchIcon,
  GlobeIcon,
  LightningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";

import { BentoCard } from "./bento-card";

function AnimatedCard({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const translateClass = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${translateClass}`
      }`}
    >
      {children}
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="product" className="py-24">
      {/* Section header */}
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <AnimatedCard delay={0} direction="up">
          <div className="mb-16 max-w-2xl">
            <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
              Capabilities
            </span>
            <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold md:text-4xl">
              An operator console, not another chatbot
            </h2>
            <p className="text-oxcil-elevated-400 mt-4 text-lg">
              The theme stays technical, but the product story now maps to the V1 workflow
              loop.
            </p>
          </div>
        </AnimatedCard>

        {/* Staggered bento grid */}
        <div className="grid grid-cols-1 gap-4 md:auto-rows-[180px] md:grid-cols-12">
          {/* Primary feature - tall left card */}
          <AnimatedCard
            delay={100}
            direction="left"
            className="min-h-70 md:col-span-4 md:row-span-2 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-accent-900 flex h-12 w-12 items-center justify-center rounded-xl">
                <LightningIcon
                  weight="duotone"
                  className="text-oxcil-accent-400 h-6 w-6"
                />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-4 text-lg font-semibold">
                Prompt to plan
              </h3>
              <p className="text-oxcil-elevated-400 mt-2 flex-1 text-sm">
                User intent resolves to a reusable business-action workflow before
                execution begins.
              </p>
              <div className="mt-auto flex items-end gap-1 pt-6">
                {[47, 52, 43, 48, 51, 45, 49, 44, 50, 46].map((val, i) => (
                  <div
                    key={i}
                    className="bg-oxcil-accent-700 flex-1 rounded-t"
                    style={{ height: `${val}px` }}
                  />
                ))}
              </div>
            </BentoCard>
          </AnimatedCard>

          {/* Top right - vertical wide */}
          <AnimatedCard
            delay={200}
            direction="up"
            className="min-h-40 md:col-span-5 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                <GlobeIcon weight="duotone" className="text-oxcil-accent-400 h-5 w-5" />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                API-first connectors
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                Official APIs are preferred, with browser automation isolated as a
                fallback path.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Top far right - square with accent */}
          <AnimatedCard
            delay={300}
            direction="right"
            className="hidden min-h-40 md:col-span-3 md:block md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-oxcil-accent-400 text-4xl font-bold">3-5</div>
              <div className="text-oxcil-elevated-500 mt-1 text-sm">
                V1 workflow templates
              </div>
            </BentoCard>
          </AnimatedCard>

          {/* Middle row - medium card */}
          <AnimatedCard
            delay={400}
            direction="left"
            className="min-h-40 md:col-span-3 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                <ShieldCheckIcon
                  weight="duotone"
                  className="text-oxcil-accent-400 h-5 w-5"
                />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                Approval checkpoints
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                Destructive or external actions pause for explicit human approval.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Middle - larger with run badge */}
          <AnimatedCard
            delay={500}
            direction="up"
            className="min-h-40 md:col-span-5 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                  <CpuIcon weight="duotone" className="text-oxcil-accent-400 h-5 w-5" />
                </div>
                <span className="text-oxcil-accent-400 bg-oxcil-accent-950 border-oxcil-accent-800 rounded-full border px-2 py-0.5 text-xs font-medium tracking-wider uppercase">
                  RUN
                </span>
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                Structured run state
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                Plans, current steps, next steps, logs, retries, artifacts, tokens, cost,
                and elapsed time stay visible.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Bottom section - spanning full width with 3 equal cards */}
          <AnimatedCard
            delay={600}
            direction="up"
            className="min-h-40 md:col-span-4 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                <ChartLineUpIcon
                  weight="duotone"
                  className="text-oxcil-accent-400 h-5 w-5"
                />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                Real-time observability
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                Step events, screenshots, extracted values, and final summaries build
                trust during every run.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard
            delay={700}
            direction="up"
            className="min-h-40 md:col-span-4 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                <GitBranchIcon
                  weight="duotone"
                  className="text-oxcil-accent-400 h-5 w-5"
                />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                Versioned workflows
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                Generated workflows can be saved, rerun, scheduled, and evolved through
                versions.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard
            delay={800}
            direction="up"
            className="min-h-40 md:col-span-4 md:min-h-0"
          >
            <BentoCard className="flex h-full flex-col">
              <div className="bg-oxcil-elevated-800 flex h-10 w-10 items-center justify-center rounded-lg">
                <ArrowsOutCardinalIcon
                  weight="duotone"
                  className="text-oxcil-accent-400 h-5 w-5"
                />
              </div>
              <h3 className="text-oxcil-elevated-100 mt-3 text-base font-semibold">
                Home services first
              </h3>
              <p className="text-oxcil-elevated-400 mt-1 text-sm">
                V1 is scoped to high-value office workflows before generalizing into
                broader packs.
              </p>
            </BentoCard>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
