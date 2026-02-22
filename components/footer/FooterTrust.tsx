"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TrustChips } from "@/components/TrustChips";
import { useLanguage } from "@/context/LanguageContext";
import {
  buildGeneralWhatsAppLink,
  buildGeneralEmailLink,
  EMAIL_ADDRESS,
} from "@/lib/cta-links";

export function FooterTrust() {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-wide py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-lg font-bold tracking-tight text-foreground">
                {t.nav.wordmark}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                {t.nav.wordmark_sub}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
            <TrustChips size="sm" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.footer.contact_title}
            </p>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                {t.footer.office}
              </div>
              <a
                href={buildGeneralWhatsAppLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-medium"
              >
                <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                WhatsApp
              </a>
              <a
                href={buildGeneralEmailLink(lang)}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-medium"
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                {EMAIL_ADDRESS}
              </a>
            </div>
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
          <p className="text-[11px] text-muted-foreground/40">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
