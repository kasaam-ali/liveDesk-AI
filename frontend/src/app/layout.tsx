import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LiveDesk AI — Visual AI Receptionist",
  description:
    "An AI-powered virtual receptionist for schools and clinics. Conducts voice conversations, fills forms, books appointments, and sends WhatsApp confirmations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#0a0e27', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
