import { ArrowRightIcon, RocketIcon } from "@phosphor-icons/react/dist/ssr";
import type { HTMLAttributes } from "react";

import { InViewOnce } from "@/components/effects/in-view-once";
import { PageContainer } from "@/components/layout/page-container";
import { SectionShell } from "@/components/layout/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  getStaggerDelay,
  getTransitionDelayStyle,
  MOTION_REVEAL_CLASS,
  MOTION_REVEAL_FAST_CLASS,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

function BrandDotGridOverlay({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-oxcil-brand-dot-grid absolute inset-0 opacity-10", className)}
      {...props}
    />
  );
}

type SquareParticle = {
  left: number;
  top: number;
  size: "sm" | "md";
};

const CTA_SQUARE_PARTICLES: SquareParticle[] = [
  { left: 8, top: 16, size: "sm" },
  { left: 15, top: 30, size: "md" },
  { left: 22, top: 58, size: "sm" },
  { left: 31, top: 22, size: "md" },
  { left: 38, top: 48, size: "sm" },
  { left: 46, top: 18, size: "md" },
  { left: 54, top: 62, size: "sm" },
  { left: 61, top: 36, size: "md" },
  { left: 69, top: 20, size: "sm" },
  { left: 77, top: 50, size: "md" },
  { left: 85, top: 26, size: "sm" },
  { left: 92, top: 60, size: "md" },
];

const PARTICLE_SIZE_CLASS: Record<SquareParticle["size"], string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
};

const PARTICLE_REVEAL_STEP_MS = 40;
const PARTICLE_REVEAL_BASE_MS = 0;

function SquareParticleField({
  particles = CTA_SQUARE_PARTICLES,
  className,
  particleClassName,
}: {
  particles?: SquareParticle[];
  className?: string;
  particleClassName?: string;
}) {
  return (
    <div
      id="cta"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${particle.size}`}
          className={cn(
            "bg-oxcil-brand-400/30 absolute translate-y-0 rounded-[3px] opacity-100 will-change-transform",
            PARTICLE_SIZE_CLASS[particle.size],
            particleClassName
          )}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${getStaggerDelay(
              index,
              PARTICLE_REVEAL_STEP_MS,
              PARTICLE_REVEAL_BASE_MS
            )}ms`,
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <SectionShell divider clip>
      <PageContainer>
        <InViewOnce
          className="border-oxcil-brand-800/50 from-oxcil-brand-950 via-oxcil-neutral-950 to-oxcil-neutral-950 shadow-oxcil-cta relative overflow-hidden rounded-3xl border bg-linear-to-br p-8 text-center lg:p-16"
          hiddenClassName="scale-90 opacity-0"
          visibleClassName="scale-100 opacity-100"
          style={{ transitionProperty: "opacity, transform, box-shadow" }}
        >
          <BrandDotGridOverlay />
          <SquareParticleField particles={CTA_SQUARE_PARTICLES} />

          <div className="relative z-10">
            <InViewOnce
              className="mb-6"
              delay={300}
              hiddenClassName="-translate-y-4 scale-90 opacity-0"
              visibleClassName="translate-y-0 scale-100 opacity-100"
            >
              <Badge variant="brand" className="gap-2 px-4 py-2 text-sm font-medium">
                <RocketIcon weight="duotone" className="h-4 w-4" />
                Internal alpha scope
              </Badge>
            </InViewOnce>

            <InViewOnce
              as="h2"
              className="text-oxcil-neutral-100 mb-4 text-3xl font-bold text-balance md:text-5xl"
              hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-8 opacity-0 blur-sm`}
              visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100 blur-0`}
              style={getTransitionDelayStyle(400)}
            >
              Build the operator loop first
            </InViewOnce>

            <InViewOnce
              as="p"
              className="text-oxcil-neutral-400 mx-auto mb-8 max-w-xl text-lg"
              hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-8 opacity-0`}
              visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100`}
              style={getTransitionDelayStyle(500)}
            >
              Keep the V1 sharp: one niche, visible execution, approval gates, reusable
              workflows.
            </InViewOnce>

            <InViewOnce
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              hiddenClassName={`${MOTION_REVEAL_CLASS} opacity-0`}
              visibleClassName={`${MOTION_REVEAL_CLASS} opacity-100`}
              style={getTransitionDelayStyle(600)}
            >
              <InViewOnce
                hiddenClassName={`${MOTION_REVEAL_FAST_CLASS} -translate-x-8 opacity-0`}
                visibleClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-0 opacity-100`}
                style={getTransitionDelayStyle(700)}
              >
                <Button variant="brand" size="lg" shape="pill">
                  Request access
                  <ArrowRightIcon weight="bold" className="h-4 w-4" />
                </Button>
              </InViewOnce>
              <InViewOnce
                hiddenClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-8 opacity-0`}
                visibleClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-0 opacity-100`}
                style={getTransitionDelayStyle(700)}
              >
                <Button size="lg" variant="ghost" shape="pill" className="h-12 px-8">
                  Schedule a demo
                </Button>
              </InViewOnce>
            </InViewOnce>

            <InViewOnce
              as="p"
              className="text-oxcil-neutral-500 mt-6 text-sm"
              hiddenClassName={`${MOTION_REVEAL_CLASS} opacity-0`}
              visibleClassName={`${MOTION_REVEAL_CLASS} opacity-100`}
              style={getTransitionDelayStyle(800)}
            >
              Prompt to plan · Step streaming · Artifacts · Approval-safe execution
            </InViewOnce>
          </div>
        </InViewOnce>
      </PageContainer>
    </SectionShell>
  );
}
