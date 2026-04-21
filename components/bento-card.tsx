import type React from "react";

import { cn } from "@/lib/utils";

type BentoCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group border-oxcil-elevated-800 bg-oxcil-elevated-950 relative overflow-hidden rounded-2xl border p-6",
        "hover:border-oxcil-elevated-700 hover:bg-oxcil-elevated-950/80 transition-all duration-300",
        className
      )}
      style={{
        boxShadow: "var(--bento-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
