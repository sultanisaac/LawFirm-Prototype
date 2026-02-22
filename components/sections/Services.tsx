"use client";

import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppLink } from "@/lib/cta-links";

export function Services() {
  const { t, lang } = useLanguage();

  const tabKeys: Array<"setup" | "protection" | "disputes"> = [
    "setup",
    "protection",
    "disputes",
  ];

  const handleAsk = (topic: string) => {
    window.open(buildWhatsAppLink(topic, lang), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="services" className="section-padding border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="container-wide relative">
        <div className="text-center mb-10 section-accent-top pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-3">Practice Areas</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <Tabs defaultValue="setup">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary border border-border h-auto p-1 gap-1 flex-wrap">
              {tabKeys.map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none px-4 py-2"
                >
                  {t.services.tabs[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabKeys.map((key) => {
            const items = t.services.items.filter((item) => item.tab === key);
            return (
              <TabsContent key={key} value={key}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((service) => (
                    <Card
                      key={service.id}
                      className="bg-card border-border hover:border-amber-500/40 transition-all duration-300 group card-hover-accent hover:shadow-[0_0_24px_hsl(38_78%_52%/0.08)]"
                    >
                      <CardContent className="p-5 flex flex-col gap-3 h-full">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-amber-400 transition-colors duration-200">
                            {service.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.benefit}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAsk(service.topic)}
                          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors mt-1"
                        >
                          <MessageCircle className="h-3 w-3" />
                          {t.services.ask_cta}
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>

  );
}
