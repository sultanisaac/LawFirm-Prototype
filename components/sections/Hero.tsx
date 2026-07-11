"use client";

import { MessageCircle, CheckCircle2, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Hero() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14] via-[#10141e] to-[#0b0e14] pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-amber-500/[0.06] blur-[120px] pointer-events-none animate-breathe" />
      
      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        
        {/* Main Typography */}
        <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[1.05] tracking-tight text-white mb-8">
          {t.hero.headline.split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? line : (
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {line}
                </span>
              )}
            </span>
          ))}
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed mb-10 font-medium">
          {t.hero.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <Button
            size="lg"
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto bg-amber-500 text-amber-950 hover:bg-amber-400 font-bold gap-2.5 shadow-[0_0_30px_-5px_hsl(38_78%_52%/0.4)] text-base h-14 px-8 rounded-xl transition-all duration-300"
          >
            {t.hero.cta_booking}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-bold gap-2.5 text-base h-14 px-8 rounded-xl transition-all duration-300 backdrop-blur-md bg-white/[0.02]"
          >
            <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 text-amber-500" />
              {t.hero.cta_wa}
            </a>
          </Button>
        </div>

        {/* Feature row (horizontal bullets) */}
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 mb-20">
          {t.hero.bullets.map((bullet, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-amber-500" />
              <span className="text-sm sm:text-base text-white/80 font-medium">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Wide Cinematic Image replacing the right-side split layout */}
        <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14]/50 via-transparent to-transparent z-10" />
          
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&dpr=1"
            alt="Strategic Legal Consultation"
            className="w-full h-[350px] sm:h-[500px] lg:h-[650px] object-cover object-center transform hover:scale-105 transition-transform duration-[20s]"
          />
          
          {/* Floating Trust Card placed at bottom corner inside the image wrapper */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 bg-[#10141e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl max-w-xs sm:max-w-sm text-left">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <span className="text-white font-bold text-lg">RP</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">Raka Pratama, S.H., LL.M.</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Indonesian Advocate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-medium mt-0.5">
                  Managing Partner
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-400">12+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
