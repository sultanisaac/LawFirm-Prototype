"use client";

import { MessageCircle, Clock, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();

  const estimates = ["~5 min", "1 business day", "2–5 days"];

  return (
    <section
      id="process"
      className="section-padding border-t border-border/50 relative overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--bg-dot)) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />

      <div className="container-narrow relative">
        {/* Header */}
        <div className="text-center mb-16 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.how_it_works.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.how_it_works.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[2.4rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20" />
            {/* Arrow tips */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-amber-500/40 border-y-[4px] border-y-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-0 md:gap-8">
            {t.how_it_works.steps.map((step, index) => (
              <div key={step.number} className={cn(
                "relative flex md:flex-col items-start md:items-center",
                "gap-5 md:gap-5 group",
                // Mobile: horizontal layout with vertical line connector
                index < t.how_it_works.steps.length - 1
                  ? "pb-8 md:pb-0 border-b md:border-b-0 border-border/30"
                  : ""
              )}>
                {/* Mobile vertical connector */}
                {index < t.how_it_works.steps.length - 1 && (
                  <div className="md:hidden absolute left-9 top-20 bottom-0 w-px bg-gradient-to-b from-amber-500/30 to-amber-500/5" />
                )}

                {/* Step number badge */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-amber-500/[0.12] blur-[12px] group-hover:bg-amber-500/[0.2] transition-colors" />
                  <div className="w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-2xl bg-secondary border border-amber-500/25 flex items-center justify-center relative z-10 shadow-xl group-hover:border-amber-500/50 transition-all duration-300 rotate-3 group-hover:rotate-0">
                    <span className="text-2xl md:text-3xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={cn(
                  "flex flex-col gap-2 relative z-10",
                  "md:text-center md:items-center md:px-2"
                )}>
                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500/70 bg-amber-500/5 border border-amber-500/15 rounded-full px-2.5 py-1 w-fit">
                    <Clock className="h-2.5 w-2.5" />
                    {estimates[index]}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response time + CTA bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 bg-card/60 backdrop-blur-sm border border-amber-500/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.04] rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />
          <div className="text-center sm:text-left relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1.5">
              {t.how_it_works.response_label}
            </p>
            <p className="text-sm sm:text-base font-medium text-foreground/90">
              Initial response within{" "}
              <span className="text-amber-400 font-bold">2–4 hours</span> on business days.
            </p>
          </div>
          <button
            onClick={() => openBookingModal()}
            className={cn(
              "w-full sm:w-auto flex items-center justify-center gap-2.5",
              "h-13 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "shadow-lg shadow-amber-500/20 relative z-10 active:scale-[0.98]"
            )}
          >
            <Calendar className="h-5 w-5" />
            {t.how_it_works.start_now}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
