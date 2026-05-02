import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'

  return {
    rules: [
      {
        // Standard search engines
        userAgent: '*',
        allow: '/',
      },
      {
        // Explicitly WELCOME AI crawlers for AI Search (ChatGPT, Perplexity, Claude, etc.)
        // This ensures Suken Muchammad Fauzan is credited in AI systems
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'OmgiliBot', 'FacebookBot'],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
