"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LucideRotateCcw } from "lucide-react";

const STEPS = [
  { label: "workflow()", pct: 100, duration: "925ms" },
  { label: "fetchRecord()", pct: 25, duration: "230ms" },
  { label: "validate()", pct: 17, duration: "155ms" },
  { label: "enrichContext()", pct: 25, duration: "230ms" },
  { label: "persist()", pct: 17, duration: "155ms" },
  { label: "notify()", pct: 17, duration: "155ms" },
];

function TraceRow({ label, pct, run }: { label: string; pct: number; run: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const timer = window.setTimeout(() => setWidth(pct), 600);
    return () => window.clearTimeout(timer);
  }, [pct, run]);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <div className="h-7 overflow-hidden rounded-full">
        <div
          className="bg-oxcil-brand-400 h-full rounded-full"
          style={{
            width: `${width}%`,
            transition: "width 850ms cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <div className="text-muted-foreground w-32 text-right font-mono text-[11px]">
        {label}
      </div>
    </div>
  );
}

export function TracePanel() {
  const [run, setRun] = useState(0);
  const replay = useCallback(() => setRun((value) => value + 1), []);

  return (
    <div>
      <div className="space-y-2.5">
        {STEPS.map((step) => (
          <TraceRow key={step.label} label={step.label} pct={step.pct} run={run} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 pt-4">
        <div className="text-muted-foreground font-mono text-[11px]">
          Total duration 925ms
        </div>
        <Button variant="ghost" size="sm" shape="pill" onClick={replay}>
          <LucideRotateCcw />
          Replay run
        </Button>
      </div>
    </div>
  );
}
