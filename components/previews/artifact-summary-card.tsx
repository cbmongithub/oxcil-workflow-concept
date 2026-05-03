import { FileArrowDownIcon } from "@phosphor-icons/react/dist/ssr";

import { IconTile } from "@/components/ui/icon-tile";
import { Surface } from "@/components/ui/surface";

import { cn } from "@/lib/utils";

type ArtifactSummaryCardProps = {
  title: string;
  artifact: string;
  evidence: string;
  className?: string;
};

export function ArtifactSummaryCard({
  title,
  artifact,
  evidence,
  className,
}: ArtifactSummaryCardProps) {
  return (
    <Surface variant="panelSoft" className={cn("p-5", className)}>
      <div className="flex items-start gap-3">
        <IconTile size="sm" shape="panel">
          <FileArrowDownIcon weight="duotone" />
        </IconTile>
        <div className="min-w-0 flex-1">
          <div className="text-oxcil-neutral-100 text-sm font-semibold">{title}</div>
          <div className="text-oxcil-neutral-400 mt-1 text-sm">{artifact}</div>
          <div className="text-oxcil-neutral-500 mt-3 text-xs leading-5">{evidence}</div>
        </div>
      </div>
    </Surface>
  );
}
