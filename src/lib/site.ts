// Public base URL, used for metadata, Open Graph images, and the sitemap.
// Set NEXT_PUBLIC_SITE_URL in Vercel if you use a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
