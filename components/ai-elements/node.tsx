import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { Hexagon } from "lucide-react";
import type { ComponentProps } from "react";

export type NodeProps = ComponentProps<typeof Card> & {
  handles: {
    target: boolean;
    source: boolean;
  };
  status?: "idle" | "running" | "success" | "error";
};

export function Node({ handles, className, status, ...props }: NodeProps) {
  return (
    <Card
      className={cn(
        "node-container relative size-full h-auto w-sm gap-0 overflow-hidden rounded-3xl border border-[color:var(--surface-feature-border)] bg-[color:var(--oxcil-neutral-950)] [background-image:linear-gradient(to_bottom,oklch(20.3%_0.04_260_/_0.92),var(--oxcil-neutral-950),var(--oxcil-neutral-950)),radial-gradient(circle_at_top_right,oklch(72.9%_0.14_251_/_0.18),transparent_24%),radial-gradient(circle_at_bottom_left,oklch(73.8%_0.117_238_/_0.1),transparent_28%)] shadow-[var(--surface-feature-shadow)] transition-all duration-200",
        status === "success" &&
          "border-oxcil-success-300 bg-[color:color-mix(in_oklab,var(--oxcil-success-950)_64%,transparent)]",
        status === "error" &&
          "border-[color:var(--oxcil-danger-300)] bg-[color:color-mix(in_oklab,var(--oxcil-danger-950)_64%,transparent)]",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(72.9%_0.14_251_/_0.18),transparent_24%),radial-gradient(circle_at_bottom_left,oklch(73.8%_0.117_238_/_0.12),transparent_28%)]" />
      {handles.target && <Handle position={Position.Left} type="target" />}
      {handles.source && <Handle position={Position.Right} type="source" />}
      <div className="relative flex items-center gap-3 px-4 py-3">
        <IconTile
          className="border-[color:var(--oxcil-brand-800)] bg-[color:color-mix(in_oklab,var(--oxcil-brand-950)_72%,transparent)] text-[color:var(--oxcil-brand-300)]"
          shape="panel"
          size="xs"
          variant="brand"
        >
          <Hexagon className="size-4" />
        </IconTile>
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-[0.18em] text-[color:var(--oxcil-brand-300)] uppercase">
            Workflow node
          </p>
          <p className="text-foreground/90 text-sm">Connected to the workflow surface</p>
        </div>
      </div>
      <div className="relative">{props.children}</div>
    </Card>
  );
}

export type NodeHeaderProps = ComponentProps<typeof CardHeader>;
export function NodeHeader({ className, ...props }: NodeHeaderProps) {
  return (
    <CardHeader
      className={cn(
        "gap-0.5 rounded-t-3xl bg-[color:color-mix(in_oklab,var(--oxcil-brand-950)_22%,transparent)] p-3",
        className
      )}
      {...props}
    />
  );
}

export type NodeTitleProps = ComponentProps<typeof CardTitle>;
export function NodeTitle(props: NodeTitleProps) {
  return <CardTitle {...props} />;
}

export type NodeDescriptionProps = ComponentProps<typeof CardDescription>;
export function NodeDescription(props: NodeDescriptionProps) {
  return <CardDescription {...props} />;
}

export type NodeActionProps = ComponentProps<typeof CardAction>;
export function NodeAction(props: NodeActionProps) {
  return <CardAction {...props} />;
}

export type NodeContentProps = ComponentProps<typeof CardContent>;
export function NodeContent({ className, ...props }: NodeContentProps) {
  return (
    <CardContent
      className={cn(
        "rounded-b-3xl bg-[color:color-mix(in_oklab,var(--oxcil-neutral-950)_82%,transparent)] p-3",
        className
      )}
      {...props}
    />
  );
}

export type NodeFooterProps = ComponentProps<typeof CardFooter>;
export function NodeFooter({ className, ...props }: NodeFooterProps) {
  return (
    <CardFooter
      className={cn(
        "rounded-b-3xl bg-[color:color-mix(in_oklab,var(--oxcil-brand-950)_22%,transparent)] p-3",
        className
      )}
      {...props}
    />
  );
}
