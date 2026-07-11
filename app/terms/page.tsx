"use client";

import { ActiveHeader } from "@/components/header/Header";
import { ActiveFooter } from "@/components/footer/Footer";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
                Back to Home
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center border border-amber-500/20">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-sm font-bold tracking-widest uppercase text-amber-500">Legal Agreement</p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              Terms of Use
            </h1>
            <p className="text-muted-foreground/80 font-medium">
              Last updated: October 15, 2023
            </p>
          </div>

          <div className="prose prose-invert prose-amber max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-li:text-muted-foreground/90 bg-[#10141e]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Legal Services</h2>
            <p className="mb-4 text-white/70 leading-relaxed">
              NUSALEXA provides legal consulting, representation, and advisory services. The information provided on this website does not constitute legal advice and is for informational purposes only. Use of this website does not create an attorney-client relationship between you and NUSALEXA.
            </p>
            <p className="mb-8 text-white/70 leading-relaxed">
              An attorney-client relationship is only established upon the execution of a formal written engagement letter between you and the firm.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
            <p className="mb-4 text-white/70 leading-relaxed">
              You agree to use our website only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc pl-6 mb-8 text-white/70 space-y-2">
              <li>Using the site in any way that violates applicable local, national, or international law.</li>
              <li>Attempting to interfere with the proper working of the website.</li>
              <li>Engaging in unauthorized data collection or scraping.</li>
              <li>Submitting false or misleading information through our booking or contact forms.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of NUSALEXA or its content suppliers and protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              The information and services on this website are provided on an "as is" and "as available" basis. NUSALEXA makes no representations or warranties of any kind, express or implied, as to the operation of the site or the information, content, or materials included on this site.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              In no event shall NUSALEXA, its partners, associates, or employees be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this website or with the delay or inability to use this website.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Changes to Terms</h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.
            </p>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm">
                If you have any questions regarding these Terms of Use, please contact us at <a href="mailto:legal@nusalexa.com" className="text-amber-500 hover:underline">legal@nusalexa.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <ActiveFooter />
    </div>
  );
}
