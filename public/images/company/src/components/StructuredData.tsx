import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
}

export function OrganizationSchema() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'Evox Technologies',
        url: 'https://evoxtechnologies.com',
        logo: 'https://evoxtechnologies.com/favicon.svg',
        description: 'Build. Integrate. Scale. Delivering reliable software solutions that ship on time and deliver measurable results.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+94-706640664',
          contactType: 'customer service',
          email: 'info@evoxtechnologies.com',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'LK',
          addressLocality: 'Sri Lanka',
        },
        sameAs: [
          'https://www.linkedin.com/company/evoxtechnologies',
        ],
        foundingDate: '2018',
        numberOfEmployees: '75+',
        industry: 'Software Development',
        services: [
          'Custom Software Development',
          'Web & Mobile Applications',
          'Cloud & DevOps',
          'Data & AI Solutions',
          'Systems Integration',
          'UI/UX Design',
        ],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'Evox Technologies',
        url: 'https://evoxtechnologies.com',
        description: 'Professional software development services for manufacturing, construction, and fabrication industries.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://evoxtechnologies.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

