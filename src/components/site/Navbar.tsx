import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { onSiteClick, usePathname } from '@/lib/nav';

interface NavbarProps {
  onAdminClick: () => void;
}

const links = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Director Board', href: '/#directors', id: 'directors' },
  { label: 'Careers', href: '/careers', id: 'careers' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export function Navbar({ onAdminClick }: NavbarProps) {
  const { data } = useContent();
  const { theme } = useTheme();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (path !== '/') return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [data, path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  if (!data) return null;

  const logo = theme === 'dark' ? data.branding.lightLogo || data.branding.mainLogo : data.branding.darkLogo || data.branding.mainLogo;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-line bg-surface/85 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-canvas/40 backdrop-blur-md'
      }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${scrolled ? 'h-14' : 'h-16'}`}>
        <a href="/#home" onClick={onSiteClick} className="flex items-center min-w-0">
          <img src={logo} alt={data.company.name} className="w-auto h-8 sm:h-9" />
        </a>

        <div className="items-center hidden gap-1 lg:flex">
          {links.map((link) => {
            const isActive = path.startsWith('/careers') ? link.id === 'careers' : active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onSiteClick}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-ink-soft'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-2 bottom-0 h-0.5 origin-center rounded-full bg-[#22B8D4] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
          <ThemeToggle />
          <button onClick={onAdminClick} className="px-4 py-2 ml-2 btn-primary">
            Admin <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="p-2 rounded-lg text-ink"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="px-4 py-4 border-t menu-in border-line bg-surface lg:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  onSiteClick(event);
                  setMobileOpen(false);
                }}
                className={`block rounded-xl px-3 py-3 text-sm font-medium ${
                  (path.startsWith('/careers') ? link.id === 'careers' : active === link.id)
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-soft hover:bg-surface-muted'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onAdminClick();
              }}
              className="w-full mt-3 btn-primary"
            >
              Admin Login <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
