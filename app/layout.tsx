// app/layout.tsx
import "@/styles/globals.css";
import { siteInfo } from "@/lib/site-info";
import NavBar from "@/components/NavBar";
import BackgroundSVG from "@/components/logos/BackgroundSVG";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { ReactNode } from "react";

export const metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="min-h-screen bg-platinum text-charcoal dark:bg-platinum-dark dark:text-ivory">
        <Providers>
          <NavBar />
          <main className="pt-20">
            <BackgroundSVG />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
