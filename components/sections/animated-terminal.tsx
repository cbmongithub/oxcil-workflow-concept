"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";

import { PageContainer } from "@/components/layout/page-container";
import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

type WorkflowConfig = {
  name: string;
  runtime: string;
  memory: string;
  min: string;
  max: string;
  tools: string;
  label: string;
  description: string;
  runtimeLabel: string;
  approvalsLabel: string;
  costLabel: string;
  approvalMode: "required" | "review" | "none";
  approvalTitle: string;
  approvalDetail: string;
  artifactTitle: string;
  artifactLabel: string;
  evidenceLabel: string;
  resultTitle: string;
  resultSummary: string;
  resultMetrics: Array<{ label: string; value: string }>;
  integrations: Array<{ name: string; status?: "ready" | "fallback" }>;
};

const CONFIGS: WorkflowConfig[] = [
  {
    name: "daily-lead-summary",
    runtime: "api-first",
    memory: "approval",
    min: "0",
    max: "4",
    tools: '["crm", "calendar", "browser"]',
    label: "Workflow library",
    description:
      "A saved operator pack that checks fresh leads, flags urgency, and produces a handoff artifact before anyone writes back.",
    runtimeLabel: "API-first run",
    approvalsLabel: "0 required approvals",
    costLabel: "$0.18 est. per run",
    approvalMode: "required",
    approvalTitle: "Reply approval",
    approvalDetail: "Escalate only the four leads that need outbound follow-up.",
    artifactTitle: "Lead digest artifact",
    artifactLabel: "urgent-leads.csv + approval log",
    evidenceLabel:
      "Includes CRM fields, source notes, and browser fallback screenshots only when data is missing.",
    resultTitle: "Run result summary",
    resultSummary:
      "24 leads checked across three systems with four urgent follow-ups queued for review.",
    resultMetrics: [
      { label: "Leads checked", value: "24" },
      { label: "Urgent follow-ups", value: "4" },
    ],
    integrations: [
      { name: "CRM" },
      { name: "Calendar" },
      { name: "Browser", status: "fallback" },
    ],
  },
  {
    name: "appointment-check",
    runtime: "api-first",
    memory: "review",
    min: "1",
    max: "3",
    tools: '["calendar", "dispatch", "sms"]',
    label: "Workflow library",
    description:
      "A preflight verification run that reconciles tomorrow’s appointments, missing assignees, and customer reminder status.",
    runtimeLabel: "API-first run",
    approvalsLabel: "1 review checkpoint",
    costLabel: "$0.11 est. per run",
    approvalMode: "review",
    approvalTitle: "Dispatch review",
    approvalDetail:
      "Hold the run if route conflicts or missing technicians appear in the morning batch.",
    artifactTitle: "Readiness packet",
    artifactLabel: "appointment-readiness.md",
    evidenceLabel:
      "Bundles route conflicts, missing assignees, and outbound reminder state into one reviewable packet.",
    resultTitle: "Run result summary",
    resultSummary:
      "16 appointments reconciled with two dispatch conflicts surfaced before morning reminders go out.",
    resultMetrics: [
      { label: "Appointments checked", value: "16" },
      { label: "Conflicts found", value: "2" },
    ],
    integrations: [{ name: "Calendar" }, { name: "Dispatch" }, { name: "SMS" }],
  },
  {
    name: "ops-digest",
    runtime: "scheduled",
    memory: "artifact",
    min: "0",
    max: "5",
    tools: '["crm", "jobs", "email"]',
    label: "Workflow library",
    description:
      "A scheduled digest that rolls up yesterday’s lead flow, job movement, and open operational exceptions into one brief.",
    runtimeLabel: "Scheduled run",
    approvalsLabel: "0 required approvals",
    costLabel: "$0.09 est. per run",
    approvalMode: "none",
    approvalTitle: "No approval gate",
    approvalDetail:
      "This run only compiles internal reporting and never mutates production records.",
    artifactTitle: "Daily ops brief",
    artifactLabel: "ops-digest.pdf",
    evidenceLabel:
      "Captures lead volume, job-stage drift, and any exceptions the manager should inspect at open.",
    resultTitle: "Run result summary",
    resultSummary:
      "Three stalled jobs and one lead routing backlog surfaced in the morning digest before standup.",
    resultMetrics: [
      { label: "Exceptions surfaced", value: "4" },
      { label: "Managers notified", value: "1" },
    ],
    integrations: [{ name: "CRM" }, { name: "Jobs" }, { name: "Email" }],
  },
  {
    name: "unassigned-job-check",
    runtime: "browser-fallback",
    memory: "screenshot",
    min: "5",
    max: "2",
    tools: '["portal", "jobs", "notify"]',
    label: "Workflow library",
    description:
      "A browser-fallback pack for legacy job boards that verifies new work has an assignee and captures evidence when it doesn’t.",
    runtimeLabel: "Browser fallback",
    approvalsLabel: "5 review items",
    costLabel: "$0.31 est. per run",
    approvalMode: "review",
    approvalTitle: "Legacy portal review",
    approvalDetail:
      "Escalate any unassigned jobs with screenshots before the scheduler edits the source portal.",
    artifactTitle: "Evidence bundle",
    artifactLabel: "unassigned-jobs.zip",
    evidenceLabel:
      "Includes screenshots, extracted job rows, and a clean notify list for the scheduler.",
    resultTitle: "Run result summary",
    resultSummary:
      "Two unassigned jobs were captured from the legacy portal with screenshots ready for dispatch review.",
    resultMetrics: [
      { label: "Jobs checked", value: "9" },
      { label: "Evidence captures", value: "2" },
    ],
    integrations: [
      { name: "Portal", status: "fallback" },
      { name: "Jobs" },
      { name: "Notify" },
    ],
  },
  {
    name: "follow-up-queue",
    runtime: "approval-gated",
    memory: "structured",
    min: "0",
    max: "6",
    tools: '["crm", "email", "approval"]',
    label: "Workflow library",
    description:
      "A structured follow-up pack that groups stale leads, drafts safe outbound sequences, and queues only approved sends.",
    runtimeLabel: "Approval-gated run",
    approvalsLabel: "Send approval required",
    costLabel: "$0.22 est. per run",
    approvalMode: "required",
    approvalTitle: "Outbound approval",
    approvalDetail:
      "Nothing sends until the operator approves the draft queue and scope model.",
    artifactTitle: "Follow-up queue",
    artifactLabel: "follow-up-queue.json",
    evidenceLabel:
      "Structured queue includes lead owner, stale reason, draft template, and send status for each record.",
    resultTitle: "Run result summary",
    resultSummary:
      "18 stale leads were grouped into one safe follow-up queue with six drafts held for approval.",
    resultMetrics: [
      { label: "Leads queued", value: "18" },
      { label: "Drafts awaiting send", value: "6" },
    ],
    integrations: [{ name: "CRM" }, { name: "Email" }, { name: "Approval" }],
  },
];

