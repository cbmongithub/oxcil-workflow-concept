/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CodeIcon, PlayIcon, TerminalIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { PageContainer } from "@/components/layout/page-container";
import { IntegrationStatusChip } from "@/components/previews/integration-status-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { StatusDot } from "@/components/ui/status-dot";
import { Surface } from "@/components/ui/surface";

import {
  HERO_CONTENT_CONTAINER_VARIANTS,
  HERO_CONTENT_ITEM_VARIANTS,
  HERO_TERMINAL_VARIANTS,
} from "@/lib/motion";

const CLI_SEQUENCE = {
  command: "oxcil run daily-lead-summary",
  steps: [
    { text: "Resolving request to saved workflow...", delay: 600 },
    { text: "Checking CRM and appointment sources...", delay: 800 },
    { text: "Preparing approval-safe execution plan...", delay: 1000 },
  ],
  status: {
    endpoint: "run_8f24.daily_leads",
    coldStart: "$0.18 est.",
  },
};

const AGENT_SEQUENCE = {
  lines: [
    { text: "import { workflow } from '@oxcil/runtime'", delay: 80 },
    { text: "", delay: 200 },
    { text: "const run = workflow.plan({", delay: 80 },
    { text: "  niche: 'home-services',", delay: 60 },
    { text: "  approval: 'before-write',", delay: 60 },
    { text: "  tools: ['crm', 'calendar', 'browser']", delay: 60 },
    { text: "})", delay: 100 },
    { text: "", delay: 200 },
    { text: "await run.execute('Summarize urgent leads')", delay: 80 },
  ],
  outputs: [
    { text: "Workflow selected: Daily lead summary", delay: 400 },
    { text: "Tools ready: CRM, calendar, browser fallback", delay: 300 },
    { text: "24 leads checked across 3 sources", delay: 500 },
    { text: "4 urgent follow-ups found", delay: 400 },
    { text: "Saving artifact: urgent-leads.csv", delay: 600 },
    { text: "✓ Run complete with approval log", delay: 0 },
  ],
};

