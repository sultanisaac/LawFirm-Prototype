"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import {
  buildGeneralWhatsAppLink,
  buildGeneralEmailLink,
  EMAIL_ADDRESS,
  WA_NUMBER,
} from "@/lib/cta-links";

export function FooterSimple() {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-wide py-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-3">
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
              <MapPin className="h-3 w-3 text-primary" />
              {t.footer.office}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.footer.contact_title}
            </p>
            <a
              href={buildGeneralWhatsAppLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-primary" />
              WhatsApp: +{WA_NUMBER}
            </a>
            <a
              href={buildGeneralEmailLink(lang)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              {EMAIL_ADDRESS}
            </a>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
            >
              {t.footer.privacy_link}
            </Link>
          </div>
        </div>

        <Separator className="bg-border/50 mb-6" />

        <div className="flex flex-col gap-2">
          <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-semibold">
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
