import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type React from "react";

import { BackgroundRipple } from "@/components/effects/background-ripple";
import "../styles/oxcil.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Oxcil | AI Workflow Operator Console",
  description:
    "Oxcil runs business workflows across existing tools with transparent plans, live execution state, approvals, and reusable results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <BackgroundRipple />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
