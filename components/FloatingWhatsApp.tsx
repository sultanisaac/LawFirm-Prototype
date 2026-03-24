"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralWhatsAppLink } from "@/lib/cta-links";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        "fixed z-[60] bottom-6 right-5 md:bottom-8 md:right-8 transition-all duration-500 ease-out",
        show ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90 pointer-events-none"
      )}
    >
      <div className="relative group flex flex-col items-end gap-2">
        {/* Tooltip bubble — desktop hover */}
        <div className={cn(
          "hidden md:block absolute bottom-full mb-3 right-0 bg-[#1a1f2e] text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 whitespace-nowrap shadow-xl transition-all duration-200",
          tooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
        )}>
          We usually respond within 2 hours
          <span className="absolute bottom-[-5px] right-4 w-2.5 h-2.5 bg-[#1a1f2e] border-b border-r border-white/10 rotate-45" />
        </div>

        <div className="flex items-center gap-2">
          {/* Dismiss — only visible on hover/group-hover */}
          <button
            onClick={() => setIsDismissed(true)}
            className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>

          {/* FAB — pill on desktop, circle on mobile */}
          <a
            href={buildGeneralWhatsAppLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className={cn(
              "flex items-center gap-2.5 font-bold text-white bg-[#25D366] hover:bg-[#20ba56]",
              "shadow-[0_8px_30px_-6px_rgba(37,211,102,0.55)] border-0 transition-all duration-200 active:scale-95",
              // Mobile: circle FAB  |  Desktop: pill button
              "h-14 w-14 rounded-full justify-center",
              "md:h-12 md:w-auto md:rounded-full md:px-5 md:gap-2"
            )}
          >
            <div className="relative shrink-0">
              <MessageCircle className="h-6 w-6 fill-white/15 md:h-5 md:w-5" />
              {/* Pulse dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
            </div>
            <span className="hidden md:inline text-sm">WhatsApp us now</span>
          </a>
        </div>
      </div>
    </div>
  );
}
