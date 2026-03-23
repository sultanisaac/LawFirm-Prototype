"use client";

import { MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const { t, lang } = useLanguage();

  const getStepEstimate = (number: string) => {
    switch (number) {
      case "01": return "~5 min";
      case "02": return "1 business day";
      case "03": return "2–5 days";
      default: return "";
    }
  };

  return (
    <section id="process" className="section-padding border-t border-border/50 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 22% 8% / 0.6) 0%, hsl(225 22% 6%) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(220 18% 24% / 0.4) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-16 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.how_it_works.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.how_it_works.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Desktop Connecting Lines */}
          <div className="hidden md:block absolute top-[2.25rem] left-[15%] right-[15%] h-[2px] pointer-events-none">
            <div className="w-full h-full border-t-2 border-dashed border-amber-500/30 relative">
              <div className="absolute top-[-5px] right-0 w-2 h-2 border-t-2 border-r-2 border-amber-500/40 rotate-45" />
            </div>
          </div>

          {t.how_it_works.steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center gap-5 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-500/[0.1] blur-[15px] group-hover:bg-amber-500/[0.2] transition-colors" />
                <div className="w-20 h-20 rounded-2xl bg-secondary border border-amber-500/30 flex items-center justify-center relative z-10 shadow-xl group-hover:border-amber-500/60 transition-all duration-300 rotate-3 group-hover:rotate-0">
                  <span className="text-3xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">{step.number}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                  <Badge variant="outline" className="w-fit bg-amber-500/5 border-amber-500/20 text-amber-500/80 text-[10px] py-0 px-2 flex items-center gap-1.5 h-6">
                    <Clock className="h-3 w-3" />
                    {getStepEstimate(step.number)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed px-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-border/40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-card/40 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="text-center sm:text-left relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              {t.how_it_works.response_label}
            </p>
            <p className="text-base font-medium text-foreground/90">
              Initial response within <span className="text-amber-400 font-bold">2–4 hours</span> on business days.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2.5 h-14 px-8 rounded-xl shadow-lg shadow-amber-500/20 relative z-10"
          >
            <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {t.how_it_works.start_now}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

