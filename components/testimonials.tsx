"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS_ROW_1 = [
  {
    quote:
      "A run is not trustworthy unless the user can see the plan, current step, next step, evidence, approvals, and final result.",
    author: "V1 principle",
    role: "Observability",
    company: "Oxcil",
    avatar: "OB",
  },
  {
    quote:
      "Business users should not start from an empty graph. They should ask for work and inspect the execution narrative.",
    author: "UX principle",
    role: "Operator console",
    company: "Oxcil",
    avatar: "UX",
  },
  {
    quote:
      "Task-level tools like getLeads and verifyAppointments are product concepts. click and type are implementation details.",
    author: "Runtime principle",
    role: "Tool model",
    company: "Oxcil",
    avatar: "RT",
  },
  {
    quote:
      "Home-services office work gives Oxcil a narrow wedge with visible repetition, clear ROI, and messy system boundaries.",
    author: "GTM principle",
    role: "Niche focus",
    company: "Oxcil",
    avatar: "GT",
  },
  {
    quote:
      "Approval nodes are required before destructive changes, record mutation, outbound messaging, or production writes.",
    author: "Safety principle",
    role: "Approvals",
    company: "Oxcil",
    avatar: "AP",
  },
];

const TESTIMONIALS_ROW_2 = [
  {
    quote:
      "The core proof is simple: prompt, plan, run, stream, result, reuse. Everything else waits behind that loop.",
    author: "Scope principle",
    role: "Core loop",
    company: "Oxcil",
    avatar: "CL",
  },
  {
    quote:
      "Artifacts are first-class: screenshots, structured extracts, summaries, and downloadable outputs create review value.",
    author: "Evidence principle",
    role: "Artifacts",
    company: "Oxcil",
    avatar: "EV",
  },
  {
    quote:
      "Workflow studio is an admin surface. The first-time user experience should remain chat-first and run-second.",
    author: "Product principle",
    role: "Studio",
    company: "Oxcil",
    avatar: "ST",
  },
  {
    quote:
      "Saved workflows matter only after a run proves useful enough to repeat or schedule.",
    author: "Reuse principle",
    role: "Persistence",
    company: "Oxcil",
    avatar: "RE",
  },
  {
    quote:
      "The long-term platform can expand after one niche pack is repeatable, reliable, and worth selling more than once.",
    author: "Roadmap principle",
    role: "Expansion",
    company: "Oxcil",
    avatar: "RM",
  },
];

function TestimonialCard({
  testimonial,
  onMouseEnter,
  onMouseLeave,
}: {
  testimonial: (typeof TESTIMONIALS_ROW_1)[0];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="border-oxcil-elevated-800 bg-oxcil-elevated-950 hover:border-oxcil-accent-800 w-87.5 shrink-0 rounded-2xl border p-6 transition-colors duration-300 md:w-100"
      style={{ boxShadow: "var(--bento-shadow)" }}
    >
      <p className="text-oxcil-elevated-300 text-sm leading-relaxed">
        {testimonial.quote}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="from-oxcil-accent-600 to-oxcil-accent-800 text-oxcil-accent-100 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br text-xs font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-oxcil-elevated-200 text-sm font-medium">
            {testimonial.author}
          </div>
          <div className="text-oxcil-elevated-500 text-xs">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 30,
}: {
  testimonials: typeof TESTIMONIALS_ROW_1;
  direction?: "left" | "right";
  speed?: number;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient masks on edges */}
      <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-linear-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l to-transparent" />

      <div
        className="flex gap-6 py-4"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicated.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.author}-${i}`}
            testimonial={testimonial}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
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
      {/* Section header */}
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div
          className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-700 ${isVisible ? "blur-0 translate-y-0 opacity-100" : "translate-y-12 opacity-0 blur-sm"}`}
        >
          <span className="text-oxcil-accent-400 text-sm font-medium tracking-wider uppercase">
            Product Signals
          </span>
          <h2 className="text-oxcil-elevated-100 mt-3 text-3xl font-bold text-balance md:text-4xl">
            Principles the UI should make visible
          </h2>
        </div>
      </div>

      <div
        className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "300ms" }}
      >
        <MarqueeRow testimonials={TESTIMONIALS_ROW_1} direction="left" speed={40} />
        <MarqueeRow testimonials={TESTIMONIALS_ROW_2} direction="right" speed={45} />
      </div>
    </section>
  );
}
