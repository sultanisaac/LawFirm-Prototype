"use client";

import { MessageCircle, Building2, Shield, Gavel, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";

export function Services() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();

  const tabKeys: Array<"setup" | "protection" | "disputes"> = [
    "setup",
    "protection",
    "disputes",
  ];

  const getTabIcon = (key: string) => {
    switch (key) {
      case "setup": return <Building2 className="h-4 w-4 shrink-0" />;
      case "protection": return <Shield className="h-4 w-4 shrink-0" />;
      case "disputes": return <Gavel className="h-4 w-4 shrink-0" />;
      default: return null;
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
    openBookingModal();
  };

  return (
    <section id="services" className="section-padding border-t border-border/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-600/[0.03] blur-[80px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center mb-12 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3">Practice Areas</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <Tabs defaultValue="setup" className="w-full">
          {/* 
            Mobile: horizontal scrolling tab bar (no wrapping)
            Desktop: centered, flex-nowrap pill tabs
          */}
          <div className="mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex sm:justify-center">
            <TabsList className={cn(
              "flex flex-nowrap w-full sm:w-auto overflow-x-auto scrollbar-none",
              "bg-secondary/50 border border-border/80 p-1.5 gap-1.5 rounded-2xl",
              // Ensure no wrapping on mobile
              "min-w-0"
            )}>
              {tabKeys.map((key) => {
                const count = t.services.items.filter((item) => item.tab === key).length;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "flex items-center gap-2 text-sm font-semibold transition-all shrink-0",
                      "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-black/20",
                      "px-4 py-2.5 rounded-xl whitespace-nowrap"
                    )}
                  >
                    {getTabIcon(key)}
                    <span>{t.services.tabs[key]}</span>
                    <span className="ml-1 flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-muted-foreground/10 text-[10px] font-bold">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {tabKeys.map((key) => {
            const items = t.services.items.filter((item) => item.tab === key);
            return (
              <TabsContent
                key={key}
                value={key}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "group relative flex flex-col rounded-2xl overflow-hidden border border-border/60",
                        "bg-card/40 backdrop-blur-sm transition-all duration-300",
                        "hover:border-amber-500/40 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4),0_0_25px_hsl(38_78%_52%/0.07)]",
                        "hover:-translate-y-0.5"
                      )}
                    >
                      {/* Top amber accent line on hover */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/60 transition-all duration-500" />

                      <div className="flex flex-col gap-4 p-6 flex-1">
                        <div className="flex-1 space-y-3">
                          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-amber-400 transition-colors duration-200">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground/85 leading-relaxed">
                            {service.benefit}
                          </p>
                        </div>

                        {/* Deliverable chip */}
                        <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 w-fit">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500/70 shrink-0" />
                          <span className="text-[11px] font-medium text-emerald-400/80 italic">
                            {getDeliverable(service.id)}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleAsk(service.topic)}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 py-3.5 border-t border-amber-500/10",
                          "text-xs font-bold text-amber-500/80 hover:text-amber-400",
                          "bg-transparent hover:bg-amber-500/5 transition-all duration-200 min-h-[46px]",
                          "group-hover:border-amber-500/20"
                        )}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        Ask about this
                        <ArrowRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>
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
