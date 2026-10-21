// Public origin. Vercel provides the production domain; set NEXT_PUBLIC_SITE_URL to override once a custom domain exists.
export const SITE = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
