import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infuzik - Entrain Your Mind",
  description: "Binaural beats and isochronic tones for focus and relaxation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-neutral-900`}>
        <Navigation />
        <div className="animated fade-in">{children}</div>
      </body>
    </html>
  );
}
