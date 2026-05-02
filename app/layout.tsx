import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "DevArchitect — AI-Powered Project Setup",
  description:
    "Describe your project in plain English. Get a complete tech stack recommendation, production-ready boilerplate code, and comprehensive documentation — powered by 3 specialized AI agents.",
  keywords: [
    "AI",
    "developer tools",
    "project setup",
    "tech stack",
    "boilerplate generator",
    "code generator",
    "multi-agent AI",
  ],
  openGraph: {
    title: "DevArchitect — AI-Powered Project Setup",
    description:
      "From idea to code in 60 seconds. 3 AI agents generate your tech stack, boilerplate, and docs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} min-h-full flex flex-col overflow-x-hidden`}>{children}</body>
    </html>
  );
}
