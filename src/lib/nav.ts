import { useEffect, useState, type MouseEvent } from 'react';

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current !== next) {
    window.history.pushState(null, '', next);
  }
  window.dispatchEvent(new Event('evox-navigate'));
  if (url.hash) {
    window.setTimeout(() => {
      document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
    }, 40);
  }
}

export function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener('evox-navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('evox-navigate', sync);
    };
  }, []);

  return path;
}

export function onSiteClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  navigate(event.currentTarget.getAttribute('href') || '/');
}

export function adminPath(page: string) {
  if (page === 'dashboard') return '/admin';
  return `/admin/${page}`;
}
