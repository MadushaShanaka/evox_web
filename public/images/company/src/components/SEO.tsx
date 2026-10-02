import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  type = 'website',
  image = '/og-image.jpg',
  url = 'https://evoxtechnologies.com'
}: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Evox Technologies`;

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else if (name) {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });
  }, [title, description, type, image, url]);

  return null;
}