export function Hero() {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showStatus, setShowStatus] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const [showAgentTerminal, setShowAgentTerminal] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [runOutputs, setRunOutputs] = useState<string[]>([]);
  const [isRunStreaming, setIsRunStreaming] = useState(false);
  const [lineConnectorProgress, setLineConnectorProgress] = useState(0);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const hasStartedAnimationRef = useRef(false);

  useEffect(() => {
    if (hasStartedAnimationRef.current) return;
    hasStartedAnimationRef.current = true;

    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    const addInterval = (fn: () => void, delay: number) => {
      const id = setInterval(fn, delay);
      intervalsRef.current.push(id);
      return id;
    };

    const cursorInterval = addInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    let charIndex = 0;
    const typeCommand = () => {
      if (charIndex <= CLI_SEQUENCE.command.length) {
        setTypedCommand(CLI_SEQUENCE.command.slice(0, charIndex));
        charIndex++;
        addTimeout(typeCommand, 50 + Math.random() * 30);
      } else {
        addTimeout(() => showSteps(0), 400);
      }
    };

    const showSteps = (stepIndex: number) => {
      if (stepIndex < CLI_SEQUENCE.steps.length) {
        setVisibleSteps((prev) => [...prev, stepIndex]);
        addTimeout(() => showSteps(stepIndex + 1), CLI_SEQUENCE.steps[stepIndex].delay);
      } else {
        addTimeout(() => {
          setShowStatus(true);
          clearInterval(cursorInterval);
          setCursorVisible(false);
          addTimeout(startAgentTerminal, 800);
        }, 500);
      }
    };

    const startAgentTerminal = () => {
      let progress = 0;
      const lineInterval = addInterval(() => {
        progress += 5;
        setLineConnectorProgress(progress);
        if (progress >= 100) {
          clearInterval(lineInterval);
          setShowAgentTerminal(true);
          addTimeout(typeAgentCode, 300);
        }
      }, 20);
    };

    const typeAgentCode = () => {
      let lineIndex = 0;
      const lines = [...AGENT_SEQUENCE.lines];

      const typeLine = () => {
        if (lineIndex < lines.length) {
          const currentLine = lines[lineIndex];
          const currentDelay = currentLine.delay;
          setCodeLines((prev) => [...prev, currentLine.text]);
          lineIndex++;
          addTimeout(typeLine, currentDelay);
        } else {
          addTimeout(runAgentOutputs, 400);
        }
      };
      typeLine();
    };

    const runAgentOutputs = () => {
      setIsRunStreaming(true);
      let outputIndex = 0;
      const outputs = [...AGENT_SEQUENCE.outputs];

      const showOutput = () => {
        if (outputIndex < outputs.length) {
          const currentOutput = outputs[outputIndex];
          const currentDelay = currentOutput.delay;
          setRunOutputs((prev) => [...prev, currentOutput.text]);
          outputIndex++;
          if (outputIndex < outputs.length) {
            addTimeout(showOutput, currentDelay);
          } else {
            addTimeout(() => setIsRunStreaming(false), 300);
          }
        }
      };
      showOutput();
    };

    addTimeout(typeCommand, 800);

    const currentTimeouts = timeoutsRef.current;
    const currentIntervals = intervalsRef.current;

    return () => {
      currentTimeouts.forEach(clearTimeout);
      currentIntervals.forEach(clearInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pb-12">
      <PageContainer className="relative">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <motion.div
            variants={HERO_CONTENT_CONTAINER_VARIANTS}
            initial="initial"
            animate="visible"
            className="flex flex-col justify-center pt-24 lg:min-h-screen lg:max-w-xl lg:pt-20"
          >
            <motion.div variants={HERO_CONTENT_ITEM_VARIANTS} className="mb-8">
              <Badge
                variant="brand"
                className="gap-2 px-3 py-1 text-xs font-medium tracking-normal"
              >
                <StatusDot />
                Internal V1 operator loop
              </Badge>
            </motion.div>

            <motion.h1
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="text-oxcil-neutral-50 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Run business
              <br />
              <span className="text-oxcil-brand-400">workflows</span>
              <br />
              across tools
            </motion.h1>

            <motion.p
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="text-oxcil-neutral-400 mt-6 max-w-md text-lg leading-relaxed"
            >
              Oxcil turns plain-English operations requests into observable, reusable
              workflow runs with approvals, artifacts, and API-first execution.
            </motion.p>

            <motion.div
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button variant="brand" size="lg" shape="pill">
                Request access
                <ArrowRightIcon className="h-4 w-4" weight="bold" />
              </Button>
              <Button variant="ghost" size="lg" shape="pill">
                View workflow templates
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={HERO_TERMINAL_VARIANTS}
            initial="initial"
            animate="visible"
            className="flex flex-col items-center justify-center lg:min-h-screen lg:max-w-2xl lg:flex-1 lg:pt-20"
          >
            <Surface variant="code" className="w-full shadow-2xl">
              <div className="flex items-center gap-2 border-b border-[color:var(--surface-code-header-border)] bg-[var(--surface-code-header-bg)] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
                  <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
                  <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-oxcil-neutral-500 font-mono text-xs">
                    terminal
                  </span>
                </div>
              </div>

              <div className="p-5 font-mono text-sm">
                <div className="text-oxcil-neutral-300 flex items-center gap-2">
                  <span className="text-oxcil-info-500">→</span>
                  <span className="text-oxcil-info-500">~</span>
                  <span>
                    {typedCommand}
                    {cursorVisible && (
                      <span className="bg-oxcil-neutral-400 ml-0.5 inline-block h-4 w-2 animate-pulse" />
                    )}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {visibleSteps.map((stepIndex) => (
                    <div
                      key={stepIndex}
                      className="text-oxcil-neutral-400 animate-in fade-in slide-in-from-left-2 flex items-center gap-2 duration-300"
                    >
                      {stepIndex < visibleSteps.length - 1 || showStatus ? (
                        <span className="text-oxcil-success-500">✓</span>
                      ) : (
                        <Spinner className="text-running size-3" />
                      )}
                      <span>{CLI_SEQUENCE.steps[stepIndex].text}</span>
                    </div>
                  ))}
                </div>

                {showStatus && (
                  <div className="border-running/40 bg-running/10 animate-in fade-in zoom-in-95 mt-5 rounded-lg border p-4 duration-500">
                    <div className="text-running mb-3 flex items-center gap-2 text-xs tracking-wider uppercase">
                      <PlayIcon weight="fill" className="h-3 w-3" />
                      <span>Running</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-oxcil-neutral-500">run id</span>
                        <span className="text-oxcil-neutral-200">
                          {CLI_SEQUENCE.status.endpoint}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-oxcil-neutral-500">cost</span>
                        <span className="text-oxcil-warning-400">
                          {CLI_SEQUENCE.status.coldStart}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <IntegrationStatusChip name="CRM" />
                      <IntegrationStatusChip name="Calendar" />
                      <IntegrationStatusChip name="Browser" status="fallback" />
                    </div>
                  </div>
                )}
              </div>
            </Surface>

            {lineConnectorProgress > 0 && (
              <div className="relative flex h-16 w-px items-center justify-center">
                <div
                  className="from-running to-oxcil-info-400 absolute top-0 w-px bg-linear-to-b [box-shadow:var(--shadow-hero-connector)] transition-all duration-100"
                  style={{
                    height: `${lineConnectorProgress}%`,
                  }}
                />
                {lineConnectorProgress >= 100 && (
                  <div className="bg-running absolute -bottom-1 h-3 w-3 animate-pulse rounded-full [box-shadow:var(--shadow-hero-connector-dot)]" />
                )}
              </div>
            )}

            {showAgentTerminal && (
              <div className="w-full">
                <Surface
                  variant="code"
                  className="shadow-oxcil-code animate-in fade-in zoom-in-95 w-full duration-500"
                >
                  <div className="flex items-center gap-2 border-b border-[color:var(--surface-code-header-border)] bg-[var(--surface-code-header-bg)] px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
                      <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
                      <div className="bg-oxcil-success-500 h-3 w-3 rounded-full" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-oxcil-neutral-500 flex items-center justify-center gap-2 font-mono text-xs">
                        <CodeIcon weight="bold" className="h-3 w-3" />
                        workflow.ts
                      </span>
                    </div>
                  </div>

                  <div className="p-5 font-mono text-sm">
                    <div className="space-y-0.5">
                      {codeLines.map((line, i) => (
                        <div
                          key={i}
                          className="animate-in fade-in slide-in-from-left-1 duration-150"
                        >
                          {line === "" ? (
                            <div className="h-5" />
                          ) : line.startsWith("import") ? (
                            <span>
                              <span className="text-oxcil-neutral-500">import</span>
                              <span className="text-oxcil-neutral-300">
                                {" "}
                                {"{"} workflow {"}"}{" "}
                              </span>
                              <span className="text-oxcil-neutral-500">from</span>
                              <span className="text-oxcil-brand-400">
                                {" "}
                                '@oxcil/runtime'
                              </span>
                            </span>
                          ) : line.startsWith("const") ? (
                            <span>
                              <span className="text-oxcil-neutral-500">const</span>
                              <span className="text-oxcil-neutral-300"> run = </span>
                              <span className="text-oxcil-brand-400">workflow</span>
                              <span className="text-oxcil-neutral-300">.plan({"{"}</span>
                            </span>
                          ) : line.startsWith("await") ? (
                            <span>
                              <span className="text-oxcil-neutral-500">await</span>
                              <span className="text-oxcil-neutral-300"> run.</span>
                              <span className="text-oxcil-brand-400">execute</span>
                              <span className="text-oxcil-neutral-300">(</span>
                              <span className="text-oxcil-brand-400">
                                'Summarize urgent leads'
                              </span>
                              <span className="text-oxcil-neutral-300">)</span>
                            </span>
                          ) : line.includes(":") ? (
                            <span className="text-oxcil-neutral-400">
                              {"  "}
                              {line.split(":")[0].trim()}
                              <span className="text-oxcil-neutral-500">:</span>
                              <span className="text-oxcil-brand-400">
                                {line.split(":")[1]}
                              </span>
                            </span>
                          ) : (
                            <span className="text-oxcil-neutral-300">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {runOutputs.length > 0 && (
                      <div className="border-oxcil-neutral-800 mt-4 border-t pt-4">
                        <div className="text-oxcil-neutral-500 mb-3 flex items-center gap-2 text-xs">
                          <TerminalIcon weight="bold" className="h-3 w-3" />
                          <span>output</span>
                          {isRunStreaming && (
                            <span className="ml-2 flex gap-0.5">
                              <StatusDot
                                className="h-1 w-1 animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <StatusDot
                                className="h-1 w-1 animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <StatusDot
                                className="h-1 w-1 animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          {runOutputs.map((output, i) => (
                            <div
                              key={i}
                              className={`animate-in fade-in slide-in-from-left-1 text-xs duration-200 ${
                                output.startsWith("✓")
                                  ? "text-oxcil-success-400"
                                  : "text-oxcil-neutral-400"
                              }`}
                            >
                              <span className="text-oxcil-info-600 mr-2">→</span>
                              {output}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Surface>
              </div>
            )}
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
