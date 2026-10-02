import { useEffect } from 'react';

export function generateSitemap() {
  const baseUrl = 'https://evoxtechnologies.com';
  const pages = [
    '',
    '/services',
    '/industries',
    '/case-studies',
    '/about',
    '/careers',
    '/insights',
    '/contact',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}

export function useSitemap() {
  useEffect(() => {
    // Generate sitemap on client side (for development)
    if (process.env.NODE_ENV === 'development') {
      const sitemap = generateSitemap();
      console.log('Generated sitemap:', sitemap);
    }
  }, []);

  return generateSitemap();
}

