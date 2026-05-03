"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

import { PageContainer } from "@/components/layout/page-container";
import { SectionIntro } from "@/components/layout/section-intro";
import { SectionShell } from "@/components/layout/section-shell";

import {
  getStaggerDelay,
  getTransitionDelayStyle,
  MOTION_COLLAPSE_CLASS,
  MOTION_REVEAL_FAST_CLASS,
  MOTION_SECTION_DELAY_MS,
  MOTION_SECTION_HIDDEN_CLASS,
  MOTION_SECTION_VISIBLE_CLASS,
} from "@/lib/motion";

const FAQS = [
  {
    question: "What is Oxcil in V1?",
    answer:
      "Oxcil is a workflow operator console. A user describes operational work, Oxcil resolves it to a workflow, runs it across existing systems, streams progress, and saves the result for reuse.",
  },
  {
    question: "Is this a chatbot?",
    answer:
      "No. Chat can be the input, but the product value is execution, observability, approvals, artifacts, and repeatable workflows.",
  },
  {
    question: "Why API-first and browser-second?",
    answer:
      "Official APIs are more reliable, cheaper, and easier to observe. Browser automation remains available for legacy portals, but it should stay isolated behind task-level tools.",
  },
  {
    question: "What workflows should ship first?",
    answer:
      "The baseline docs point V1 toward home-services office workflows: daily lead summary, tomorrow's appointment verification, unassigned job checks, ops digests, and follow-up queues.",
  },
  {
    question: "Where does AI belong?",
    answer:
      "AI should sit inside a deterministic product system: structured planning, typed tool calls, schema-validated outputs, cost visibility, and human approval where risk exists.",
  },
  {
    question: "What is intentionally out of scope?",
    answer:
      "V1 should avoid marketplace, broad no-code authoring, multi-user collaboration, voice, arbitrary desktop automation, and a horizontal launch before one niche is validated.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  delay,
  isVisible,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`border-oxcil-neutral-800 border-b ${MOTION_REVEAL_FAST_CLASS} ${
        isVisible
          ? "translate-x-0 opacity-100"
          : `opacity-0 ${delay % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
      }`}
      style={getTransitionDelayStyle(getStaggerDelay(delay, 75, MOTION_SECTION_DELAY_MS))}
    >
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-oxcil-neutral-200 group-hover:text-oxcil-brand-400 font-medium transition-colors">
          {question}
        </span>
        <CaretDownIcon
          weight="bold"
          className={`text-oxcil-neutral-500 group-hover:text-oxcil-brand-400 h-5 w-5 transition-all duration-300 ${isOpen ? "text-oxcil-brand-400 rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid ${MOTION_COLLAPSE_CLASS} ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="text-oxcil-neutral-400 pb-5 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <SectionShell id="faq" ref={ref} divider clip>
      <PageContainer size="narrow">
        <SectionIntro
          isVisible={isVisible}
          hiddenClassName={MOTION_SECTION_HIDDEN_CLASS}
          visibleClassName={MOTION_SECTION_VISIBLE_CLASS}
          eyebrow="FAQ"
          title="Frequently asked questions"
        />

        <div>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </PageContainer>
    </SectionShell>
  );
}
