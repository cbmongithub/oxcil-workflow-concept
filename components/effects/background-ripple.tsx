"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type Cell = {
  row: number;
  col: number;
};

type BackgroundRippleProps = {
  rows?: number;
  cols?: number;
  cellSize?: number;
  intervalMs?: number;
};

export function BackgroundRipple({
  rows = 8,
  cols = 27,
  cellSize = 56,
  intervalMs = 1400,
}: BackgroundRippleProps) {
  const [activeCell, setActiveCell] = useState<Cell | null>(null);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveCell({
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols),
      });
      setRippleId((k) => k + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [rows, cols, intervalMs]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden"
      style={
        {
          "--cell-border": "color-mix(in oklab, var(--oxcil-brand-800) 78%, transparent)",
          "--cell-fill": "color-mix(in oklab, var(--oxcil-brand-950) 14%, black)",
          "--cell-shadow": "var(--oxcil-brand-400)",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(",
            "  120% 120% at 50% 12%,",
            "  color-mix(in oklab, black 68%, transparent) 16%,",
            "  color-mix(in oklab, var(--oxcil-brand-950) 24%, transparent) 56%,",
            "  color-mix(in oklab, var(--oxcil-brand-500) 16%, transparent) 100%",
            ")",
          ].join(""),
        }}
      />

      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 100%)",
        }}
      >
        <DivGrid
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          activeCell={activeCell}
          rippleId={rippleId}
        />
      </div>
    </div>
  );
}

type DivGridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  activeCell: Cell | null;
  rippleId: number;
};

function DivGrid({ rows, cols, cellSize, activeCell, rippleId }: DivGridProps) {
  const total = rows * cols;
  const cells = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  return (
    <div className="absolute inset-0 flex items-start justify-center">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          width: cols * cellSize,
          height: rows * cellSize,
        }}
      >
        {cells.map((idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;

          const dist = activeCell
            ? Math.hypot(activeCell.row - row, activeCell.col - col)
            : 0;

          const delayMs = activeCell ? dist * 55 : 0;
          const durationMs = 300 + dist * 80;

          return (
            <RippleCell
              key={idx}
              delayMs={delayMs}
              durationMs={durationMs}
              rippleId={rippleId}
              isOrigin={!!activeCell && activeCell.row === row && activeCell.col === col}
            />
          );
        })}
      </div>
    </div>
  );
}

type RippleCellProps = {
  delayMs: number;
  durationMs: number;
  rippleId: number;
  isOrigin: boolean;
};

function RippleCell({ delayMs, durationMs, rippleId, isOrigin }: RippleCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastRippleId = useRef(-1);

  useEffect(() => {
    if (rippleId === 0 || rippleId === lastRippleId.current) return;
    lastRippleId.current = rippleId;

    const el = ref.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      el.classList.remove("animate-background-ripple");
      void el.offsetWidth; // reflow
      el.classList.add("animate-background-ripple");
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [rippleId, delayMs]);

  return (
    <div
      ref={ref}
      className={cn(
        "cell relative border-[0.5px] transition-[border-color,opacity] will-change-transform",
        "opacity-[0.62] hover:opacity-[0.95]",
        "hover:border-oxcil-brand-500",
        isOrigin && "animate-background-ripple"
      )}
      style={{
        backgroundColor: "var(--cell-fill)",
        borderRadius: 10,
        borderColor: "var(--cell-border)",
        ["--ripple-duration" as string]: `${durationMs}ms`,
      }}
    />
  );
}
