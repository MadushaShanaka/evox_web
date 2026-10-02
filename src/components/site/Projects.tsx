import { useState } from 'react';
import { Star, ExternalLink, FolderKanban, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const statusTone = {
  completed: 'success',
  'in-progress': 'warning',
  planned: 'muted',
} as const;

function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.image) && !failed;

  return (
    <article className="group panel flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
      <div className="relative aspect-video overflow-hidden bg-surface-muted">
        {showImage ? (
          <>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-muted" />}
            <img
              src={project.image}
              alt={project.title}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FolderKanban size={40} className="text-faint" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
        {project.featured && (
          <span className="absolute right-3 top-3">
            <Badge tone="featured">
              <Star size={12} /> Featured
            </Badge>
          </span>
        )}
        <ArrowUpRight
          size={18}
          className="absolute bottom-3 right-3 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone={statusTone[project.status]}>{project.status}</Badge>
          {project.industry && <span className="text-xs text-faint">{project.industry}</span>}
        </div>
        <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md border border-line bg-surface-muted px-2 py-0.5 text-xs text-ink-soft">
              {tech}
            </span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            View Project <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { data } = useContent();
  if (!data) return null;

  const projects = [...data.projects].sort((a, b) => a.displayOrder - b.displayOrder);
  const featured = projects.filter((project) => project.featured);
  const display = featured.length > 0 ? featured : projects;

  return (
    <section id="projects" className="scroll-mt-20 bg-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Work"
          title="Featured Projects"
          description="A selection of our most impactful work across industries"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {display.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 70} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {display.length === 0 && (
          <div className="py-16 text-center">
            <FolderKanban className="mx-auto text-faint" size={48} />
            <p className="mt-4 text-muted">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
