"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";

export function HowItWorks() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-padding border-t border-border/50 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 22% 8% / 0.6) 0%, hsl(225 22% 6%) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(220 18% 24% / 0.4) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-12 section-accent-top pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t.how_it_works.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.how_it_works.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          <div className="hidden md:block absolute top-9 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          {t.how_it_works.steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-500/[0.15] blur-[12px] animate-breathe" />
                <div className="w-18 h-18 w-[4.5rem] h-[4.5rem] rounded-full bg-secondary border-2 border-amber-500/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_hsl(38_78%_52%/0.15)]">
                  <span className="text-2xl font-bold text-amber-400">{step.number}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              {index < t.how_it_works.steps.length - 1 && (
                <div className="md:hidden flex items-center justify-center mt-2">
                  <ArrowRight className="h-4 w-4 text-border rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-amber-500/20 rounded-xl p-5 sm:p-6 shadow-[0_0_30px_hsl(38_78%_52%/0.06)]">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              {t.how_it_works.response_label}
            </p>
            <p className="text-sm text-muted-foreground">{t.how_it_works.response_note}</p>
          </div>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 shrink-0 amber-glow amber-glow-hover transition-all duration-300"
          >
            <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t.how_it_works.start_now}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

