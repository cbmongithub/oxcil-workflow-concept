"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

export function WorkflowHero() {
  return (
    <Surface variant="feature" className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brand">Workflow SDK</Badge>
      </div>

      <h1 className="text-foreground mt-4 max-w-xl text-[30px] leading-tight font-semibold tracking-tight sm:text-[34px]">
        Make every workflow
        <span className="text-oxcil-brand-400"> durable.</span>
      </h1>

      <p className="text-muted-foreground mt-3 max-w-120 text-sm leading-6 sm:text-[14px]">
        Durable runs, retries, and visibility stay attached to the work so operations keep
        moving when the system gets real.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="brand" shape="pill" size="sm">
          Explore workflow kit
        </Button>
        <Button variant="ghost" shape="pill" size="sm">
          View run trace
        </Button>
      </div>
    </Surface>
  );
}
