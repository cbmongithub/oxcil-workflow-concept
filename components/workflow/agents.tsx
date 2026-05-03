"use client";

import { useEffect, useRef, useState } from "react";

import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";

const PROVIDERS = [
  { id: 1, cx: 140, label: "A", color: "teal", fontSerif: true },
  { id: 2, cx: 220, label: "✦", color: "purple" },
  { id: 3, cx: 300, label: "xAI", color: "orange", mono: true },
  { id: 4, cx: 380, label: "M", color: "teal", mono: true },
  { id: 5, cx: 460, label: "Co", color: "blue", mono: true },
];

const PATH_COLORS: Record<string, string> = {
  purple: "var(--oxcil-brand-400)",
  teal: "var(--oxcil-success-400)",
  orange: "var(--oxcil-warning-400)",
  blue: "var(--oxcil-info-400)",
  muted: "var(--oxcil-neutral-700)",
};

const ACTIVE_FILLS: Record<string, string> = {
  purple: "color-mix(in oklab, var(--oxcil-brand-400) 20%, transparent)",
  teal: "color-mix(in oklab, var(--oxcil-success-400) 20%, transparent)",
  orange: "color-mix(in oklab, var(--oxcil-warning-400) 20%, transparent)",
  blue: "color-mix(in oklab, var(--oxcil-info-400) 20%, transparent)",
};

export function Agents() {
  const [animated, setAnimated] = useState(false);
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [pulsePath, setPulsePath] = useState<number | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * 6);
      setPulsePath(i);
      setTimeout(() => setPulsePath(null), 500);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  function handleIconClick(id: number) {
    setActiveIcon(id === activeIcon ? null : id);
    setPulsePath(id);
    setTimeout(() => setPulsePath(null), 700);
  }

  const getPathD = (cx: number) =>
    cx === 300
      ? "M 300 44 C 300 72 300 88 300 112"
      : cx === 60
        ? "M 60 44 C 88 82 176 108 300 112"
        : `M ${cx} 44 C ${cx} 82 300 82 300 112`;

  return (
    <Surface variant="panelSoft" className="relative overflow-hidden p-5 sm:p-6">
      <div className="mb-5 space-y-1 text-center">
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
          Provider mesh
        </p>
        <p className="text-foreground text-sm leading-6">
          Blue lanes keep the integrations legible at a glance.
        </p>
      </div>

      <svg
        viewBox="0 0 600 148"
        className="w-full"
        style={{ height: 148 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {PROVIDERS.map((p) => (
          <path
            key={p.id}
            ref={(el) => {
              pathRefs.current[p.id] = el;
            }}
            d={getPathD(p.cx)}
            fill="none"
            stroke={PATH_COLORS[p.color]}
            strokeWidth={pulsePath === p.id ? 3 : 1.5}
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={animated ? 0 : 220}
            opacity={pulsePath === p.id ? 1 : 0.7}
            style={{
              transition: animated
                ? `stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1) ${p.id * 60}ms, stroke-width 0.3s, opacity 0.3s`
                : "none",
            }}
          />
        ))}

        {PROVIDERS.map((p) => {
          const isActive = activeIcon === p.id;
          const isClickable = p.id < 6;
          return (
            <g
              key={p.id}
              onClick={() => isClickable && handleIconClick(p.id)}
              style={{ cursor: isClickable ? "pointer" : "default" }}
            >
              <circle
                cx={p.cx}
                cy={24}
                r={22}
                fill={
                  isActive
                    ? (ACTIVE_FILLS[p.color] ?? "transparent")
                    : "color-mix(in oklab, var(--oxcil-neutral-900) 80%, black)"
                }
                stroke={
                  isActive
                    ? PATH_COLORS[p.color]
                    : "color-mix(in oklab, var(--oxcil-neutral-700) 40%, transparent)"
                }
                strokeWidth={isActive ? 1.5 : 0.5}
                style={{ transition: "fill 0.3s, stroke 0.3s" }}
              />
              <text
                x={p.cx}
                y={29}
                textAnchor="middle"
                fontSize={p.mono ? 11 : 14}
                fontWeight={p.fontSerif ? 700 : 400}
                fontFamily={p.fontSerif ? "serif" : p.mono ? "monospace" : "sans-serif"}
                fill={
                  p.color === "muted" ? "var(--oxcil-neutral-500)" : "var(--foreground)"
                }
              >
                {p.label}
              </text>
            </g>
          );
        })}

        <circle
          cx={300}
          cy={112}
          r={6}
          fill="var(--oxcil-success-400)"
          opacity={0.3}
          style={{
            filter: "blur(4px)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </svg>

      <div className="-mt-1.5 flex justify-center">
        <Badge
          variant="success"
          className="gap-2 px-3 py-1 text-xs font-medium tracking-normal"
        >
          <StatusDot variant="success" />
          Agents running
        </Badge>
      </div>
    </Surface>
  );
}
