import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  FolderKanban,
  Briefcase,
  Image,
  Phone,
  Share2,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export type AdminPage =
  | 'dashboard'
  | 'company'
  | 'directors'
  | 'projects'
  | 'careers'
  | 'branding'
  | 'contact'
  | 'social'
  | 'settings';

interface AdminLayoutProps {
  current: AdminPage;
  onNavigate: (page: AdminPage) => void;
  children: ReactNode;
}

const navItems: { id: AdminPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'company', label: 'Company Information', icon: Building2 },
  { id: 'directors', label: 'Director Board', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'branding', label: 'Branding', icon: Image },
  { id: 'contact', label: 'Contact Information', icon: Phone },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'settings', label: 'Website Settings', icon: Settings },
];

export function AdminLayout({ current, onNavigate, children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-ink/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-line bg-surface transition-transform duration-300 lg:sticky ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-on-accent">
              <span className="text-sm font-bold">E</span>
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-ink">Evox CMS</p>
              <p className="text-xs text-faint">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-muted hover:text-ink lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-on-accent shadow-glow'
                    : 'text-muted hover:bg-surface-muted hover:text-ink'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-line px-3 py-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-ink"
          >
            <ExternalLink size={18} />
            View Website
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-300"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-ink lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-ink">{navItems.find((item) => item.id === current)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle compact />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted">
                <span className="text-sm font-medium text-ink-soft">A</span>
              </div>
              <span className="hidden text-sm font-medium text-ink-soft sm:block">Administrator</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
