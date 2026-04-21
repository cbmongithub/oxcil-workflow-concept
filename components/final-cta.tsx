"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, RocketIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-oxcil-elevated-900 overflow-hidden border-t py-24"
    >
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`border-oxcil-accent-800/50 from-oxcil-accent-950 via-oxcil-elevated-950 to-oxcil-elevated-950 relative overflow-hidden rounded-3xl border bg-linear-to-br p-8 text-center transition-all duration-1000 ease-out lg:p-16 ${
            isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          } ${isVisible ? "shadow-oxcil-accent-600 shadow-[0_0_120px_-30px]" : ""}`}
          style={{
            transitionProperty: "opacity, transform, box-shadow",
          }}
        >
          <div
            className={`bg-oxcil-accent-dot-grid absolute inset-0 transition-opacity delay-500 duration-1000 ${isVisible ? "opacity-10" : "opacity-0"}`}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`bg-oxcil-accent-400/30 absolute h-2 w-2 rounded-full transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  transitionDelay: `${800 + i * 100}ms`,
                  animation: isVisible
                    ? `float ${3 + i * 0.5}s ease-in-out infinite`
                    : "none",
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div
              className={`bg-oxcil-accent-900/50 border-oxcil-accent-700 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-4 scale-90 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <RocketIcon weight="duotone" className="text-oxcil-accent-400 h-4 w-4" />
              <span className="text-oxcil-accent-300 text-sm font-medium">
                Internal alpha scope
              </span>
            </div>

            <h2
              className={`text-oxcil-elevated-100 mb-4 text-3xl font-bold text-balance transition-all duration-700 md:text-5xl ${
                isVisible
                  ? "blur-0 translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0 blur-sm"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Build the operator loop first
            </h2>

            <p
              className={`text-oxcil-elevated-400 mx-auto mb-8 max-w-xl text-lg transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              Keep the V1 sharp: one niche, visible execution, approval gates, reusable
              workflows.
            </p>

            <div
              className={`flex flex-col items-center justify-center gap-4 transition-all duration-700 sm:flex-row ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Button
                size="lg"
                className={`bg-oxcil-accent-400 text-oxcil-accent-950 hover:bg-oxcil-accent-300 hover:shadow-oxcil-accent-400 h-12 rounded-full px-8 font-semibold transition-all duration-500 hover:shadow-[0_0_30px_-5px] ${
                  isVisible ? "translate-x-0" : "-translate-x-8"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                Request access
                <ArrowRightIcon weight="bold" className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className={`text-oxcil-elevated-300 hover:text-oxcil-elevated-100 hover:bg-oxcil-elevated-800 h-12 rounded-full px-8 transition-all duration-500 ${
                  isVisible ? "translate-x-0" : "translate-x-8"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                Schedule a demo
              </Button>
            </div>

            <p
              className={`text-oxcil-elevated-500 mt-6 text-sm transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Prompt to plan · Step streaming · Artifacts · Approval-safe execution
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
