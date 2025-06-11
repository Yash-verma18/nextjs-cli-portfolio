// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Ensure globals.css is imported

import { IBM_Plex_Mono } from "next/font/google"; // Correctly importing IBM Plex Mono

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono", // Changed to be more conventional
  display: "swap",
});

export const metadata: Metadata = {
  title: 'My CLI Resume',
  description: 'Interactive portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable}`}> {/* This applies the CSS variable class to the html tag */}
      <body className="font-mono">{children}</body>
    </html>
  )
}