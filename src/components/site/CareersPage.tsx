import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Briefcase, MapPin, Search } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { GridSpotlight } from '@/components/hero/GridSpotlight';
import { Reveal } from '@/components/ui/Reveal';
import { navigate } from '@/lib/nav';
import { applySeo } from '@/lib/seo';
import { formatCareerDate, uniqueValues } from '@/lib/careers';
import type { Career } from '@/types';

const emptyFilters = {
  query: '',
  department: '',
  employmentType: '',
  experienceLevel: '',
  location: '',
};

function matches(job: Career, filters: typeof emptyFilters) {
  const query = filters.query.trim().toLowerCase();
  const haystack = [job.title, job.department, job.location, job.shortDescription, job.skills.join(' ')]
    .join(' ')
    .toLowerCase();
  if (query && !haystack.includes(query)) return false;
  if (filters.department && job.department !== filters.department) return false;
  if (filters.employmentType && job.employmentType !== filters.employmentType) return false;
  if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) return false;
  if (filters.location && job.location !== filters.location) return false;
  return true;
}

export function CareersPage() {
  const { data } = useContent();
  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    if (!data) return;
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    applySeo(
      `Careers | ${data.company.name}`,
      'Build the future with Evox Technology. Explore open roles in software engineering, research, and digital product delivery.',
    );
    return () => {
      applySeo(previousTitle, previousDescription);
    };
  }, [data]);

  const published = useMemo(
    () => (data?.careers ?? []).filter((job) => job.status === 'Published'),
    [data],
  );
  const closed = useMemo(
    () => (data?.careers ?? []).filter((job) => job.status === 'Closed'),
    [data],
  );

  if (!data) return null;

  const openRoles = published
    .filter((job) => matches(job, filters))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.postedDate.localeCompare(a.postedDate));

  const options = {
    department: uniqueValues(published.map((job) => job.department)),
    employmentType: uniqueValues(published.map((job) => job.employmentType)),
    experienceLevel: uniqueValues(published.map((job) => job.experienceLevel)),
    location: uniqueValues(published.map((job) => job.location)),
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-canvas pt-24">
        <GridSpotlight interactive={false} />
        <div className="pointer-events-none absolute -right-16 top-16 h-56 w-56 rounded-full bg-[#22B8D4]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ECF8B]" />
              Careers
            </p>
            <h1 className="mt-5 max-w-xl text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px]">
              Build the future with Evox Technology.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Join an R&D and software team that designs digital products for businesses worldwide. Explore open roles in engineering, research, and product delivery.
            </p>
            <a href="#positions" className="btn-primary mt-8">
              View available positions <ArrowRight size={16} />
            </a>
          </div>
          <div className="panel relative overflow-hidden p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Now hiring</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">{published.length}</p>
            <p className="mt-1 text-sm text-muted">{published.length === 1 ? 'Open position' : 'Open positions'}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {uniqueValues(published.flatMap((job) => job.skills)).slice(0, 6).map((skill) => (
                <span key={skill} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="positions" className="scroll-mt-24 bg-canvas py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {published.length === 0 ? (
            <div className="panel px-6 py-16 text-center">
              <Briefcase className="mx-auto text-accent" size={36} />
              <h2 className="mt-4 text-2xl font-semibold text-ink">There are currently no open positions. Please check back soon.</h2>
            </div>
          ) : (
            <>
              <div className="panel grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
                <label className="relative sm:col-span-2 lg:col-span-1">
                  <span className="sr-only">Search jobs</span>
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
                  <input
                    value={filters.query}
                    onChange={(event) => setFilters({ ...filters, query: event.target.value })}
                    placeholder="Search jobs..."
                    className="input pl-9"
                  />
                </label>
                <FilterSelect
                  label="Department"
                  value={filters.department}
                  options={options.department}
                  onChange={(department) => setFilters({ ...filters, department })}
                />
                <FilterSelect
                  label="Employment type"
                  value={filters.employmentType}
                  options={options.employmentType}
                  onChange={(employmentType) => setFilters({ ...filters, employmentType })}
                />
                <FilterSelect
                  label="Experience level"
                  value={filters.experienceLevel}
                  options={options.experienceLevel}
                  onChange={(experienceLevel) => setFilters({ ...filters, experienceLevel })}
                />
                <FilterSelect
                  label="Location"
                  value={filters.location}
                  options={options.location}
                  onChange={(location) => setFilters({ ...filters, location })}
                />
              </div>

              {openRoles.length === 0 ? (
                <div className="panel mt-6 px-6 py-14 text-center">
                  <p className="text-lg font-semibold text-ink">No positions match your search.</p>
                  <button onClick={() => setFilters(emptyFilters)} className="btn-secondary mt-4">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {openRoles.map((job, index) => (
                    <Reveal key={job.id} delay={index * 60}>
                      <JobCard job={job} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}

          {closed.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Closed Positions</h2>
              <div className="mt-6 grid gap-4 opacity-80">
                {closed.map((job) => (
                  <JobCard key={job.id} job={job} closed />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="input bg-surface" aria-label={label}>
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function JobCard({ job, closed = false }: { job: Career; closed?: boolean }) {
  return (
    <article className="panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-ink">{job.title}</h3>
            {job.featured && !closed && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                Featured
              </span>
            )}
            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted">{job.status}</span>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{job.shortDescription}</p>
        </div>
        <p className="text-xs text-faint">Posted {formatCareerDate(job.postedDate)}</p>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Meta label="Department" value={job.department} />
        <Meta label="Employment Type" value={job.employmentType} />
        <Meta label="Location" value={job.location} icon />
        <Meta label="Experience" value={job.experienceLevel} />
      </dl>

      {job.skills.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {job.applicationDeadline && (
        <p className="mt-4 text-xs text-muted">Apply by {formatCareerDate(job.applicationDeadline)}</p>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => navigate(`/careers/${job.slug}`)} className="btn-secondary">
          View Details
        </button>
        {!closed && <ApplyAction job={job} />}
      </div>
    </article>
  );
}

function Meta({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-0.5 flex items-center gap-1 font-medium text-ink">
        {icon && <MapPin size={14} className="text-accent" />}
        {value}
      </dd>
    </div>
  );
}

function ApplyAction({ job }: { job: Career }) {
  if (job.applicationMethod === 'url' && job.applicationUrl) {
    return (
      <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
        Apply Now <ArrowRight size={14} />
      </a>
    );
  }
  if (job.applicationMethod === 'email' && job.applicationEmail) {
    return (
      <a
        href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
        className="btn-primary"
      >
        Apply Now <ArrowRight size={14} />
      </a>
    );
  }
  return (
    <button onClick={() => navigate(`/careers/${job.slug}#apply`)} className="btn-primary">
      Apply Now <ArrowRight size={14} />
    </button>
  );
}
