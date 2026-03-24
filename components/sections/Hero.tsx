"use client";

import { MessageCircle, CheckCircle2, ShieldCheck, Users, Briefcase, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustChips } from "@/components/TrustChips";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";
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
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-amber-500/[0.12] blur-[100px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[-5%] left-[-8%] w-[500px] h-[500px] rounded-full bg-amber-600/[0.08] blur-[80px] pointer-events-none animate-breathe-alt" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-amber-400/[0.05] blur-[60px] pointer-events-none animate-float-slower" />
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[18%] right-[12%] w-[340px] h-[340px] rounded-full border border-amber-500/10 animate-float-slow" />
        <div className="absolute top-[24%] right-[15%] w-[220px] h-[220px] rounded-full border border-amber-500/[0.07]" />
      </div>

      <div className="container-wide relative section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <Badge
              variant="outline"
              className="w-fit border-amber-500/40 text-amber-400 bg-amber-500/10 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 shadow-[0_0_12px_hsl(38_78%_52%/0.2)]"
            >
              {t.hero.badge}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground">
              {t.hero.headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? line : (
                    <span className="bg-gradient-to-r from-amber-300 to-amber-600 bg-clip-text text-transparent">
                      {line}
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.hero.subheadline}
            </p>

            <ul className="flex flex-col gap-3">
              {t.hero.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 drop-shadow-[0_0_8px_hsl(38_78%_52%/0.6)]" />
                  </div>
                  <span className="text-sm text-foreground/85 leading-relaxed font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 py-4 border-y border-border/40">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500/70" />
                <span className="text-xs font-semibold text-foreground/80">12+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-500/70" />
                <span className="text-xs font-semibold text-foreground/80">200+ Clients Served</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-500/70" />
                <span className="text-xs font-semibold text-foreground/80">3+ Focus Industries</span>
              </div>
            </div>

            <TrustChips className="mt-1" />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <Button
                size="lg"
                onClick={() => openBookingModal()}
                className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2.5 shadow-[0_8px_25px_-8px_hsl(38_78%_52%/0.4)] text-sm h-14 px-7 rounded-xl transition-all duration-300"
              >
                <Calendar className="h-5 w-5" />
                {t.hero.cta_booking}
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none border-amber-500/20 text-foreground hover:bg-amber-500/5 hover:border-amber-500/40 font-bold gap-2.5 text-sm h-14 px-7 rounded-xl transition-all duration-300"
              >
                <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 text-amber-500" />
                  {t.hero.cta_wa}
                </a>
              </Button>
            </div>

            <a
              href={buildGeneralEmailLink(lang)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors self-center sm:self-start underline decoration-border/80 underline-offset-8 decoration-2 hover:decoration-primary/50"
            >
              {t.hero.cta_email}
            </a>

            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              {t.hero.disclaimer}
            </p>
          </div>

          {/* Right: Image — hidden on small mobile, shown from md+ */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-amber-500/[0.18] rounded-full blur-[50px] animate-breathe pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/[0.12] rounded-full blur-[60px] animate-breathe-alt pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_0_60px_hsl(38_78%_52%/0.12),0_24px_60px_hsl(225_22%_4%/0.6)]">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Professional legal consultation"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 rotate-3">
                    <span className="text-white font-bold text-base -rotate-3">RP</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-foreground">Raka Pratama, S.H., LL.M.</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ShieldCheck className="h-4 w-4 text-emerald-500 fill-emerald-500/10" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified Indonesian Advocate</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-xs text-muted-foreground/90 font-medium">
                      Managing Partner · 12+ years experience
                    </p>
                    <p className="text-xs text-amber-500/90 mt-1 font-semibold tracking-wide uppercase">
                      Ex in-house counsel · Corporate Law
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm border border-border/60 rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-foreground">5.0</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Client satisfaction</p>
            </div>

            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-amber-400/70 animate-float-slow shadow-[0_0_14px_hsl(38_78%_52%/0.9)]" />
            <div className="absolute top-1/3 -left-4 w-3.5 h-3.5 rounded-full bg-amber-500/60 animate-float-slower shadow-[0_0_10px_hsl(38_78%_52%/0.7)]" style={{ animationDelay: "3s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
