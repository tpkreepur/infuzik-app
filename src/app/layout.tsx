// src/app/layout.tsx
import './globals.css';
import { siteInfo } from '@/lib/site-info';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-platinum text-charcoal dark:bg-platinum-dark dark:text-ivory">
        <div className="fixed top-20 left-0 w-full h-[300px] pointer-events-none z-[-1] bg-[url('/static/images/theta.svg')] bg-no-repeat bg-top bg-cover" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
