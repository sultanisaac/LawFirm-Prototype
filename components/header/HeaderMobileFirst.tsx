"use client";

import Link from "next/link";
import { MessageCircle, Mail, Menu, X, Scale, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    { label: "Home", href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#footer" },
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
      { threshold: 0.2 }
    );

    const sections = ["hero", "services", "faq", "footer"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/#hero" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-primary/10 blur-md group-hover:bg-primary/25 transition-all opacity-100" />
              <img src="/lawfirmlogo.png" alt="NUSALEXA" className="h-7 w-auto relative object-contain" />
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
                  onClick={() => setActiveSection(item.href)}
                  className={cn(
                    "relative text-sm font-medium transition-all py-1",
                    activeSection === item.href
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-2 md:border-l md:border-border/60 md:pl-4 md:ml-2">
              <ThemeToggle />
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors bg-secondary/30"
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
              </div>

              {/* Mobile Burger Menu */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-foreground/80 hover:text-foreground hover:bg-secondary/80 transition-colors active:scale-95 relative z-[60]"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 bottom-0 top-16 z-40 border-t border-border bg-background/98 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 ease-out",
          menuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-8 pointer-events-none"
        )}
      >
        <div className="overflow-y-auto flex-1">
          <nav className="container-wide py-8 flex flex-col gap-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 mb-2">Navigation</p>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between py-4 px-6 rounded-2xl text-xl font-bold transition-all active:scale-[0.98]",
                    activeSection === item.href
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                  {activeSection === item.href && <Scale className="h-5 w-5" />}
                </a>
              ))}
            </div>
            
            <div className="mt-8 px-4 flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Direct Contact</p>
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
                className="mt-4 flex items-center justify-center gap-3 p-5 rounded-2xl bg-amber-500 text-amber-950 hover:bg-amber-400 transition-all font-black text-sm shadow-xl shadow-amber-500/20"
              >
                <Calendar className="h-5 w-5" />
                {t.hero.cta_booking}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Standalone Fixed WhatsApp Button for Mobile - Moved from here to be global in future step, 
          but for now keeping it as part of HeaderMobileFirst if it was already there. 
          Actually point 10 says "it should be added as a standalone fixed component visible site-wide on mobile". 
          I will remove it from here and create a new component later. */}
    </>
  );
}
