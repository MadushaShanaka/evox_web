import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumb() {
  const location = useLocation();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') return null;

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
  ];

  // Build breadcrumb items from path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Convert segment to readable name
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      href: isLast ? undefined : currentPath,
    });
  });

  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-padding max-w-7xl mx-auto py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
                )}
                {index === 0 && (
                  <HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
                )}
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-sky transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.href ? `${window.location.origin}${item.href}` : undefined,
            })),
          }),
        }}
      />
    </>
  );
}
