"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ai-elements/shimmer";

type AIPromptProps = {
  onSubmitAction?: (value: string) => void;
  placeholder?: string;
};

export function AIPrompt({ onSubmitAction, placeholder = "Ask AI..." }: AIPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      await Promise.resolve(onSubmitAction?.(prompt));
      setPrompt("");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="pointer-events-auto w-full px-4">
      <form
        aria-label="AI workflow prompt"
        className="relative flex items-center gap-2 rounded-2xl border border-[color:var(--surface-panel-soft-preview-border)] bg-[var(--surface-panel-soft-preview-bg)] px-3 py-2 shadow-[var(--surface-panel-soft-preview-shadow)]"
        onSubmit={handleSubmit}
      >
        {isGenerating && prompt ? (
          <Shimmer className="flex-1 text-sm whitespace-pre-wrap" duration={2}>
            {prompt}
          </Shimmer>
        ) : (
          <textarea
            aria-label="Describe your workflow"
            className="placeholder:text-muted-foreground flex-1 resize-none bg-transparent text-sm text-foreground outline-none"
            onChange={function (e) {
              setPrompt(e.target.value);
            }}
            placeholder={placeholder}
            rows={1}
            value={prompt}
          />
        )}
        <Button
          aria-label="Generate workflow"
          className="size-9 shrink-0 rounded-xl"
          disabled={!prompt.trim() || isGenerating}
          size="sm"
          type="submit"
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </Button>
      </form>
    </div>
  );
}
