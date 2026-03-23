"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingWhatsApp() {
  const { t, lang } = useLanguage();
  const [show, setShow] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 500px scroll
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        "fixed z-[60] transition-all duration-500 ease-in-out",
        show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none",
        // Desktop: bottom-right, Mobile: bottom-center (full width padding)
        "bottom-6 right-6 md:bottom-8 md:right-8 left-6 md:left-auto"
      )}
    >
      <div className="relative group">
        <TooltipProvider>
          <Tooltip defaultOpen={false}>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="w-full md:w-auto h-14 md:h-16 px-6 md:px-8 rounded-2xl md:rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white font-bold gap-3 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] border-0"
              >
                <a href={buildGeneralWhatsAppLink(lang)} target="_blank" rel="noopener noreferrer">
                  <div className="relative">
                    <MessageCircle className="h-6 w-6 fill-white/20" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </div>
                  <span className="md:hidden">Start WhatsApp Consultation</span>
                  <span className="hidden md:inline">WhatsApp us now</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="mb-2 hidden md:block">
              <p>We usually respond within 2 hours</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
