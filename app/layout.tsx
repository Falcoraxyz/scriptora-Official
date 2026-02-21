import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Scriptora — AI Academic Writing IDE",
  description: "AI-powered academic IDE that structures, formats, cites, and exports your thesis automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, sora.variable, "font-sans antialiased min-h-screen bg-gradient-to-br from-[#0B0613] via-[#140A1F] to-[#0A0412]")}>
        {children}
      </body>
    </html>
  );
}
