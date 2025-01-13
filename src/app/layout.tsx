import type { Metadata } from "next";
import Navigation from "@/app/components/navigation";

import "./globals.css";

export const metadata: Metadata = {
  title: "Infuzik",
  description: "Entrain your brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
