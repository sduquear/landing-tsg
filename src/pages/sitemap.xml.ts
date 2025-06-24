import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://totalsportsgroup.es',
  trailingSlash: 'never',
});

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      url: '/experiences',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (page) => `  <url>
    <loc>https://totalsportsgroup.es${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>https://totalsportsgroup.es/images/facilities-bg.webp</image:loc>
      <image:title>Total Sports Group - Football Experiences in Spain</image:title>
      <image:caption>Professional football experiences and training programs</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
} 