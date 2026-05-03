import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { Surface } from "@/components/ui/surface";

import { cn } from "@/lib/utils";

type ResultSummaryCardProps = {
  title: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  className?: string;
};

export function ResultSummaryCard({
  title,
  summary,
  metrics,
  className,
}: ResultSummaryCardProps) {
  return (
    <Surface variant="panelSoft" className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <IconTile variant="brand" size="sm" shape="panel">
            <CheckCircleIcon weight="duotone" />
          </IconTile>
          <div>
            <div className="text-oxcil-neutral-100 text-sm font-semibold">{title}</div>
            <div className="text-oxcil-neutral-400 mt-1 text-sm leading-6">{summary}</div>
          </div>
        </div>
        <Badge variant="success">Result</Badge>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-oxcil-neutral-800 rounded-2xl border p-3">
            <div className="text-oxcil-neutral-500 text-[11px] tracking-[0.18em] uppercase">
              {metric.label}
            </div>
            <div className="text-oxcil-neutral-100 mt-2 text-base font-semibold">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}
