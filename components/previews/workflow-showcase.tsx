"use client";

import { motion } from "motion/react";

import { Agents } from "@/components/workflow/agents";
import { PageContainer } from "@/components/layout/page-container";
import { SectionIntro } from "@/components/layout/section-intro";
import { SectionShell } from "@/components/layout/section-shell";
import { Surface } from "@/components/ui/surface";
import { Canvas } from "@/components/workflow/canvas";
import { CodeBlock } from "@/components/workflow/code-block";
import { TracePanel } from "@/components/workflow/trace-panel";
import { WorkflowHero } from "@/components/workflow/workflow-hero";

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function WorkflowShowcase() {
  return (
    <SectionShell id="workflow" divider spacing="section" clip>
      <PageContainer>
        <motion.div
          variants={SECTION_VARIANTS}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={ITEM_VARIANTS}>
            <SectionIntro
              isVisible
              centered={false}
              eyebrow="Workflow components"
              title="Workflow components built for durable operations"
              description="A focused set of workflow primitives for routing, tracing, and reviewing work with the same visual language used across Oxcil."
            />
          </motion.div>

          <motion.div
            variants={ITEM_VARIANTS}
            className="grid items-stretch gap-6 lg:grid-cols-2"
          >
            <div className="h-full">
              <WorkflowHero />
            </div>

            <div className="h-full">
              <Agents />
            </div>
          </motion.div>

          <motion.div variants={ITEM_VARIANTS}>
            <Surface
              variant="panel"
              className="relative overflow-hidden px-0 pt-6 sm:pt-7"
            >
              <div className="mb-6 space-y-1 px-5 text-left sm:px-6">
                <p className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
                  Nodes and Observability
                </p>
                <p className="text-foreground max-w-[18rem] text-sm leading-6">
                  Track agent workflows on AI Canvas.
                </p>
              </div>
              <Canvas />
            </Surface>
          </motion.div>

          <motion.div variants={ITEM_VARIANTS} className="grid gap-6 lg:grid-cols-2">
            <Surface variant="panelSoftMuted" className="p-5 sm:p-6">
              <div className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase">
                Live run trace
              </div>
              <div className="text-foreground mt-2 border-b border-(--surface-code-header-border) pb-4 text-sm">
                One pass through the workflow, with runtime state and outputs aligned.
              </div>
              <div className="mt-4">
                <TracePanel />
              </div>
            </Surface>

            <CodeBlock />
          </motion.div>
        </motion.div>
      </PageContainer>
    </SectionShell>
  );
}
