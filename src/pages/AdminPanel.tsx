import { AdminLayout, type AdminPage } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ProjectsManager } from '@/pages/admin/ProjectsManager';
import { CareersManager } from '@/pages/admin/CareersManager';
import { DirectorsManager } from '@/pages/admin/DirectorsManager';
import { adminPath, navigate, usePathname } from '@/lib/nav';
import { CompanyInfoManager } from '@/pages/admin/CompanyInfoManager';
import { AddressManager } from '@/pages/admin/AddressManager';
import { BrandingManager } from '@/pages/admin/BrandingManager';
import { ContactManager } from '@/pages/admin/ContactManager';
import { SettingsManager } from '@/pages/admin/SettingsManager';

interface AdminPanelProps {
  onExit: () => void;
}

function pageFromPath(path: string): AdminPage {
  if (path.startsWith('/admin/careers')) return 'careers';
  if (path.startsWith('/admin/company')) return 'company';
  if (path.startsWith('/admin/directors')) return 'directors';
  if (path.startsWith('/admin/projects')) return 'projects';
  if (path.startsWith('/admin/branding')) return 'branding';
  if (path.startsWith('/admin/contact')) return 'contact';
  if (path.startsWith('/admin/social')) return 'social';
  if (path.startsWith('/admin/settings')) return 'settings';
  return 'dashboard';
}

export function AdminPanel({ onExit }: AdminPanelProps) {
  const path = usePathname();
  const page = pageFromPath(path);

  const handleNavigate = (next: AdminPage) => {
    if (next === 'dashboard' && page === 'dashboard') {
      onExit();
      return;
    }
    navigate(adminPath(next));
  };

  return (
    <AdminLayout current={page} onNavigate={handleNavigate}>
      {page === 'dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
      {page === 'projects' && <ProjectsManager />}
      {page === 'careers' && <CareersManager />}
      {page === 'directors' && <DirectorsManager />}
      {page === 'company' && <CompanyInfoManager />}
      {page === 'branding' && <BrandingManager />}
      {page === 'contact' && <ContactManager />}
      {page === 'social' && <ContactManager />}
      {page === 'settings' && <SettingsManager />}
    </AdminLayout>
  );
}
