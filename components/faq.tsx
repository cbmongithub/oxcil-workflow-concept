"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

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
      className={`border-oxcil-elevated-800 border-b transition-all duration-500 ${
        isVisible
          ? "translate-x-0 opacity-100"
          : `opacity-0 ${delay % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
      }`}
      style={{ transitionDelay: `${delay * 75 + 200}ms` }}
    >
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-oxcil-elevated-200 group-hover:text-oxcil-accent-400 font-medium transition-colors">
          {question}
        </span>
        <CaretDownIcon
          weight="bold"
          className={`text-oxcil-elevated-500 group-hover:text-oxcil-accent-400 h-5 w-5 transition-all duration-300 ${isOpen ? "text-oxcil-accent-400 rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="text-oxcil-elevated-400 pb-5 leading-relaxed">{answer}</p>
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
    <section
      ref={ref}
      className="border-oxcil-elevated-900 overflow-hidden border-t py-24"
    >
      <div className="mx-auto max-w-200 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${isVisible ? "blur-0 translate-y-0 opacity-100" : "translate-y-12 opacity-0 blur-sm"}`}
        >
          <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

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
      </div>
    </section>
  );
}
