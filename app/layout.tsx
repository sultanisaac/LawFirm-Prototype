import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { BookingProvider } from '@/context/BookingContext';
import { PrototypeBanner } from '@/components/PrototypeBanner';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BookingModal } from '@/components/booking/BookingModal';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NUSALEXA Law Office — Business-First Legal Counsel in Jakarta',
  description:
    'Fast, clear, and practical legal counsel for SMEs, startups, and investors in Indonesia.',
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
          <BookingProvider>
            <BookingModal />
            {children}
            <FloatingWhatsApp />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
