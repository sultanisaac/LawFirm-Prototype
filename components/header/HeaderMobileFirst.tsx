"use client";

import Link from "next/link";
import { MessageCircle, Mail, Menu, X, Scale, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HeaderMobileFirst() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["services", "faq", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-primary/10 blur-md group-hover:bg-primary/25 transition-all opacity-100" />
              <Scale className="h-6 w-6 text-primary relative" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
                {t.nav.wordmark}
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground transition-colors group-hover:text-foreground/70">
                {t.nav.wordmark_sub}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-all py-1",
                    activeSection === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-2 border-l border-border/60 pl-4 ml-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors bg-secondary/30"
                      onClick={() => openBookingModal()}
                      aria-label="Book Strategic Session"
                    >
                      <Calendar className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.hero.cta_booking}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={buildGeneralEmailLink(lang)}
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors bg-secondary/30"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send us an email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors bg-secondary/30"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md animate-in slide-in-from-top-2 duration-300 shadow-2xl">
            <nav className="container-wide py-8 flex flex-col gap-2 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Navigation</p>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-4 px-5 rounded-2xl text-lg font-bold transition-all active:scale-[0.98]",
                    activeSection === item.href
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                  {activeSection === item.href && <Scale className="h-5 w-5" />}
                </a>
              ))}
              
              <div className="mt-8 px-4 flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Direct Contact</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={buildGeneralWhatsAppLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 transition-all font-bold group"
                  >
                    <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">WhatsApp</span>
                  </a>
                  <a
                    href={buildGeneralEmailLink(lang)}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all font-bold group"
                  >
                    <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">Email</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openBookingModal();
                  }}
                  className="mt-2 flex items-center justify-center gap-3 p-5 rounded-2xl bg-amber-500 text-amber-950 hover:bg-amber-400 transition-all font-black text-sm shadow-xl shadow-amber-500/20"
                >
                  <Calendar className="h-5 w-5" />
                  {t.hero.cta_booking}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Standalone Fixed WhatsApp Button for Mobile - Moved from here to be global in future step, 
          but for now keeping it as part of HeaderMobileFirst if it was already there. 
          Actually point 10 says "it should be added as a standalone fixed component visible site-wide on mobile". 
          I will remove it from here and create a new component later. */}
    </>
  );
}
