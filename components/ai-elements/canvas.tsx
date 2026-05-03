import { Background, ReactFlow, type ReactFlowProps } from "@xyflow/react";
import type { ReactNode } from "react";
import "@xyflow/react/dist/style.css";

type CanvasProps = ReactFlowProps & {
  children?: ReactNode;
};

export function Canvas({ children, ...props }: CanvasProps) {
  return (
    <ReactFlow
      deleteKeyCode={["Backspace", "Delete"]}
      fitView
      panActivationKeyCode={null}
      selectionOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch
      proOptions={{ hideAttribution: true }}
      {...props}
    >
      <Background
        bgColor="var(--oxcil-neutral-950)"
        color="color-mix(in oklab, var(--oxcil-info-400) 58%, var(--oxcil-brand-300))"
        gap={24}
        size={2}
      />
      {children}
    </ReactFlow>
  );
}
