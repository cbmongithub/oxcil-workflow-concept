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

import { InViewOnce } from "@/components/effects/in-view-once";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeader } from "@/components/layout/section-header";
import { SectionShell } from "@/components/layout/section-shell";
import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { Surface } from "@/components/ui/surface";

import { getTransitionDelayStyle, MOTION_REVEAL_CLASS } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
  const translateClass = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }[direction];

  return (
    <InViewOnce
      className={className}
      hiddenClassName={`${MOTION_REVEAL_CLASS} opacity-0 ${translateClass}`}
      visibleClassName={`${MOTION_REVEAL_CLASS} translate-x-0 translate-y-0 opacity-100`}
      style={getTransitionDelayStyle(delay)}
    >
      {children}
    </InViewOnce>
  );
}

type ProductGridCardProps = {
  children: React.ReactNode;
  className?: string;
};

function ProductGridCard({ children, className }: ProductGridCardProps) {
  return (
    <Surface variant="glass" interactive className={cn("group p-6", className)}>
      <div className="relative z-10">{children}</div>
    </Surface>
  );
}

export function ProductGrid() {
  return (
    <SectionShell id="product">
      <PageContainer>
        <AnimatedCard delay={0} direction="up">
          <SectionHeader
            eyebrow="Product"
            title="An operator console, not another chatbot"
            description="The product story maps cleanly to the V1 workflow loop."
            centered={false}
            className="mb-16"
          />
        </AnimatedCard>

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[180px] md:grid-cols-3 lg:auto-rows-[180px] lg:grid-cols-12">
          {/* Primary feature - tall left card */}
          <AnimatedCard
            delay={100}
            direction="left"
            className="min-h-70 md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile size="md" shape="softer">
                <LightningIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-4 text-lg font-semibold">
                Prompt to plan
              </h3>
              <p className="text-oxcil-neutral-400 mt-2 flex-1 text-sm leading-6">
                Intent resolves to a reusable workflow before execution begins.
              </p>
              <div className="mt-auto flex items-end gap-1 pt-6">
                {[47, 52, 43, 48, 51, 45, 49, 44, 50, 46].map((val, i) => (
                  <div
                    key={i}
                    className="bg-oxcil-brand-700 flex-1 rounded-t-lg"
                    style={{ height: `${val}px` }}
                  />
                ))}
              </div>
            </ProductGridCard>
          </AnimatedCard>

          {/* Top right - vertical wide */}
          <AnimatedCard
            delay={200}
            direction="up"
            className="min-h-40 md:col-span-1 lg:col-span-5 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile>
                <GlobeIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                API-first connectors
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                Official APIs lead, with browser automation as fallback.
              </p>
            </ProductGridCard>
          </AnimatedCard>

          {/* Top far right - square with accent */}
          <AnimatedCard
            delay={300}
            direction="right"
            className="hidden min-h-40 md:col-span-1 lg:col-span-3 lg:block lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-oxcil-brand-400 text-4xl font-bold">3-5</div>
              <div className="text-oxcil-neutral-500 mt-1 text-sm">Templates</div>
            </ProductGridCard>
          </AnimatedCard>

          {/* Middle row - medium card */}
          <AnimatedCard
            delay={400}
            direction="left"
            className="min-h-40 md:col-span-1 lg:col-span-3 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile>
                <ShieldCheckIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                Approval checkpoints
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                External actions pause for explicit human approval.
              </p>
            </ProductGridCard>
          </AnimatedCard>

          {/* Middle - larger with run badge */}
          <AnimatedCard
            delay={500}
            direction="up"
            className="min-h-40 md:col-span-2 lg:col-span-5 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <IconTile>
                  <CpuIcon weight="duotone" />
                </IconTile>
                <Badge variant="brand" className="tracking-wider uppercase">
                  RUN
                </Badge>
              </div>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                Structured run state
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                Plans, steps, logs, retries, and cost stay visible.
              </p>
            </ProductGridCard>
          </AnimatedCard>

          {/* Bottom section - spanning full width with 3 equal cards */}
          <AnimatedCard
            delay={600}
            direction="up"
            className="min-h-40 md:col-span-1 lg:col-span-4 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile>
                <ChartLineUpIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                Real-time observability
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                Step events and summaries build trust.
              </p>
            </ProductGridCard>
          </AnimatedCard>

          <AnimatedCard
            delay={700}
            direction="up"
            className="min-h-40 md:col-span-1 lg:col-span-4 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile>
                <GitBranchIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                Versioned workflows
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                Saved workflows can be rerun and versioned.
              </p>
            </ProductGridCard>
          </AnimatedCard>

          <AnimatedCard
            delay={800}
            direction="up"
            className="min-h-40 md:col-span-1 lg:col-span-4 lg:min-h-0"
          >
            <ProductGridCard className="flex h-full flex-col">
              <IconTile>
                <ArrowsOutCardinalIcon weight="duotone" />
              </IconTile>
              <h3 className="text-oxcil-neutral-100 mt-3 text-base font-semibold">
                Home services first
              </h3>
              <p className="text-oxcil-neutral-400 mt-1 text-sm leading-6">
                V1 starts with one high-value workflow.
              </p>
            </ProductGridCard>
          </AnimatedCard>
        </div>
      </PageContainer>
    </SectionShell>
  );
}
