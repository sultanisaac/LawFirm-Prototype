"use client";

import { ActiveHeader } from "@/components/header/Header";
import { ActiveFooter } from "@/components/footer/Footer";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ActiveHeader />
      <main className="flex-1 relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14] via-[#10141e] to-[#0b0e14] pointer-events-none" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none" />
        
        <div className="container-wide relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2 mb-6 -ml-4"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                {t.privacy.back}
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center border border-amber-500/20">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-sm font-bold tracking-widest uppercase text-amber-500">Legal Agreement</p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              {t.privacy.title}
            </h1>
            <p className="text-muted-foreground/80 font-medium leading-relaxed max-w-2xl">
              {t.privacy.intro}
            </p>
          </div>

          <div className="prose prose-invert prose-amber max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-li:text-muted-foreground/90 bg-[#10141e]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {t.privacy.sections.map((section: any, i: number) => (
              <div key={i} className="mb-8 last:mb-0">
                <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-white/70 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ActiveFooter />
    </div>
  );
}
