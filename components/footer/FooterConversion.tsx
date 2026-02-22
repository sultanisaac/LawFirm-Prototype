"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import {
  buildGeneralWhatsAppLink,
  buildGeneralEmailLink,
  EMAIL_ADDRESS,
} from "@/lib/cta-links";

export function FooterConversion() {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-wide">
        <div className="py-16 sm:py-20 text-center flex flex-col items-center gap-6 border-b border-border/50">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.footer.start_today}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground max-w-lg leading-tight">
            {t.footer.final_cta_title}
          </h2>
          <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
            {t.footer.final_cta_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 amber-glow h-12 px-8 text-sm"
            >
              <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t.footer.final_cta_btn}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary hover:border-primary/40 font-semibold gap-2 h-12 px-6 text-sm"
            >
              <a href={buildGeneralEmailLink(lang)}>
                <Mail className="h-4 w-4" />
                {t.nav.cta_email}
              </a>
            </Button>
          </div>
        </div>

        <div className="py-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="sm:col-span-2 flex flex-col gap-3">
              <div>
                <span className="text-base font-bold tracking-tight text-foreground">
                  {t.nav.wordmark}
                </span>
                <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest">
                  {t.nav.wordmark_sub}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                {t.footer.office}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {t.footer.nav_title}
              </p>
              {[
                { label: t.nav.services, href: "#services" },
                { label: t.nav.faq, href: "#faq" },
                { label: t.nav.contact, href: "#contact" },
                { label: t.footer.privacy_link, href: "/privacy" },
              ].map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {t.footer.contact_title}
              </p>
              <a
                href={buildGeneralWhatsAppLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-primary" />
                WhatsApp
              </a>
              <a
                href={buildGeneralEmailLink(lang)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                {EMAIL_ADDRESS}
              </a>
            </div>
          </div>

          <Separator className="bg-border/50 mb-6" />

          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-muted-foreground/60 font-semibold leading-relaxed">
              ⚠ {t.footer.disclaimer}
            </p>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              {t.footer.legal_note}
            </p>
            <p className="text-[11px] text-muted-foreground/40 mt-1">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
