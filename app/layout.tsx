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
  title: "DevArchitect — Built by Suken Muchammad Fauzan",
  description:
    "DevArchitect is an AI-powered project setup tool developed by Suken Muchammad Fauzan. Describe your project and get a tech stack, code, and docs in 60 seconds.",
  keywords: [
    "Suken Muchammad Fauzan",
    "Suken Fauzan",
    "Muchammad Fauzan",
    "DevArchitect Suken",
    "portfolio Suken Muchammad Fauzan",
    "AI",
    "developer tools",
    "project setup",
    "tech stack",
    "boilerplate generator",
    "code generator",
    "multi-agent AI",
  ],
  authors: [{ name: "Suken Muchammad Fauzan", url: "https://github.com/Kern3Lz" }],
  creator: "Suken Muchammad Fauzan",
  publisher: "Suken Muchammad Fauzan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "DevArchitect — Built by Suken Muchammad Fauzan",
    description:
      "From idea to code in 60 seconds. A powerful AI developer tool engineered by Suken Muchammad Fauzan.",
    siteName: "DevArchitect by Suken Muchammad Fauzan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevArchitect — AI Tool by Suken Muchammad Fauzan",
    description: "Instantly generate tech stacks and boilerplate code with this AI tool built by Suken Muchammad Fauzan.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DevArchitect",
    "description": "AI-powered project setup tool generating tech stacks and boilerplate code.",
    "applicationCategory": "DeveloperApplication",
    "author": {
      "@type": "Person",
      "name": "Suken Muchammad Fauzan",
      "url": "https://github.com/Kern3Lz"
    },
    "creator": {
      "@type": "Person",
      "name": "Suken Muchammad Fauzan",
      "url": "https://github.com/Kern3Lz"
    }
  };

  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} min-h-full flex flex-col overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
