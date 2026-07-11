"use client";

import { FlaskConical, X } from "lucide-react";
import { useState } from "react";

export function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-amber-500/10 border-b border-amber-500/30 backdrop-blur-sm">
      <div className="container-wide py-2.5 flex items-center justify-between gap-4">
        <div className="flex-1" />
        <div className="flex items-center gap-2.5 text-center">
          <FlaskConical className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-amber-300 tracking-wide">
            <span className="font-bold text-amber-400 uppercase tracking-widest">PROTOTYPE</span>
            <span className="hidden sm:inline text-amber-300/80 font-normal mx-2"> </span>
            <span className="hidden sm:inline text-amber-300/80 font-normal">
              This website is a work-in-progress prototype and not yet in live operation.
            </span>
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-400/60 hover:text-amber-400 transition-colors p-1 rounded"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
