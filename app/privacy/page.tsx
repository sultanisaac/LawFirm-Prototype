"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="container-narrow flex h-14 items-center justify-between">
          <Link href="/" className="group">
            <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {t.nav.wordmark}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle compact />
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t.privacy.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="container-narrow py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.privacy.title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{t.privacy.intro}</p>

          <Separator className="bg-border/50 mb-8" />

          <div className="flex flex-col gap-8">
            {t.privacy.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <Separator className="bg-border/50 my-10" />

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
            <p className="text-[11px] text-muted-foreground/60 font-semibold leading-relaxed">
              ⚠ {t.footer.disclaimer}
            </p>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              {t.footer.legal_note}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
