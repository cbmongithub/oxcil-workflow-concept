import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/badge";

type IntegrationStatus = "ready" | "fallback";

type IntegrationStatusChipProps = {
  name: string;
  status?: IntegrationStatus;
};

export function IntegrationStatusChip({
  name,
  status = "ready",
}: IntegrationStatusChipProps) {
  const isFallback = status === "fallback";

  return (
    <Badge
      variant={isFallback ? "warning" : "brand"}
      className="gap-2 px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] uppercase"
    >
      {isFallback ? (
        <WarningCircleIcon weight="fill" className="h-3 w-3" />
      ) : (
        <CheckCircleIcon weight="fill" className="h-3 w-3" />
      )}
      {name}
    </Badge>
  );
}
