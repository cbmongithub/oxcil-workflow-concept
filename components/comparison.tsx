"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, MinusIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

type FeatureValue = boolean | "partial";

type ComparisonFeature = {
  name: string;
  oxcil: FeatureValue;
  kubernetes: FeatureValue;
  lambda: FeatureValue;
};

const FEATURES: ComparisonFeature[] = [
  {
    name: "Intent-level workflow resolution",
    oxcil: true,
    kubernetes: false,
    lambda: "partial",
  },
  {
    name: "Step-by-step run observability",
    oxcil: true,
    kubernetes: "partial",
    lambda: false,
  },
  {
    name: "Approval gates before risky actions",
    oxcil: true,
    kubernetes: false,
    lambda: "partial",
  },
  {
    name: "Artifacts and evidence capture",
    oxcil: true,
    kubernetes: false,
    lambda: "partial",
  },
  {
    name: "API-first, browser-second execution",
    oxcil: true,
    kubernetes: "partial",
    lambda: true,
  },
  {
    name: "Business-action abstractions",
    oxcil: true,
    kubernetes: false,
    lambda: false,
  },
  {
    name: "Saved workflows and reruns",
    oxcil: true,
    kubernetes: false,
    lambda: false,
  },
  {
    name: "Niche workflow packs",
    oxcil: true,
    kubernetes: "partial",
    lambda: true,
  },
];

function FeatureCell({
  value,
  isVisible,
  delay,
}: {
  value: FeatureValue;
  isVisible: boolean;
  delay: number;
}) {
  const baseClasses = `transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`;

  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className={`bg-oxcil-accent-900 flex h-6 w-6 items-center justify-center rounded-full ${baseClasses}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <CheckIcon weight="bold" className="text-oxcil-accent-400 h-4 w-4" />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <div
          className={`bg-oxcil-elevated-800 flex h-6 w-6 items-center justify-center rounded-full ${baseClasses}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <MinusIcon weight="bold" className="text-oxcil-elevated-400 h-4 w-4" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div
        className={`bg-oxcil-elevated-900 flex h-6 w-6 items-center justify-center rounded-full ${baseClasses}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <XIcon weight="bold" className="text-oxcil-elevated-600 h-4 w-4" />
      </div>
    </div>
  );
}

export function Comparison() {
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
      id="comparison"
      className="border-oxcil-elevated-900 overflow-hidden border-t py-24"
    >
      <div className="mx-auto max-w-250 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${isVisible ? "blur-0 translate-y-0 opacity-100" : "translate-y-12 opacity-0 blur-sm"}`}
        >
          <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
            Comparison
          </span>
          <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold text-balance md:text-4xl">
            Why Oxcil is not another automation builder
          </h2>
        </div>

        <div
          className={`border-oxcil-elevated-800 bg-oxcil-elevated-950 overflow-hidden rounded-2xl border transition-all duration-700 ease-out ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-12 scale-95 opacity-0"
          }`}
          style={{ boxShadow: "var(--bento-shadow)", transitionDelay: "200ms" }}
        >
          <div className="scrollbar-hide overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full">
              <thead>
                <tr className="border-oxcil-elevated-800 border-b">
                  <th className="text-oxcil-elevated-400 p-4 text-left text-sm font-medium lg:p-6">
                    Feature
                  </th>
                  <th className="text-oxcil-accent-400 p-4 text-sm font-semibold lg:p-6">
                    Oxcil
                  </th>
                  <th className="text-oxcil-elevated-400 p-4 text-sm font-medium lg:p-6">
                    Chatbots
                  </th>
                  <th className="text-oxcil-elevated-400 p-4 text-sm font-medium lg:p-6">
                    Zapier-style tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-oxcil-elevated-800/50 border-b transition-all duration-500 ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${300 + i * 60}ms` }}
                  >
                    <td className="text-oxcil-elevated-300 p-4 text-sm lg:p-6">
                      {feature.name}
                    </td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell
                        value={feature.oxcil}
                        isVisible={isVisible}
                        delay={400 + i * 60}
                      />
                    </td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell
                        value={feature.kubernetes}
                        isVisible={isVisible}
                        delay={450 + i * 60}
                      />
                    </td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell
                        value={feature.lambda}
                        isVisible={isVisible}
                        delay={500 + i * 60}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
