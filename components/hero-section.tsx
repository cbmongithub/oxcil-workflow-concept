/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CodeIcon, PlayIcon, TerminalIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

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

const GRID_ACTIVATION_MAP: Record<number, number[]> = {
  0: [5, 23, 47, 68, 92, 115, 138, 167, 189, 215],
  1: [12, 31, 56, 78, 103, 127, 152, 178, 201, 223, 8, 45, 89, 134, 176],
  2: [3, 19, 42, 65, 88, 112, 139, 163, 186, 209, 234, 17, 54, 97, 143, 188, 211, 237],
};

let animationStarted = false;

export function HeroSection() {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showStatus, setShowStatus] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set());

  const [showAgentTerminal, setShowAgentTerminal] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [runOutputs, setRunOutputs] = useState<string[]>([]);
  const [isRunStreaming, setIsRunStreaming] = useState(false);
  const [lineConnectorProgress, setLineConnectorProgress] = useState(0);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (animationStarted) return;
    animationStarted = true;

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

    const activateCellsForStep = (stepIndex: number) => {
      const cells = GRID_ACTIVATION_MAP[stepIndex] || [];
      cells.forEach((cellIndex, i) => {
        addTimeout(() => {
          setActiveCells((prev) => new Set([...prev, cellIndex]));
        }, i * 60);
      });
    };

    const showSteps = (stepIndex: number) => {
      if (stepIndex < CLI_SEQUENCE.steps.length) {
        setVisibleSteps((prev) => [...prev, stepIndex]);
        activateCellsForStep(stepIndex);
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
      <div className="absolute inset-0 -top-20 -right-20 -left-20 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 gap-3 p-4 opacity-30 sm:grid-cols-15 sm:gap-4 lg:grid-cols-20 lg:gap-5">
          {[...Array(240)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-all duration-700 ${
                activeCells.has(i)
                  ? "bg-oxcil-accent-500 shadow-oxcil-accent-500 shadow-[0_0_30px]"
                  : "border-oxcil-elevated-800 border bg-transparent"
              }`}
              style={{
                opacity: activeCells.has(i) ? 0.8 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="from-background/80 absolute inset-0 bg-linear-to-b via-transparent to-transparent" />
        <div className="from-background to-background absolute inset-0 bg-linear-to-r via-transparent" />
      </div>

      <div className="relative mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <motion.div
            variants={HERO_CONTENT_CONTAINER_VARIANTS}
            initial="initial"
            animate="visible"
            className="flex flex-col justify-center pt-24 lg:min-h-screen lg:max-w-xl lg:pt-20"
          >
            <motion.div
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="border-oxcil-accent-700 bg-oxcil-accent-950 text-oxcil-accent-300 mb-8 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs"
            >
              <span className="bg-oxcil-accent-400 h-1.5 w-1.5 rounded-full" />
              Internal V1 operator loop
            </motion.div>

            <motion.h1
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="text-oxcil-elevated-50 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Run business
              <br />
              <span className="text-oxcil-accent-400">workflows</span>
              <br />
              across tools
            </motion.h1>

            <motion.p
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="text-oxcil-elevated-400 mt-6 max-w-md text-lg leading-relaxed"
            >
              Oxcil turns plain-English operations requests into observable, reusable
              workflow runs with approvals, artifacts, and API-first execution.
            </motion.p>

            <motion.div
              variants={HERO_CONTENT_ITEM_VARIANTS}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                className="bg-oxcil-accent-500 hover:bg-oxcil-accent-600 text-oxcil-accent-950 px-6 font-semibold"
              >
                Request access
                <ArrowRightIcon className="ml-2 h-4 w-4" weight="bold" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-oxcil-elevated-300 hover:text-oxcil-elevated-100 hover:bg-oxcil-elevated-900"
              >
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
            <div className="border-oxcil-elevated-800 bg-oxcil-elevated-950 w-full overflow-hidden rounded-xl border shadow-2xl">
              <div className="border-oxcil-elevated-800 flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="bg-oxcil-elevated-700 h-3 w-3 rounded-full" />
                  <div className="bg-oxcil-elevated-700 h-3 w-3 rounded-full" />
                  <div className="bg-oxcil-elevated-700 h-3 w-3 rounded-full" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-oxcil-elevated-500 font-mono text-xs">
                    terminal
                  </span>
                </div>
              </div>

              <div className="p-5 font-mono text-sm">
                <div className="text-oxcil-elevated-300 flex items-center gap-2">
                  <span className="text-oxcil-accent-500">→</span>
                  <span className="text-oxcil-accent-500">~</span>
                  <span>
                    {typedCommand}
                    {cursorVisible && (
                      <span className="bg-oxcil-elevated-400 ml-0.5 inline-block h-4 w-2 animate-pulse" />
                    )}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {visibleSteps.map((stepIndex) => (
                    <div
                      key={stepIndex}
                      className="text-oxcil-elevated-400 animate-in fade-in slide-in-from-left-2 flex items-center gap-2 duration-300"
                    >
                      {stepIndex < visibleSteps.length - 1 || showStatus ? (
                        <span className="text-oxcil-accent-500">✓</span>
                      ) : (
                        <span className="border-oxcil-accent-500 inline-block h-3 w-3 animate-spin rounded-full border-2 border-t-transparent" />
                      )}
                      <span>{CLI_SEQUENCE.steps[stepIndex].text}</span>
                    </div>
                  ))}
                </div>

                {showStatus && (
                  <div className="border-oxcil-accent-800 bg-oxcil-accent-950 animate-in fade-in zoom-in-95 mt-5 rounded-lg border p-4 duration-500">
                    <div className="text-oxcil-accent-400 mb-3 flex items-center gap-2 text-xs tracking-wider uppercase">
                      <PlayIcon weight="fill" className="h-3 w-3" />
                      <span>Running</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-oxcil-elevated-500">run id</span>
                        <span className="text-oxcil-elevated-200">
                          {CLI_SEQUENCE.status.endpoint}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-oxcil-elevated-500">cost</span>
                        <span className="text-oxcil-accent-400">
                          {CLI_SEQUENCE.status.coldStart}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {lineConnectorProgress > 0 && (
              <div className="relative flex h-16 w-px items-center justify-center">
                <div
                  className="from-oxcil-accent-500 to-oxcil-accent-400 shadow-oxcil-accent-500 absolute top-0 w-px bg-linear-to-b shadow-[0_0_20px,0_0_40px] transition-all duration-100"
                  style={{
                    height: `${lineConnectorProgress}%`,
                  }}
                />
                {lineConnectorProgress >= 100 && (
                  <div className="bg-oxcil-accent-500 shadow-oxcil-accent-500 absolute -bottom-1 h-3 w-3 animate-pulse rounded-full shadow-[0_0_15px]" />
                )}
              </div>
            )}

            {showAgentTerminal && (
              <div className="border-oxcil-elevated-800 bg-oxcil-elevated-950 shadow-oxcil-accent-900 animate-in fade-in zoom-in-95 w-full overflow-hidden rounded-xl border shadow-[0_0_60px_-10px] duration-500">
                <div className="border-oxcil-elevated-800 flex items-center gap-2 border-b px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="bg-oxcil-elevated-700 h-3 w-3 rounded-full" />
                    <div className="bg-oxcil-elevated-700 h-3 w-3 rounded-full" />
                    <div className="bg-oxcil-accent-500 h-3 w-3 rounded-full" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-oxcil-elevated-500 flex items-center justify-center gap-2 font-mono text-xs">
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
                            <span className="text-oxcil-elevated-500">import</span>
                            <span className="text-oxcil-elevated-300">
                              {" "}
                              {"{"} workflow {"}"}{" "}
                            </span>
                            <span className="text-oxcil-elevated-500">from</span>
                            <span className="text-oxcil-accent-400">
                              {" "}
                              '@oxcil/runtime'
                            </span>
                          </span>
                        ) : line.startsWith("const") ? (
                          <span>
                            <span className="text-oxcil-elevated-500">const</span>
                            <span className="text-oxcil-elevated-300"> run = </span>
                            <span className="text-oxcil-accent-400">workflow</span>
                            <span className="text-oxcil-elevated-300">.plan({"{"}</span>
                          </span>
                        ) : line.startsWith("await") ? (
                          <span>
                            <span className="text-oxcil-elevated-500">await</span>
                            <span className="text-oxcil-elevated-300"> run.</span>
                            <span className="text-oxcil-accent-400">execute</span>
                            <span className="text-oxcil-elevated-300">(</span>
                            <span className="text-oxcil-accent-400">
                              'Summarize urgent leads'
                            </span>
                            <span className="text-oxcil-elevated-300">)</span>
                          </span>
                        ) : line.includes(":") ? (
                          <span className="text-oxcil-elevated-400">
                            {"  "}
                            {line.split(":")[0].trim()}
                            <span className="text-oxcil-elevated-500">:</span>
                            <span className="text-oxcil-accent-400">
                              {line.split(":")[1]}
                            </span>
                          </span>
                        ) : (
                          <span className="text-oxcil-elevated-300">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {runOutputs.length > 0 && (
                    <div className="border-oxcil-elevated-800 mt-4 border-t pt-4">
                      <div className="text-oxcil-elevated-500 mb-3 flex items-center gap-2 text-xs">
                        <TerminalIcon weight="bold" className="h-3 w-3" />
                        <span>output</span>
                        {isRunStreaming && (
                          <span className="ml-2 flex gap-0.5">
                            <span
                              className="bg-oxcil-accent-500 h-1 w-1 animate-bounce rounded-full"
                              style={{ animationDelay: "0ms" }}
                            />
                            <span
                              className="bg-oxcil-accent-500 h-1 w-1 animate-bounce rounded-full"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="bg-oxcil-accent-500 h-1 w-1 animate-bounce rounded-full"
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
                                ? "text-oxcil-accent-400"
                                : "text-oxcil-elevated-400"
                            }`}
                          >
                            <span className="text-oxcil-accent-600 mr-2">→</span>
                            {output}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
