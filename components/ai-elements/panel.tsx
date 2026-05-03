import { cn } from "@/lib/utils";
import { Panel as PanelPrimitive } from "@xyflow/react";
import type { ComponentProps } from "react";

type PanelProps = ComponentProps<typeof PanelPrimitive>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <PanelPrimitive
      className={cn(
        "m-4 rounded-3xl border border-[color:var(--surface-feature-border)] bg-[color:var(--oxcil-neutral-950)] [background-image:linear-gradient(to_bottom,oklch(20.3%_0.04_260_/_0.84),var(--oxcil-neutral-950)),radial-gradient(circle_at_top_right,oklch(72.9%_0.14_251_/_0.1),transparent_30%)] p-1 shadow-[var(--surface-feature-shadow)]",
        className
      )}
      {...props}
    />
  );
}
