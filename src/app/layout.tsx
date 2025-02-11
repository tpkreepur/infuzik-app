import './globals.css';
import { Metadata } from 'next';
// import {
//   Cormorant,
//   Montserrat,
//   Roboto_Condensed,
//   Italiana,
// } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Infuzik - Elite Brain Enhancement',
  description: 'Empower your cognitive performance with Infuzik',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://infuzik.com/',
    siteName: 'Infuzik',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@infuzik',
    creator: '@infuzik',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
