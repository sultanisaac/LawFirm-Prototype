"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import BookingInline from "@/components/booking/BookingInline";

export function BookingSection() {
  const { t } = useLanguage();

  return (
    <section id="booking" className="relative py-24 overflow-hidden border-t border-border/40 bg-background/50">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/[0.03] blur-[80px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-6 border-amber-500/40 text-amber-400 bg-amber-500/10 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 shadow-[0_0_12px_hsl(38_78%_52%/0.2)]"
          >
            {t.booking.badge}
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-foreground">
            {t.booking.title}
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative">
            <BookingInline />
          </div>
          
          {/* Decorative Corner Accents */}
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/30 rounded-tr-xl" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/30 rounded-bl-xl" />
        </div>
      </div>
    </section>
  );
}
