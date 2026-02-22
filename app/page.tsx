"use client";

import { ActiveHeader } from "@/components/header/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { ActiveFooter } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ActiveHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <HowItWorks />
        <FAQ />
        <ContactForm />
      </main>
      <ActiveFooter />
    </div>
  );
}
