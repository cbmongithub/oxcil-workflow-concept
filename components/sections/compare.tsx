import { CheckIcon, MinusIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

import { InViewOnce } from "@/components/effects/in-view-once";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeader } from "@/components/layout/section-header";
import { SectionShell } from "@/components/layout/section-shell";
import { IconTile } from "@/components/ui/icon-tile";
import { Surface } from "@/components/ui/surface";

import {
  getStaggerDelay,
  getTransitionDelayStyle,
  MOTION_REVEAL_CLASS,
  MOTION_REVEAL_FAST_CLASS,
  MOTION_REVEAL_POP_HIDDEN_CLASS,
  MOTION_REVEAL_POP_VISIBLE_CLASS,
  MOTION_REVEAL_SCALE_VISIBLE_CLASS,
  MOTION_STAGGER_BASE_MS,
} from "@/lib/motion";

type FeatureValue = boolean | "partial";

type CompareFeature = {
  name: string;
  oxcil: FeatureValue;
  kubernetes: FeatureValue;
  lambda: FeatureValue;
};

const FEATURES: CompareFeature[] = [
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

function FeatureCell({ value, delay }: { value: FeatureValue; delay: number }) {
  const baseClasses = MOTION_REVEAL_FAST_CLASS;
  const hiddenClasses = `${MOTION_REVEAL_FAST_CLASS} ${MOTION_REVEAL_POP_HIDDEN_CLASS}`;
  const visibleClasses = `${MOTION_REVEAL_FAST_CLASS} ${MOTION_REVEAL_POP_VISIBLE_CLASS}`;

  if (value === true) {
    return (
      <div className="flex justify-center">
        <InViewOnce
          className="flex justify-center"
          hiddenClassName={hiddenClasses}
          visibleClassName={visibleClasses}
          style={getTransitionDelayStyle(delay)}
        >
          <IconTile variant="success" size="xxs" shape="pill" className={baseClasses}>
            <CheckIcon weight="bold" className="text-oxcil-success-400 h-4 w-4" />
          </IconTile>
        </InViewOnce>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <InViewOnce
          className="flex justify-center"
          hiddenClassName={hiddenClasses}
          visibleClassName={visibleClasses}
          style={getTransitionDelayStyle(delay)}
        >
          <IconTile variant="warning" size="xxs" shape="pill" className={baseClasses}>
            <MinusIcon weight="bold" className="text-oxcil-warning-400 h-4 w-4" />
          </IconTile>
        </InViewOnce>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <InViewOnce
        className="flex justify-center"
        hiddenClassName={hiddenClasses}
        visibleClassName={visibleClasses}
        style={getTransitionDelayStyle(delay)}
      >
        <IconTile variant="danger" size="xxs" shape="pill" className={baseClasses}>
          <XIcon weight="bold" className="text-oxcil-danger-400 h-4 w-4" />
        </IconTile>
      </InViewOnce>
    </div>
  );
}

export function Compare() {
  return (
    <SectionShell id="compare" divider clip>
      <PageContainer size="medium">
        <InViewOnce
          className="mb-16"
          hiddenClassName="translate-y-12 opacity-0 blur-sm"
          visibleClassName="translate-y-0 opacity-100 blur-0"
        >
          <SectionHeader
            eyebrow="Compare"
            title="Why Oxcil is not another automation builder"
          />
        </InViewOnce>

        <InViewOnce
          hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-12 scale-95 opacity-0`}
          visibleClassName={`${MOTION_REVEAL_CLASS} ${MOTION_REVEAL_SCALE_VISIBLE_CLASS}`}
          style={getTransitionDelayStyle(200)}
        >
          <Surface variant="panel">
            <div className="scrollbar-hide overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-oxcil-neutral-800 border-b">
                    <th className="text-oxcil-neutral-400 p-4 text-left text-sm font-medium lg:p-6">
                      Feature
                    </th>
                    <th className="text-oxcil-neutral-400 p-4 text-sm font-semibold lg:p-6">
                      Oxcil
                    </th>
                    <th className="text-oxcil-neutral-400 p-4 text-sm font-medium lg:p-6">
                      Chatbots
                    </th>
                    <th className="text-oxcil-neutral-400 p-4 text-sm font-medium lg:p-6">
                      Zapier-style tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feature, i) => (
                    <InViewOnce
                      as="tr"
                      key={feature.name}
                      className="border-oxcil-neutral-800/50 border-b"
                      hiddenClassName={`${MOTION_REVEAL_FAST_CLASS} -translate-x-8 opacity-0`}
                      visibleClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-0 opacity-100`}
                      style={getTransitionDelayStyle(
                        getStaggerDelay(i, MOTION_STAGGER_BASE_MS, 300)
                      )}
                    >
                      <td className="text-oxcil-neutral-300 p-4 text-sm lg:p-6">
                        {feature.name}
                      </td>
                      <td className="p-4 lg:p-6">
                        <FeatureCell
                          value={feature.oxcil}
                          delay={getStaggerDelay(i, MOTION_STAGGER_BASE_MS, 400)}
                        />
                      </td>
                      <td className="p-4 lg:p-6">
                        <FeatureCell
                          value={feature.kubernetes}
                          delay={getStaggerDelay(i, MOTION_STAGGER_BASE_MS, 450)}
                        />
                      </td>
                      <td className="p-4 lg:p-6">
                        <FeatureCell
                          value={feature.lambda}
                          delay={getStaggerDelay(i, MOTION_STAGGER_BASE_MS, 500)}
                        />
                      </td>
                    </InViewOnce>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </InViewOnce>
      </PageContainer>
    </SectionShell>
  );
}
