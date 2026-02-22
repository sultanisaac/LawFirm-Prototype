"use client";

import { MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustChips } from "@/components/TrustChips";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink, buildGeneralEmailLink } from "@/lib/cta-links";

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />

      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-amber-500/[0.12] blur-[100px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[-5%] left-[-8%] w-[500px] h-[500px] rounded-full bg-amber-600/[0.08] blur-[80px] pointer-events-none animate-breathe-alt" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-amber-400/[0.05] blur-[60px] pointer-events-none animate-float-slower" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[18%] right-[12%] w-[340px] h-[340px] rounded-full border border-amber-500/10 animate-float-slow" />
        <div className="absolute top-[24%] right-[15%] w-[220px] h-[220px] rounded-full border border-amber-500/[0.07]" />
      </div>

      <div className="container-wide relative section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                  {i === 0 ? line : <span className="gradient-text">{line}</span>}
                </span>
              ))}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.hero.subheadline}
            </p>

            <ul className="flex flex-col gap-3">
              {t.hero.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5 drop-shadow-[0_0_6px_hsl(38_78%_52%/0.6)]" />
                  <span className="text-sm text-foreground/85 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            <TrustChips className="mt-1" />

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 amber-glow amber-glow-hover text-sm h-12 px-6 transition-all duration-300"
              >
                <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t.hero.cta_wa}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-secondary hover:border-primary/40 font-semibold gap-2 text-sm h-12 px-6"
              >
                <a href={buildGeneralEmailLink(lang)}>
                  <Mail className="h-4 w-4" />
                  {t.hero.cta_email}
                </a>
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground/70 leading-relaxed border-t border-border/50 pt-3">
              {t.hero.disclaimer}
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-amber-500/[0.18] rounded-full blur-[50px] animate-breathe pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/[0.12] rounded-full blur-[60px] animate-breathe-alt pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_0_60px_hsl(38_78%_52%/0.12),0_24px_60px_hsl(225_22%_4%/0.6)]">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Professional legal consultation"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_hsl(38_78%_52%/0.3)]">
                    <span className="text-amber-400 font-bold text-sm">RP</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Raka Pratama, S.H., LL.M.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Managing Partner · 12+ years experience
                    </p>
                    <p className="text-xs text-amber-400/80 mt-0.5">
                      Ex in-house counsel · Corporate & Commercial Law
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-amber-400/70 animate-float-slow shadow-[0_0_14px_hsl(38_78%_52%/0.9)]" />
            <div className="absolute top-1/3 -left-4 w-3.5 h-3.5 rounded-full bg-amber-500/60 animate-float-slower shadow-[0_0_10px_hsl(38_78%_52%/0.7)]" style={{ animationDelay: "3s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
