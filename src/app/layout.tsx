import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julieanna | Product Design and Web Portfolio",
  description: "Portfolio featuring web products, themed demos, and internship projects including PodManager.ai work.",
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-fuchsia-200/35 blur-3xl" />
              <div className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/25 blur-3xl" />
            </div>

            <Navbar />
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}