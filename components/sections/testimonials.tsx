import type { HTMLAttributes } from "react";

import { InViewOnce } from "@/components/effects/in-view-once";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeader } from "@/components/layout/section-header";
import { SectionShell } from "@/components/layout/section-shell";
import { Surface } from "@/components/ui/surface";

import { getTransitionDelayStyle, MOTION_REVEAL_CLASS } from "@/lib/motion";
import { cn } from "@/lib/utils";

type EdgeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
};

function EdgeFade({ side, className, ...props }: EdgeFadeProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 z-10 w-32",
        side === "left"
          ? "from-background left-0 bg-linear-to-r to-transparent"
          : "from-background right-0 bg-linear-to-l to-transparent",
        className
      )}
      {...props}
    />
  );
}

const TESTIMONIALS_ROW_1 = [
  {
    quote:
      "A run is only trustworthy when the operator can inspect the plan, current step, evidence, approvals, and final output.",
    author: "Visible execution",
    role: "Trust signal",
    company: "Oxcil",
    avatar: "OB",
  },
  {
    quote:
      "Operators should start from a business task, not an empty builder, then inspect the execution narrative after launch.",
    author: "Task-first UX",
    role: "Operator experience",
    company: "Oxcil",
    avatar: "UX",
  },
  {
    quote:
      "Task-level actions like check leads or verify appointments belong in the product. Raw clicks stay behind the runtime.",
    author: "Business actions",
    role: "Workflow model",
    company: "Oxcil",
    avatar: "RT",
  },
  {
    quote:
      "Niche workflow packs win first because the repetition, approvals, and messy system edges are easier to prove and sell.",
    author: "Niche workflow packs",
    role: "Launch strategy",
    company: "Oxcil",
    avatar: "GT",
  },
  {
    quote:
      "Approval checkpoints belong before writes, outbound messaging, or any action that changes production records.",
    author: "Approval checkpoints",
    role: "Control model",
    company: "Oxcil",
    avatar: "AP",
  },
];

const TESTIMONIALS_ROW_2 = [
  {
    quote:
      "The core proof is narrow: prompt, plan, run, inspect, reuse. Everything else can wait until that loop works repeatedly.",
    author: "Core loop first",
    role: "Product scope",
    company: "Oxcil",
    avatar: "CL",
  },
  {
    quote:
      "Artifacts are first-class output: screenshots, structured extracts, summaries, and downloadable files all create review value.",
    author: "Evidence artifacts",
    role: "Review value",
    company: "Oxcil",
    avatar: "EV",
  },
  {
    quote:
      "Workflow studio is an admin surface. The first-run experience should stay request-first, then move into visible execution.",
    author: "Admin studio",
    role: "Product shape",
    company: "Oxcil",
    avatar: "ST",
  },
  {
    quote:
      "Saved workflows only matter after one run proves useful enough to repeat, schedule, and hand off to another operator.",
    author: "Reusable runs",
    role: "Persistence",
    company: "Oxcil",
    avatar: "RE",
  },
  {
    quote:
      "Broader platform ambitions can wait until one workflow pack is reliable, repeatable, and worth selling more than once.",
    author: "Expansion later",
    role: "Roadmap discipline",
    company: "Oxcil",
    avatar: "RM",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS_ROW_1)[0];
}) {
  return (
    <Surface variant="glass" interactive className="w-87.5 shrink-0 p-6 md:w-100">
      <p className="text-oxcil-neutral-300 text-sm leading-relaxed">
        {testimonial.quote}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="from-oxcil-brand-600 to-oxcil-brand-800 text-oxcil-brand-100 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br text-xs font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-oxcil-neutral-200 text-sm font-medium">
            {testimonial.author}
          </div>
          <div className="text-oxcil-neutral-500 text-xs">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </Surface>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 30,
}: {
  testimonials: typeof TESTIMONIALS_ROW_1;
  direction?: "left" | "right";
  speed?: number;
}) {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden">
      <EdgeFade side="left" />
      <EdgeFade side="right" />

      <div
        className="flex gap-6 py-4 hover:[animation-play-state:paused]"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {duplicated.map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.author}-${i}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <SectionShell id="trust" divider clip>
      <PageContainer>
        <InViewOnce
          className="mb-12"
          hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-12 opacity-0 blur-sm`}
          visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100 blur-0`}
        >
          <SectionHeader
            eyebrow="Trust and visibility"
            title="Operators trust runs they can inspect"
            description="Useful workflow packs expose plan, evidence, approvals, and result state without forcing operators into raw logs."
          />
        </InViewOnce>
      </PageContainer>

      <InViewOnce
        className="space-y-6"
        hiddenClassName={`${MOTION_REVEAL_CLASS} opacity-0`}
        visibleClassName={`${MOTION_REVEAL_CLASS} opacity-100`}
        style={getTransitionDelayStyle(300)}
      >
        <MarqueeRow testimonials={TESTIMONIALS_ROW_1} direction="left" speed={40} />
        <MarqueeRow testimonials={TESTIMONIALS_ROW_2} direction="right" speed={45} />
      </InViewOnce>
    </SectionShell>
  );
}
