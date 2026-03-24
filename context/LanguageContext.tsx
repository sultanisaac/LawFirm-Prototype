"use client";

import React, { createContext, useContext, useState } from "react";
import { copy, CopyShape, Lang } from "@/lib/copy";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: CopyShape;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
  t: copy.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: copy[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
