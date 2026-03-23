"use client";

import React, { createContext, useContext } from "react";
import { copy, CopyShape } from "@/lib/copy";

interface LanguageContextValue {
  lang: "en";
  t: CopyShape;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  t: copy.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang: "en", t: copy.en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
