"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CaretRightIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

const CONFIGS = [
  {
    name: "daily-lead-summary",
    runtime: "api-first",
    memory: "approval",
    min: "0",
    max: "4",
    tools: '["crm", "calendar", "browser"]',
  },
  {
    name: "appointment-check",
    runtime: "api-first",
    memory: "review",
    min: "1",
    max: "3",
    tools: '["calendar", "dispatch", "sms"]',
  },
  {
    name: "ops-digest",
    runtime: "scheduled",
    memory: "artifact",
    min: "0",
    max: "5",
    tools: '["crm", "jobs", "email"]',
  },
  {
    name: "unassigned-job-check",
    runtime: "browser-fallback",
    memory: "screenshot",
    min: "5",
    max: "2",
    tools: '["portal", "jobs", "notify"]',
  },
  {
    name: "follow-up-queue",
    runtime: "approval-gated",
    memory: "structured",
    min: "0",
    max: "6",
    tools: '["crm", "email", "approval"]',
  },
];

export function TerminalDemo() {
  const [configIndex, setConfigIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);
  const [bulletsVisible, setBulletsVisible] = useState([false, false, false]);
  const bulletsSectionRef = useRef<HTMLDivElement>(null);
  const bulletsAnimatedRef = useRef(false);

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

  useEffect(() => {
    if (!bulletsSectionRef.current || bulletsAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !bulletsAnimatedRef.current) {
            bulletsAnimatedRef.current = true;
            setTimeout(() => setBulletsVisible((prev) => [true, prev[1], prev[2]]), 0);
            setTimeout(() => setBulletsVisible((prev) => [prev[0], true, prev[2]]), 200);
            setTimeout(() => setBulletsVisible((prev) => [prev[0], prev[1], true]), 400);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(bulletsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cursorField = getCursorField();
  const showCursor = !isComplete;

  const renderValue = (fieldIndex: number, isString = true) => {
    const value = getFieldValue(fieldIndex);
    const hasCursor = showCursor && cursorField === fieldIndex;
    const colorClass = isString ? "text-oxcil-accent-300" : "text-oxcil-accent-400";

    return (
      <span className={colorClass}>
        {isString ? `"${value}"` : value}
        {hasCursor && (
          <span className="bg-oxcil-accent-400 ml-px inline-block h-[1em] w-0.5 animate-pulse" />
        )}
      </span>
    );
  };

  return (
    <section className="border-oxcil-elevated-900 border-t py-24">
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1">
            <div
              className="border-oxcil-elevated-800 bg-oxcil-elevated-900 overflow-hidden rounded-2xl border"
              style={{ boxShadow: "var(--bento-shadow)" }}
            >
              <div className="border-oxcil-elevated-800 bg-oxcil-elevated-950/50 flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-3">
                  <CubeIcon weight="fill" className="text-oxcil-elevated-500 h-4 w-4" />
                  <span className="text-oxcil-elevated-500 font-mono text-xs">
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
                          ? "bg-oxcil-accent-400 w-4"
                          : "bg-oxcil-elevated-600 hover:bg-oxcil-elevated-500 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto p-5 font-mono text-sm">
                <pre className="text-oxcil-elevated-400">
                  <code>
                    <span className="text-oxcil-elevated-500">
                      {"// Define the business workflow"}
                    </span>
                    {"\n"}
                    <span className="text-oxcil-accent-400">export default</span>{" "}
                    <span className="text-oxcil-elevated-200">defineWorkflow</span>
                    {"({"}
                    {"\n"}
                    {"  "}
                    <span className="text-oxcil-elevated-300">name</span>:{" "}
                    {renderValue(0)},{"\n"}
                    {"  "}
                    <span className="text-oxcil-elevated-300">strategy</span>:{" "}
                    {renderValue(1)},{"\n"}
                    {"  "}
                    <span className="text-oxcil-elevated-300">risk</span>:{" "}
                    {renderValue(2)},{"\n"}
                    {"  "}
                    <span className="text-oxcil-elevated-300">estimates</span>: {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-oxcil-elevated-300">approvals</span>:{" "}
                    {renderValue(3, false)},{"\n"}
                    {"    "}
                    <span className="text-oxcil-elevated-300">minutes</span>:{" "}
                    {renderValue(4, false)},{"\n"}
                    {"  "}
                    {"}"},{"\n"}
                    {"  "}
                    <span className="text-oxcil-elevated-300">tools</span>:{" "}
                    {renderValue(5, false)},{"\n"}
                    {"})"}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md">
            <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
              Workflow library
            </span>
            <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold md:text-4xl">
              Templates stay concrete
            </h2>
            <p className="text-oxcil-elevated-400 mt-4 text-lg">
              V1 starts with home-services office workflows that can prove value, reuse,
              and trust quickly.
            </p>

            <div ref={bulletsSectionRef} className="mt-8 space-y-4">
              {[
                "Daily lead summary",
                "Tomorrow's appointment verification",
                "Follow-up queue generation",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 transition-all duration-500 ease-out"
                  style={{
                    opacity: bulletsVisible[index] ? 1 : 0,
                    transform: bulletsVisible[index]
                      ? "translateX(0)"
                      : "translateX(40px)",
                  }}
                >
                  <div className="bg-oxcil-accent-950 border-oxcil-accent-800 flex h-8 w-8 items-center justify-center rounded-full border">
                    <CaretRightIcon
                      weight="bold"
                      className="text-oxcil-accent-400 h-4 w-4"
                    />
                  </div>
                  <span className="text-oxcil-elevated-300">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                size="lg"
                className="bg-oxcil-accent-400 text-oxcil-accent-950 hover:bg-oxcil-accent-300 h-12 rounded-full px-6"
              >
                Run a template
                <ArrowRightIcon weight="bold" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
