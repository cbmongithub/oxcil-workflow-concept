import {
  SectionDescription,
  SectionEyebrow,
  SectionTitle,
} from "@/components/layout/section-copy";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionTitle>{title}</SectionTitle>
      {description ? <SectionDescription>{description}</SectionDescription> : null}
    </div>
  );
}
