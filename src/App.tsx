import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ContentProvider, useContent } from '@/context/ContentContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminPanel } from '@/pages/AdminPanel';
import { PublicSite } from '@/pages/PublicSite';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navigate, usePathname } from '@/lib/nav';
import { applySeo } from '@/lib/seo';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { data, loading } = useContent();
  const path = usePathname();
  const inAdmin = path === '/admin' || path.startsWith('/admin/');

  useEffect(() => {
    if (data && !path.startsWith('/careers')) {
      applySeo(data.settings.title, data.settings.metaDescription);
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon && data.branding.favicon) {
        favicon.setAttribute('href', data.branding.favicon);
      }
    }
  }, [data, path]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas">
        <div className="h-16 border-b border-line bg-surface/80" />
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-20 sm:px-6">
          <div className="h-4 w-28 animate-pulse rounded-full bg-surface-muted" />
          <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-surface-muted" />
          <div className="h-24 w-full max-w-2xl animate-pulse rounded-2xl bg-surface-muted" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
            <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
            <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (inAdmin) {
    if (!isAuthenticated) {
      return (
        <div className="page-enter">
          <AdminLogin />
          <div className="fixed bottom-4 left-4 z-20 flex items-center gap-3">
            <ThemeToggle compact />
            <button onClick={() => navigate('/')} className="btn-ghost text-xs">
              Back to website
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="page-enter">
        <AdminPanel onExit={() => navigate('/')} />
      </div>
    );
  }

  return (
    <div className="page-enter">
      <PublicSite onAdminClick={() => navigate('/admin')} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
