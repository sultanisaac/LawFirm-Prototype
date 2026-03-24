"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";

export function HeaderMinimal() {
  const { t, lang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/lawfirmlogo.png" alt="NUSALEXA" className="h-6 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {t.nav.wordmark}
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
              {t.nav.wordmark_sub}
            </span>
          </div>
        </Link>

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

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href={buildGeneralEmailLink(lang)}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-1.5"
          >
            <Mail className="h-3.5 w-3.5" />
            {t.nav.cta_email}
          </a>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1.5"
          >
            <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.nav.cta_wa}</span>
              <span className="sm:hidden">WA</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
