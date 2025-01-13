import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import { bodoni, inter } from "./fonts";
import Navigation from "@/components/navigation";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
// const bodoni = Bodoni_Moda({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infuzik - Entrain Your Brain",
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
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-neutral-900`}
      >
        <Navigation />
        <div className="animated fade-in">{children}</div>
      </body>
    </html>
  );
}
