import { HandPalmIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { Surface } from "@/components/ui/surface";

import { cn } from "@/lib/utils";

type ApprovalCheckpointCardProps = {
  title: string;
  detail: string;
  mode: "required" | "review" | "none";
  className?: string;
};

export function ApprovalCheckpointCard({
  title,
  detail,
  mode,
  className,
}: ApprovalCheckpointCardProps) {
  const badgeVariant =
    mode === "required" ? "warning" : mode === "review" ? "info" : "neutral";
  const badgeLabel =
    mode === "required" ? "Approval required" : mode === "review" ? "Review gate" : "No gate";

  return (
    <Surface variant="panelSoft" className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconTile variant={mode === "none" ? "neutral" : "brand"} size="sm" shape="panel">
            <HandPalmIcon weight="duotone" />
          </IconTile>
          <div>
            <div className="text-oxcil-neutral-100 text-sm font-semibold">{title}</div>
            <div className="text-oxcil-neutral-500 mt-1 text-xs">{detail}</div>
          </div>
        </div>
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </div>
    </Surface>
  );
}
