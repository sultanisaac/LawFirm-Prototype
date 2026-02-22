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

export function FAQ() {
  const { t, lang } = useLanguage();

  return (
    <section id="faq" className="section-padding border-t border-border/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/[0.04] blur-[70px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-10 section-accent-top pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t.faq.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
          {t.faq.items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-amber-500/35 data-[state=open]:bg-amber-500/[0.03] transition-all duration-200"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline hover:text-amber-400 [&[data-state=open]]:text-amber-400 transition-colors">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="border-l-2 border-amber-500/30 pl-4">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.a}</p>
                  <a
                    href={buildGeneralWhatsAppLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                    {t.faq.wa_micro_cta}
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">{t.faq.still_questions}</p>
          <a
            href={buildGeneralWhatsAppLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 border border-amber-500/30 rounded-full px-5 py-2.5 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-200"
          >
            <MessageCircle className="h-4 w-4" />
            {t.faq.ask_anything}
          </a>
        </div>
      </div>
    </section>
  );
}
