"use client";

import { Calendar, ArrowRight, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";

export function BookingSection() {
  const { t } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <section
      id="booking"
      className="relative py-20 sm:py-28 overflow-hidden border-t border-border/40 bg-background"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-amber-500/[0.07] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-amber-600/[0.05] blur-[80px] pointer-events-none" />

      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="relative rounded-3xl border border-amber-500/20 bg-card/60 backdrop-blur-sm overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),0_0_60px_hsl(38_78%_52%/0.08)]">
            {/* Top shimmer gradient */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/20 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/20 rounded-bl-xl pointer-events-none" />

            <div className="p-8 sm:p-12 flex flex-col items-center text-center gap-8">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[11px] font-black uppercase tracking-widest">
                <Calendar className="h-3 w-3" />
                {t.booking.badge}
              </span>

              {/* Headline */}
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  {t.booking.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t.booking.subtitle}
                </p>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: <Shield className="h-3.5 w-3.5" />, label: "Confidential & NDA-Ready" },
                  { icon: <Clock className="h-3.5 w-3.5" />, label: "15-min Free Intro Call" },
                  { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "No Commitment" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/60 text-xs font-semibold text-muted-foreground"
                  >
                    <span className="text-amber-500">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => openBookingModal()}
                className={cn(
                  "group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-base sm:text-lg",
                  "bg-amber-500 text-amber-950 hover:bg-amber-400",
                  "shadow-[0_20px_50px_-10px_rgba(215,165,32,0.45),0_0_30px_hsl(38_78%_52%/0.2)]",
                  "transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
                )}
              >
                <Calendar className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                {t.hero.cta_booking}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
