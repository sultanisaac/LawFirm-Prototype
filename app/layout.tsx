import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { BookingProvider } from '@/context/BookingContext';
import { PrototypeBanner } from '@/components/PrototypeBanner';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BookingModal } from '@/components/booking/BookingModal';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NUSALEXA LAW OFFICE - Law Firm Prototype',
  description:
    'Fast, clear, and practical legal counsel for SMEs, startups, and investors in Indonesia.',
  icons: {
    icon: '/lawfirmlogo.png',
  },
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
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
