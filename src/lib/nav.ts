import { useEffect, useState, type MouseEvent } from 'react';

// Path the site is served from, without a trailing slash ('' at the domain root,
// '/evox_web' on GitHub Pages). Set at build time via Vite's `base` option.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative app path or asset URL with the deployment base. */
export function withBase(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path;
}

function stripBase(path: string) {
  if (!BASE) return path;
  if (path === BASE) return '/';
  return path.startsWith(`${BASE}/`) ? path.slice(BASE.length) : path;
}

export function navigate(to: string) {
  const url = new URL(withBase(to), window.location.origin);
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
  const [path, setPath] = useState(() => stripBase(window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(stripBase(window.location.pathname));
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
  navigate(stripBase(event.currentTarget.getAttribute('href') || '/'));
}

export function adminPath(page: string) {
  if (page === 'dashboard') return '/admin';
  return `/admin/${page}`;
}
