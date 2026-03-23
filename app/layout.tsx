import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { PrototypeBanner } from '@/components/PrototypeBanner';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NUSALEXA Law Office — Business-First Legal Counsel in Jakarta',
  description:
    'Fast, clear, and practical legal counsel for SMEs, startups, and investors in Indonesia. Bilingual EN/ID.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <PrototypeBanner />
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
