"use client";

import { MessageCircle, Building2, Shield, Gavel, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Services() {
  const { t, lang } = useLanguage();

  const tabKeys: Array<"setup" | "protection" | "disputes"> = [
    "setup",
    "protection",
    "disputes",
  ];

  const getTabIcon = (key: string) => {
    switch (key) {
      case "setup": return <Building2 className="h-4 w-4" />;
      case "protection": return <Shield className="h-4 w-4" />;
      case "disputes": return <Gavel className="h-4 w-4" />;
      default: return <LayoutGrid className="h-4 w-4" />;
    }
  };

  const getDeliverable = (id: string) => {
    const deliverables: Record<string, string> = {
      company: "PT / PMA Incorporation Docs",
      contracts: "Signed MoU / Contract Draft",
      "due-diligence": "Legal Audit Report",
      employment: "PKB / Employment Agreement",
      ip: "Trademark Certificate",
      compliance: "Regulatory Checklist",
      retainer: "Priority Advisor Access",
      litigation: "Court Representation Path",
      demand: "Official Legal Notice",
      property: "AJB / Certificate Verification",
    };
    return deliverables[id] || "Professional Legal Document";
  };

  const handleAsk = (topic: string) => {
    window.open(buildWhatsAppLink(topic, lang), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="services" className="section-padding border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="container-wide relative">
        <div className="text-center mb-12 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3 drop-shadow-sm">Practice Areas</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <Tabs defaultValue="setup" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-secondary/50 border border-border/80 h-auto p-1.5 gap-2 flex-wrap sm:flex-nowrap rounded-2xl">
              {tabKeys.map((key) => {
                const count = t.services.items.filter((item) => item.tab === key).length;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-2.5 text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-black/20 px-5 py-3 rounded-xl"
                  >
                    {getTabIcon(key)}
                    <span>{t.services.tabs[key]}</span>
                    <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] px-1.5 flex items-center justify-center bg-muted-foreground/10 text-[10px] rounded-full">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {tabKeys.map((key) => {
            const items = t.services.items.filter((item) => item.tab === key);
            return (
              <TabsContent key={key} value={key} className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((service) => (
                    <Card
                      key={service.id}
                      className="bg-card/50 backdrop-blur-sm border-border/80 hover:border-amber-500/40 transition-all duration-300 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),0_0_20px_hsl(38_78%_52%/0.05)] rounded-2xl overflow-hidden"
                    >
                      <CardContent className="p-6 flex flex-col gap-4 h-full">
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-foreground leading-snug mb-2 group-hover:text-amber-500 transition-colors duration-200">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4">
                            {service.benefit}
                          </p>
                          <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-secondary/40 border border-border/40 w-fit">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80" />
                            <span className="text-[11px] font-medium text-muted-foreground italic">
                              Deliverable: {getDeliverable(service.id)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAsk(service.topic)}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-amber-500/20 text-xs font-bold text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 group-hover:border-amber-500/40 min-h-[44px]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {t.services.ask_cta.replace("→", "").trim()}
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
