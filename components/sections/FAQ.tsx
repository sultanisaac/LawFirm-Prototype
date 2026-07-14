"use client";

import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { t, lang } = useLanguage();

  const groups: any[] = [
    {
      title: "Fees & Billing",
      items: [
        t.faq.items[0],
        t.faq.items[1],
        t.faq.items[5],
        t.faq.items[8]
      ]
    },
    {
      title: "Process & Response",
      items: [
        t.faq.items[2],
        t.faq.items[4],
        t.faq.items[9]
      ]
    },
    {
      title: "Working Together",
      items: [
        t.faq.items[3],
        t.faq.items[6],
        t.faq.items[7]
      ]
    }
  ];

  return (
    <section id="faq" className="section-padding border-t border-border/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/[0.04] blur-[70px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-16 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.faq.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {groups.map((group, gIndex) => (
            <div key={group.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{group.title}</span>
                <div className="h-px flex-1 bg-border/40" />
              </div>
              
              <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
                {group.items.map((item: any, iIndex: number) => {
                  const globalIndex = `g${gIndex}-i${iIndex}`;
                  return (
                    <AccordionItem
                      key={globalIndex}
                      value={globalIndex}
                      className="bg-card/50 backdrop-blur-sm border border-border/80 rounded-2xl px-5 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.02] data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300 overflow-hidden"
                    >
                      <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground text-left py-5 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary transition-all group/faq">
                        <div className="flex items-center gap-3">
                          {item.q}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="border-l-2 border-primary/20 pl-5 ml-1">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">{item.a}</p>
                          <a
                            href={buildGeneralWhatsAppLink(lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-secondary border border-border text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            {t.faq.wa_micro_cta.replace("→", "").trim()}
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-sm text-muted-foreground mb-6 font-medium italic">{t.faq.still_questions}</p>
          <a
            href={buildGeneralWhatsAppLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-bold text-primary bg-primary/5 border border-primary/20 rounded-2xl px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-xl shadow-primary/5"
          >
            <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {t.faq.ask_anything}
          </a>
        </div>
      </div>
    </section>
  );
}
