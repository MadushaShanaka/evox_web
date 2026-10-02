import {
  FolderKanban,
  Briefcase,
  Users,
  Building2,
  Share2,
  TrendingUp,
  Star,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { AdminPage } from '@/components/admin/AdminLayout';
import { withBase } from '@/lib/nav';

interface DashboardProps {
  onNavigate: (page: AdminPage) => void;
}

export function AdminDashboard({ onNavigate }: DashboardProps) {
  const { data } = useContent();
  if (!data) return null;

  const openRoles = data.careers.filter((job) => job.status === 'Published').length;
  const featuredProjects = data.projects.filter((p) => p.featured).length;
  const activeDirectors = data.directors.filter((d) => d.active).length;
  const completedProjects = data.projects.filter((p) => p.status === 'completed').length;
  const inProgressProjects = data.projects.filter((p) => p.status === 'in-progress').length;
  const enabledSocials = Object.values(data.social.enabled).filter(Boolean).length;

  const stats = [
    { label: 'Open Roles', value: openRoles, icon: Briefcase, color: 'sky', page: 'careers' as AdminPage },
    { label: 'Total Projects', value: data.projects.length, icon: FolderKanban, color: 'sky', page: 'projects' as AdminPage },
    { label: 'Featured Projects', value: featuredProjects, icon: Star, color: 'amber', page: 'projects' as AdminPage },
    { label: 'Directors', value: data.directors.length, icon: Users, color: 'blue', page: 'directors' as AdminPage },
    { label: 'Active Directors', value: activeDirectors, icon: Eye, color: 'emerald', page: 'directors' as AdminPage },
  { label: 'Social Channels', value: enabledSocials, icon: Share2, color: 'violet', page: 'social' as AdminPage },
    { label: 'Completed Projects', value: completedProjects, icon: CheckCircle2, color: 'teal', page: 'projects' as AdminPage },
  { label: 'In Progress', value: inProgressProjects, icon: Clock, color: 'orange', page: 'projects' as AdminPage },
    { label: 'Company Founded', value: data.company.foundedYear, icon: TrendingUp, color: 'rose', page: 'company' as AdminPage },
  ];

  const colorMap: Record<string, string> = {
    sky: 'bg-accent-soft text-accent',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    blue: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
    emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    violet: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
    teal: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
    orange: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
    rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  };

  const quickLinks: { label: string; desc: string; icon: typeof Building2; page: AdminPage }[] = [
    { label: 'Edit Company Info', desc: 'Update name, mission, about', icon: Building2, page: 'company' },
    { label: 'Manage Projects', desc: 'Add or edit project portfolio', icon: FolderKanban, page: 'projects' },
    { label: 'Manage Careers', desc: 'Publish and edit job vacancies', icon: Briefcase, page: 'careers' },
    { label: 'Director Board', desc: 'Manage leadership profiles', icon: Users, page: 'directors' },
    { label: 'Update Branding', desc: 'Logos, favicon, dark/light', icon: Star, page: 'branding' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="panel relative overflow-hidden bg-ink p-6 text-canvas lg:p-8">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold">Welcome back, Administrator</h2>
          <p className="mt-1 text-sm text-canvas/70">
            Manage all content for {data.company.name} from this dashboard.
          </p>
          <p className="mt-3 text-xs text-canvas/50">
            Tagline: "{data.company.tagline}"
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => onNavigate(stat.page)}
              className="panel rounded-xl p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${colorMap[stat.color]}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className="group flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">{link.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{link.desc}</p>
                </div>
                <ArrowRight size={16} className="flex-shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent projects preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Recent Projects</h3>
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-strong"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="panel overflow-hidden rounded-xl">
          {data.projects.slice(0, 5).map((project, i) => (
            <div
              key={project.id}
              className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-muted ${
                i !== 0 ? 'border-t border-line' : ''
              }`}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                {project.image ? (
                  <img src={withBase(project.image)} alt="" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <FolderKanban size={18} className="text-faint" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{project.title}</p>
                <p className="text-xs text-muted">{project.industry}</p>
              </div>
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <Star size={12} /> Featured
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  project.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : project.status === 'in-progress'
                    ? 'bg-orange-500/10 text-orange-700 dark:text-orange-300'
                    : 'bg-surface-muted text-muted'
                }`}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
