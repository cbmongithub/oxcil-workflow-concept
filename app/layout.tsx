import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type React from "react";

import "../styles/globals.css";

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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
