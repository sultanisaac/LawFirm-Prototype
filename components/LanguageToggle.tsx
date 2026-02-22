"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label={`Switch to ${lang === "en" ? "Bahasa Indonesia" : "English"}`}
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-secondary text-xs font-semibold tracking-widest overflow-hidden transition-all duration-200 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        compact ? "h-7 text-[10px]" : "h-8",
        className
      )}
    >
      <span
        className={cn(
          "px-3 py-1 transition-colors duration-200",
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "px-3 py-1 transition-colors duration-200",
          lang === "id"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ID
      </span>
    </button>
  );
}
