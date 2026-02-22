"use client";

import Link from "next/link";
import { MessageCircle, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";

export function HeaderMobileFirst() {
  const { t, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="container-wide flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {t.nav.wordmark}
            </span>
            <span className="hidden sm:inline text-[10px] font-medium tracking-widest uppercase text-muted-foreground border-l border-border pl-2">
              {t.nav.wordmark_sub}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle compact />
            <nav className="hidden md:flex items-center gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={buildGeneralEmailLink(lang)}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container-wide py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <Button
          asChild
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 shadow-2xl pointer-events-auto"
        >
          <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            {t.nav.cta_wa}
          </a>
        </Button>
      </div>
    </>
  );
}
