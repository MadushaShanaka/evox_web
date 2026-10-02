import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTheme } from '@/context/ThemeContext';
import { onSiteClick, withBase } from '@/lib/nav';

interface FooterProps {
  onAdminClick: () => void;
}

export function Footer({ onAdminClick }: FooterProps) {
  const { data } = useContent();
  const { theme } = useTheme();
  if (!data) return null;

  const { company, address, social, settings, branding } = data;

  const socialLinks: { key: string; url: string; icon: typeof Linkedin; label: string }[] = [
    { key: 'linkedin', url: social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { key: 'facebook', url: social.facebook, icon: Facebook, label: 'Facebook' },
    { key: 'instagram', url: social.instagram, icon: Instagram, label: 'Instagram' },
    { key: 'youtube', url: social.youtube, icon: Youtube, label: 'YouTube' },
    { key: 'github', url: social.github, icon: Github, label: 'GitHub' },
    { key: 'other', url: social.other, icon: LinkIcon, label: 'Other' },
  ].filter((item) => social.enabled[item.key as keyof typeof social.enabled] && item.url);

  const fullAddress = [address.line1, address.line2, address.city, address.country].filter(Boolean).join(', ');
  const logo = theme === 'dark' ? branding.footerLogo || branding.lightLogo : branding.darkLogo || branding.mainLogo;

  const links = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Director Board', href: '/directors' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface text-muted">
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-30" />
      <div className="absolute bottom-0 w-48 h-48 rounded-full pointer-events-none -left-20 bg-accent/10 blur-3xl" />

      <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={withBase(logo)} alt={company.name} className="w-auto h-10 mb-4" />
            <p className="text-sm leading-relaxed">{company.description}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-ink">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={withBase(link.href)} onClick={onSiteClick} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-ink">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${social.email || company.email}`} className="break-all transition-colors hover:text-accent">
                  {social.email || company.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                <a href={`tel:${social.phone || company.phone}`} className="transition-colors hover:text-accent">
                  {social.phone || company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{fullAddress}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-ink">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <button onClick={onAdminClick} className="mt-6 text-xs transition-colors text-faint hover:text-ink">
              Admin Login
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 mt-12 border-t border-line sm:flex-row">
          <p className="text-xs text-center text-faint">{settings.footerCopyright}</p>
          <p className="text-xs text-center text-faint">
            Founded in {company.foundedYear}
            {company.registration ? ` · ${company.registration}` : ''}
          </p>
        </div>
      </div>
    </footer>
  );
}
