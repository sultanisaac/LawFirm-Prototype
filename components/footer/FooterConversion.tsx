"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Linkedin, Instagram, Scale, ExternalLink, AlertTriangle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import {
  buildGeneralWhatsAppLink,
  buildGeneralEmailLink,
  EMAIL_ADDRESS,
} from "@/lib/cta-links";

import { Badge } from "@/components/ui/badge";

export function FooterConversion() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <footer id="footer" className="border-t border-border/60 bg-background pt-16 sm:pt-24 pb-12">
      <div className="container-wide">
        {/* Pre-footer CTA */}
        <div className="text-center flex flex-col items-center gap-8 mb-20 sm:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary uppercase tracking-[0.3em] px-4 py-1.5 rounded-full text-[10px] font-black">
            {t.footer.start_today}
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-2xl leading-[1.1] tracking-tight">
            {t.footer.final_cta_title}
          </h2>
          <p className="text-muted-foreground/80 max-w-md text-base sm:text-lg leading-relaxed font-medium">
            {t.footer.final_cta_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Button
              onClick={() => openBookingModal()}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-black gap-3 h-14 px-10 text-base rounded-2xl shadow-xl shadow-primary/25 active:scale-[0.98] transition-all"
            >
              <Calendar className="h-5 w-5" />
              {t.footer.final_cta_btn}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-card border-border/60 text-foreground hover:bg-secondary hover:border-primary/40 font-bold gap-3 h-14 px-10 text-base rounded-2xl active:scale-[0.98] transition-all"
            >
              <a href={buildGeneralEmailLink(lang)}>
                <Mail className="h-5 w-5" />
                {t.nav.cta_email}
              </a>
            </Button>
          </div>
        </div>

        <Separator className="bg-border/30 mb-16" />

        {/* Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-12 gap-x-8 mb-16">
          <div className="col-span-2 md:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src="/lawfirmlogo.png" alt="NUSALEXA" className="h-7 w-auto object-contain" />
                <span className="text-xl font-black tracking-tight text-foreground uppercase">
                  {t.nav.wordmark}
                </span>
              </div>
              <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed font-medium">
                {t.footer.tagline}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {t.footer.office}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a href="/#hero" className="p-2 sm:p-2.5 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="/#hero" className="p-2 sm:p-2.5 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="/#hero" className="p-2 sm:p-2.5 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 px-1">Legal Services</h3>
            <div className="flex flex-col gap-3">
              {t.services.items.slice(0, 5).map((service) => (
                <a key={service.id} href="#services" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors pl-1">
                  {service.title}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 px-1">Explore</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: t.nav.services, href: "#services" },
                { label: t.nav.faq, href: "#faq" },
                { label: t.nav.contact, href: "#footer" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors pl-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 flex flex-col gap-5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 px-1">Connect With Us</h3>
            <div className="flex flex-col gap-3 bg-secondary/30 p-5 rounded-2xl border border-border/40">
              <button
                onClick={() => openBookingModal()}
                className="flex items-center justify-between group w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{t.booking.title}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </button>
              <Separator className="bg-border/40" />
              <a
                href={buildGeneralWhatsAppLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">WhatsApp</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </a>
              <Separator className="bg-border/40" />
              <a
                href={buildGeneralEmailLink(lang)}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground truncate max-w-[120px] lg:max-w-none">{EMAIL_ADDRESS}</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </a>
            </div>
            <div className="mt-2 px-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Affiliation</p>
              <p className="text-xs font-bold text-foreground">NUSALEXA · Indonesian Legal Partners</p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/30 mb-8" />

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 opacity-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium leading-relaxed uppercase tracking-tighter">
                Disclaimer: {t.footer.disclaimer}
              </p>
            </div>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
              {t.footer.legal_note}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/20">
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground/40 uppercase tracking-widest text-center sm:text-left">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[10px] sm:text-xs font-bold text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-widest">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[10px] sm:text-xs font-bold text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-widest">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

