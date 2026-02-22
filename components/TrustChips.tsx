"use client";

import { Shield, FileText, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const chipIcons = [Shield, FileText, Globe, Zap];

interface TrustChipsProps {
  className?: string;
  size?: "sm" | "md";
}

export function TrustChips({ className, size = "md" }: TrustChipsProps) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {t.trust_chips.map((chip, i) => {
        const Icon = chipIcons[i];
        return (
          <div
            key={chip}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 text-muted-foreground font-medium transition-colors hover:border-primary/30 hover:text-foreground",
              size === "sm"
                ? "px-2.5 py-0.5 text-[11px]"
                : "px-3 py-1 text-xs"
            )}
          >
            <Icon className={cn("shrink-0", size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")} />
            {chip}
          </div>
        );
      })}
    </div>
  );
}