export function AnimatedTerminal() {
  const [configIndex, setConfigIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  const config = CONFIGS[configIndex];

  const fullText = `${config.name}|${config.runtime}|${config.memory}|${config.min}|${config.max}|${config.tools}`;
  const totalChars = fullText.length;

  const getFieldValue = (fieldIndex: number): string => {
    const parts = fullText.split("|");
    let charsBefore = 0;
    for (let i = 0; i < fieldIndex; i++) {
      charsBefore += parts[i].length + 1;
    }
    const fieldStart = charsBefore;
    const fieldEnd = charsBefore + parts[fieldIndex].length;

    if (typedChars <= fieldStart) return "";
    if (typedChars >= fieldEnd) return parts[fieldIndex];
    return parts[fieldIndex].slice(0, typedChars - fieldStart);
  };

  const getCursorField = (): number => {
    const parts = fullText.split("|");
    let charsBefore = 0;
    for (let i = 0; i < parts.length; i++) {
      const fieldEnd = charsBefore + parts[i].length;
      if (typedChars <= fieldEnd) return i;
      charsBefore = fieldEnd + 1;
    }
    return -1;
  };

  useEffect(() => {
    if (isComplete) return;

    if (typedChars < totalChars) {
      animationRef.current = setTimeout(
        () => {
          setTypedChars((prev) => prev + 1);
        },
        100 + Math.random() * 50
      );
    } else {
      setIsComplete(true);
    }

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [typedChars, totalChars, isComplete]);

  useEffect(() => {
    if (!isComplete) return;

    cycleRef.current = setTimeout(() => {
      setConfigIndex((prev) => (prev + 1) % CONFIGS.length);
      setTypedChars(0);
      setIsComplete(false);
    }, 3000);

    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, [isComplete]);

  const cursorField = getCursorField();
  const showCursor = !isComplete;

  const getFieldColorClass = (fieldIndex: number, value: string, isString: boolean) => {
    if (!value) {
      return isString ? "text-oxcil-brand-300" : "text-oxcil-brand-400";
    }

    if (fieldIndex === 1) {
      if (value === "browser-fallback") return "text-oxcil-warning-400";
      if (value === "scheduled") return "text-oxcil-info-400";
      return "text-oxcil-info-300";
    }

    if (fieldIndex === 2) {
      if (value === "structured") return "text-oxcil-success-400";
      if (value === "approval" || value === "approval-gated")
        return "text-oxcil-warning-400";
      if (value === "review") return "text-oxcil-info-400";
      if (value === "artifact") return "text-oxcil-brand-300";
      if (value === "screenshot") return "text-oxcil-danger-400";
    }

    if (fieldIndex === 3) {
      return value === "0" ? "text-oxcil-success-400" : "text-oxcil-warning-400";
    }

    if (fieldIndex === 4) {
      return "text-oxcil-info-400";
    }

    if (fieldIndex === 5) {
      return "text-oxcil-info-300";
    }

    return isString ? "text-oxcil-brand-300" : "text-oxcil-brand-400";
  };

  const renderValue = (fieldIndex: number, isString = true) => {
    const value = getFieldValue(fieldIndex);
    const hasCursor = showCursor && cursorField === fieldIndex;
    const colorClass = getFieldColorClass(fieldIndex, value, isString);

    return (
      <span className={colorClass}>
        {isString ? `"${value}"` : value}
        {hasCursor && (
          <span className="bg-running ml-px inline-block h-[1em] w-0.5 animate-pulse" />
        )}
      </span>
    );
  };

  return (
    <SectionShell divider>
      <PageContainer>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1">
            <Surface variant="panelSoft" className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-[color:var(--surface-code-header-border)] bg-[var(--surface-code-header-bg)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <CubeIcon weight="fill" className="text-oxcil-neutral-500 h-4 w-4" />
                  <span className="text-oxcil-neutral-500 font-mono text-xs">
                    workflow.template.ts
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {CONFIGS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (animationRef.current) clearTimeout(animationRef.current);
                        if (cycleRef.current) clearTimeout(cycleRef.current);
                        setConfigIndex(i);
                        setTypedChars(0);
                        setIsComplete(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === configIndex
                          ? "bg-running w-4"
                          : "bg-oxcil-neutral-600 hover:bg-oxcil-neutral-500 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto p-5 font-mono text-sm">
                <pre className="text-oxcil-neutral-400">
                  <code>
                    <span className="text-oxcil-neutral-500">
                      {"// Define the business workflow"}
                    </span>
                    {"\n"}
                    <span className="text-oxcil-brand-400">export default</span>{" "}
                    <span className="text-oxcil-neutral-200">defineWorkflow</span>
                    {"({"}
                    {"\n"}
                    {"  "}
                    <span className="text-oxcil-neutral-300">name</span>: {renderValue(0)}
                    ,{"\n"}
                    {"  "}
                    <span className="text-oxcil-neutral-300">strategy</span>:{" "}
                    {renderValue(1)},{"\n"}
                    {"  "}
                    <span className="text-oxcil-neutral-300">risk</span>: {renderValue(2)}
                    ,{"\n"}
                    {"  "}
                    <span className="text-oxcil-neutral-300">estimates</span>: {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-oxcil-neutral-300">approvals</span>:{" "}
                    {renderValue(3, false)},{"\n"}
                    {"    "}
                    <span className="text-oxcil-neutral-300">minutes</span>:{" "}
                    {renderValue(4, false)},{"\n"}
                    {"  "}
                    {"}"},{"\n"}
                    {"  "}
                    <span className="text-oxcil-neutral-300">tools</span>:{" "}
                    {renderValue(5, false)},{"\n"}
                    {"})"}
                  </code>
                </pre>
              </div>
            </Surface>
          </div>

          <div className="lg:max-w-lg lg:flex-1">
            <span className="text-oxcil-brand-400 text-sm font-medium tracking-wider uppercase">
              {config.label}
            </span>
            <h2 className="text-oxcil-neutral-100 mt-3 text-3xl font-bold md:text-4xl">
              Preview real operator state
            </h2>
            <p className="text-oxcil-neutral-400 mt-4 text-lg">{config.description}</p>

            <div className="mt-10">
              <Button variant="brand" size="lg" shape="pill" className="h-12">
                Open workflow library
                <ArrowRightIcon weight="bold" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </SectionShell>
  );
}
