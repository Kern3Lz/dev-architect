import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
