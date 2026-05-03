"use client";

import { Surface } from "@/components/ui/surface";

const CODE = `export async function processOrder(orderId: string) {
  "use workflow";

  const order = await fetchOrder(orderId);
  const valid = await validate(order);
  const checkpoint = await approvalGate(valid);
  const priced = await enrichWithPricing(valid);
  const saved = await saveOrder(priced);
  const artifact = await buildArtifact(saved);
  await persistRun({ orderId, checkpoint, artifact });
  await sendEmail({ to: order.email, subject: "Workflow confirmed" });

  return { status: "done", id: saved.id };
}`;

export function CodeBlock() {
  return (
    <Surface variant="code" className="overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-(--surface-code-header-border) bg-(--surface-code-header-bg) px-4 py-3">
        <div className="flex gap-1.5">
          <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
          <div className="bg-oxcil-neutral-700 h-3 w-3 rounded-full" />
          <div className="bg-oxcil-success-500 h-3 w-3 rounded-full" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-oxcil-neutral-500 flex items-center justify-center gap-2 font-mono text-xs">
            workflow.ts
          </span>
        </div>
      </div>

      <div className="p-5 font-mono text-sm">
        <div className="space-y-0.5">
          {CODE.split("\n").map((line, index) => (
            <div key={index} className="text-oxcil-neutral-300">
              {line === "" ? (
                <div className="h-5" />
              ) : index === 0 ? (
                <span>
                  <span className="text-oxcil-neutral-500">export async function </span>
                  <span className="text-oxcil-brand-400">processOrder</span>
                  <span className="text-oxcil-neutral-300">(orderId: </span>
                  <span className="text-oxcil-brand-400">string</span>
                  <span className="text-oxcil-neutral-300">) {"{"}</span>
                </span>
              ) : line.includes('"use workflow"') ? (
                <span className="text-oxcil-brand-400"> "use workflow";</span>
              ) : line.includes("const order") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>order</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">fetchOrder</span>
                  <span className="text-oxcil-neutral-300">(orderId);</span>
                </span>
              ) : line.includes("const valid") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>valid</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">validate</span>
                  <span className="text-oxcil-neutral-300">(order);</span>
                </span>
              ) : line.includes("const checkpoint") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>checkpoint</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">approvalGate</span>
                  <span className="text-oxcil-neutral-300">(valid);</span>
                </span>
              ) : line.includes("const priced") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>priced</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">enrichWithPricing</span>
                  <span className="text-oxcil-neutral-300">(valid);</span>
                </span>
              ) : line.includes("const saved") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>saved</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">saveOrder</span>
                  <span className="text-oxcil-neutral-300">(priced);</span>
                </span>
              ) : line.includes("const artifact") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> const </span>
                  <span>artifact</span>
                  <span className="text-oxcil-neutral-500"> = await </span>
                  <span className="text-oxcil-brand-400">buildArtifact</span>
                  <span className="text-oxcil-neutral-300">(saved);</span>
                </span>
              ) : line.includes("persistRun") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> await </span>
                  <span className="text-oxcil-brand-400">persistRun</span>
                  <span className="text-oxcil-neutral-300">
                    ({`{ orderId, checkpoint, artifact }`});
                  </span>
                </span>
              ) : line.includes("sendEmail") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> await </span>
                  <span className="text-oxcil-brand-400">sendEmail</span>
                  <span className="text-oxcil-neutral-300">
                    ({`{ to: order.email, subject: "Workflow confirmed" }`});
                  </span>
                </span>
              ) : line.includes("return") ? (
                <span>
                  <span className="text-oxcil-neutral-500"> return </span>
                  <span className="text-oxcil-neutral-300">{`{ status: "done", id: saved.id };`}</span>
                </span>
              ) : (
                <span className="text-oxcil-neutral-300">{line}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-(--surface-code-header-border) bg-(--surface-code-header-bg) px-5 py-2.5">
        <div className="grid grid-cols-3 items-center gap-3 font-mono text-[11px]">
          <div className="flex min-w-0 items-center gap-2 text-oxcil-neutral-500">
            <span className="text-oxcil-brand-400">●</span>
            <span className="truncate">workflow.ts</span>
            <span className="text-oxcil-neutral-700">|</span>
            <span className="truncate">Connected</span>
          </div>
          <div className="text-oxcil-neutral-500 hidden justify-center text-center sm:flex">
            <span className="truncate">Ln 12, Col 4 · Run preview</span>
          </div>
          <div className="flex justify-end gap-3 text-oxcil-neutral-500">
            <span>100+ tok/s</span>
            <span className="text-oxcil-neutral-700">·</span>
            <span>00:23</span>
          </div>
        </div>
      </div>
    </Surface>
  );
}
