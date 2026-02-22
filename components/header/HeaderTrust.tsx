"use client";

import Link from "next/link";
import { MessageCircle, Mail, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";

export function HeaderTrust() {
  const { t, lang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-5 min-w-0">
            <Link href="/" className="flex flex-col leading-none shrink-0 group">
              <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {t.nav.wordmark}
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
                {t.nav.wordmark_sub}
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground border border-border/50 rounded-full px-2.5 py-1">
                <Shield className="h-2.5 w-2.5 text-primary" />
                NDA-Ready
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground border border-border/50 rounded-full px-2.5 py-1">
                <Globe className="h-2.5 w-2.5 text-primary" />
                Bilingual
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: t.nav.services, href: "#services" },
              { label: t.nav.faq, href: "#faq" },
              { label: t.nav.contact, href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            <a
              href={buildGeneralEmailLink(lang)}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1.5 amber-glow"
            >
              <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3.5 w-3.5" />
                {t.nav.cta_wa}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
