import { useMemo, useState, type ReactNode } from 'react';
import { Briefcase, Copy, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { ConfirmDialog, useToast } from '@/components/ui/Modal';
import { SelectField, TextArea, TextField, Toggle } from '@/components/ui/Field';
import { usePathname, navigate } from '@/lib/nav';
import { formatCareerDate, methodLabel, slugify } from '@/lib/careers';
import { reportProjectSave } from '@/lib/storage';
import type { ApplicationMethod, Career, CareerStatus } from '@/types';

const emptyCareer = (): Career => ({
  id: '',
  title: '',
  slug: '',
  department: '',
  location: '',
  employmentType: 'Full Time',
  experienceLevel: '',
  shortDescription: '',
  description: '',
  responsibilities: [''],
  requirements: [''],
  skills: [],
  preferredSkills: [],
  benefits: [''],
  salary: '',
  applicationMethod: 'email',
  applicationEmail: '',
  applicationUrl: '',
  applicationInstructions: '',
  postedDate: new Date().toISOString().slice(0, 10),
  applicationDeadline: '',
  status: 'Draft',
  featured: false,
});

function cleanList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

export function CareersManager() {
  const path = usePathname();
  const editId = path.match(/^\/admin\/careers\/edit\/([^/]+)\/?$/)?.[1];
  if (path === '/admin/careers/add' || editId) {
    return <CareerForm key={editId ?? 'new'} careerId={editId ? decodeURIComponent(editId) : null} />;
  }
  return <CareerList />;
}

function CareerList() {
  const { data, updateCareers } = useContent();
  const { showToast, toastEl } = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const jobs = data?.careers ?? [];
  const departments = useMemo(
    () => [...new Set(jobs.map((job) => job.department).filter(Boolean))].sort(),
    [jobs],
  );
  const visible = jobs.filter((job) => {
    const haystack = `${job.title} ${job.department} ${job.location}`.toLowerCase();
    if (query && !haystack.includes(query.trim().toLowerCase())) return false;
    if (status && job.status !== status) return false;
    if (department && job.department !== department) return false;
    return true;
  });

  if (!data) {
    return <div className="panel h-40 animate-pulse rounded-xl bg-surface-muted" />;
  }

  const save = (next: Career[], message: string) => {
    void reportProjectSave(() => updateCareers(next), showToast, message);
  };

  const duplicate = (job: Career) => {
    const copy: Career = {
      ...job,
      id: `c${Date.now()}`,
      title: `${job.title} (Copy)`,
      slug: slugify(`${job.slug || job.title}-copy`),
      status: 'Draft',
      featured: false,
    };
    save([copy, ...jobs], 'Career duplicated');
  };

  const updateStatus = (job: Career, next: CareerStatus) => {
    save(
      jobs.map((item) => (item.id === job.id ? { ...item, status: next } : item)),
      next === 'Published' ? 'Career published' : 'Career updated',
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Careers</h2>
          <p className="mt-0.5 text-sm text-muted">{jobs.length} career opportunities</p>
        </div>
        <button onClick={() => navigate('/admin/careers/add')} className="btn-primary">
          <Plus size={18} /> Add Career
        </button>
      </div>

      <div className="panel grid gap-3 p-4 md:grid-cols-3">
        <label className="relative">
          <span className="sr-only">Search careers</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs..." className="input pl-9" />
        </label>
        <select value={department} onChange={(event) => setDepartment(event.target.value)} className="input bg-surface" aria-label="Filter by department">
          <option value="">All departments</option>
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="input bg-surface" aria-label="Filter by status">
          <option value="">All statuses</option>
          <option>Draft</option>
          <option>Published</option>
          <option>Closed</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <div className="panel px-6 py-14 text-center">
          <Briefcase className="mx-auto text-faint" size={36} />
          <p className="mt-3 text-sm text-muted">No career opportunities yet. Add the first vacancy to publish it on the website.</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="panel px-6 py-14 text-center text-sm text-muted">No careers match these filters.</div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {visible.map((job) => (
              <CareerCard
                key={job.id}
                job={job}
                onEdit={() => navigate(`/admin/careers/edit/${job.id}`)}
                onDuplicate={() => duplicate(job)}
                onDelete={() => setDeleteId(job.id)}
                onStatus={(next) => updateStatus(job, next)}
                onFeatured={() =>
                  save(
                    jobs.map((item) => (item.id === job.id ? { ...item, featured: !item.featured } : item)),
                    itemFeaturedMessage(!job.featured),
                  )
                }
              />
            ))}
          </div>
          <div className="panel hidden overflow-x-auto md:block">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-faint">
                <tr>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Posted</th>
                  <th className="px-4 py-3 font-medium">Deadline</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((job) => (
                  <tr key={job.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{job.title}</p>
                      <p className="text-xs text-muted">{job.department}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{job.location}</td>
                    <td className="px-4 py-3 text-muted">{job.employmentType}</td>
                    <td className="px-4 py-3">
                      <StatusSelect value={job.status} onChange={(next) => updateStatus(job, next)} />
                    </td>
                    <td className="px-4 py-3 text-muted">{formatCareerDate(job.postedDate)}</td>
                    <td className="px-4 py-3 text-muted">{formatCareerDate(job.applicationDeadline) || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          save(
                            jobs.map((item) => (item.id === job.id ? { ...item, featured: !item.featured } : item)),
                            itemFeaturedMessage(!job.featured),
                          )
                        }
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          job.featured ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' : 'bg-surface-muted text-muted'
                        }`}
                      >
                        <Star size={12} /> {job.featured ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <IconButton label="Edit" onClick={() => navigate(`/admin/careers/edit/${job.id}`)}>
                          <Pencil size={16} />
                        </IconButton>
                        <IconButton label="Duplicate" onClick={() => duplicate(job)}>
                          <Copy size={16} />
                        </IconButton>
                        <IconButton label={job.status === 'Published' ? 'Unpublish' : 'Publish'} onClick={() => updateStatus(job, job.status === 'Published' ? 'Draft' : 'Published')}>
                          <span className="text-[10px] font-semibold">{job.status === 'Published' ? 'Hide' : 'Live'}</span>
                        </IconButton>
                        <IconButton label="Delete" onClick={() => setDeleteId(job.id)} danger>
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          save(jobs.filter((job) => job.id !== deleteId), 'Career deleted');
        }}
        title="Delete career"
        message="Are you sure you want to delete this career opportunity?"
      />
      {toastEl}
    </div>
  );
}

function itemFeaturedMessage(featured: boolean) {
  return featured ? 'Marked as featured' : 'Removed from featured';
}

function CareerCard({
  job,
  onEdit,
  onDuplicate,
  onDelete,
  onStatus,
  onFeatured,
}: {
  job: Career;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onStatus: (status: CareerStatus) => void;
  onFeatured: () => void;
}) {
  return (
    <article className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">{job.title}</h3>
          <p className="text-xs text-muted">{job.department}</p>
        </div>
        <StatusSelect value={job.status} onChange={onStatus} />
      </div>
      <p className="mt-3 text-sm text-muted">{job.location} · {job.employmentType}</p>
      <p className="mt-1 text-xs text-faint">
        Posted {formatCareerDate(job.postedDate)}
        {job.applicationDeadline ? ` · Deadline ${formatCareerDate(job.applicationDeadline)}` : ''}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={onFeatured} className="btn-secondary px-3 py-1.5 text-xs">
          {job.featured ? 'Featured' : 'Not featured'}
        </button>
        <button onClick={onEdit} className="btn-secondary px-3 py-1.5 text-xs">Edit</button>
        <button onClick={onDuplicate} className="btn-secondary px-3 py-1.5 text-xs">Duplicate</button>
        <button onClick={() => onStatus(job.status === 'Published' ? 'Draft' : 'Published')} className="btn-secondary px-3 py-1.5 text-xs">
          {job.status === 'Published' ? 'Unpublish' : 'Publish'}
        </button>
        <button onClick={onDelete} className="btn-secondary px-3 py-1.5 text-xs text-red-600">Delete</button>
      </div>
    </article>
  );
}

function StatusSelect({ value, onChange }: { value: CareerStatus; onChange: (status: CareerStatus) => void }) {
  const tone =
    value === 'Published'
      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
      : value === 'Closed'
        ? 'bg-surface-muted text-muted'
        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300';
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as CareerStatus)}
      className={`rounded-full border-0 px-2 py-1 text-xs font-medium ${tone}`}
      aria-label="Job status"
    >
      <option>Draft</option>
      <option>Published</option>
      <option>Closed</option>
    </select>
  );
}

function IconButton({
  label,
  onClick,
  children,
  danger = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded p-1.5 text-faint transition-colors ${
        danger ? 'hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300' : 'hover:bg-accent-soft hover:text-accent'
      }`}
    >
      {children}
    </button>
  );
}

function CareerForm({ careerId }: { careerId: string | null }) {
  const { data, updateCareers } = useContent();
  const { showToast, toastEl } = useToast();
  const existing = data?.careers.find((job) => job.id === careerId);
  const [career, setCareer] = useState<Career>(() => (existing ? { ...existing } : { ...emptyCareer(), id: `c${Date.now()}` }));
  const [slugTouched, setSlugTouched] = useState(Boolean(existing));
  const [skillInput, setSkillInput] = useState('');
  const [preferredInput, setPreferredInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!data) return <div className="panel h-40 animate-pulse rounded-xl bg-surface-muted" />;
  if (careerId && !existing) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-sm text-muted">This career could not be found.</p>
        <button onClick={() => navigate('/admin/careers')} className="btn-secondary mt-4">Back to Careers</button>
      </div>
    );
  }

  const patch = (partial: Partial<Career>) => setCareer((current) => ({ ...current, ...partial }));

  const save = () => {
    const nextErrors: Record<string, string> = {};
    if (!career.title.trim()) nextErrors.title = 'Job title is required';
    const slug = slugify(career.slug || career.title);
    if (!slug) nextErrors.slug = 'Slug is required';
    if (slug && data.careers.some((job) => job.slug === slug && job.id !== career.id)) nextErrors.slug = 'This slug is already in use';
    if (!career.department.trim()) nextErrors.department = 'Department is required';
    if (career.applicationMethod === 'url' && career.applicationUrl && !/^https?:\/\//.test(career.applicationUrl)) {
      nextErrors.applicationUrl = 'Enter a full URL starting with http:// or https://';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    const next: Career = {
      ...career,
      title: career.title.trim(),
      slug,
      department: career.department.trim(),
      responsibilities: cleanList(career.responsibilities),
      requirements: cleanList(career.requirements),
      skills: cleanList(career.skills),
      preferredSkills: cleanList(career.preferredSkills),
      benefits: cleanList(career.benefits),
    };
    const exists = data.careers.some((job) => job.id === next.id);
    void reportProjectSave(
      () => updateCareers(exists ? data.careers.map((job) => (job.id === next.id ? next : job)) : [next, ...data.careers]),
      showToast,
      exists ? 'Career updated.' : 'Career added.',
    ).then((ok) => {
      if (ok) window.setTimeout(() => navigate('/admin/careers'), 400);
    });
  };

  const addSkill = (kind: 'skills' | 'preferredSkills', value: string, clear: () => void) => {
    const skill = value.trim();
    if (!skill || career[kind].includes(skill)) return;
    patch({ [kind]: [...career[kind], skill] });
    clear();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <button onClick={() => navigate('/admin/careers')} className="text-sm font-medium text-accent">
          Back to Careers
        </button>
        <h2 className="mt-2 text-xl font-semibold text-ink">{existing ? 'Edit Career' : 'Add Career'}</h2>
      </div>

      <section className="panel space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Basic Information</h3>
        <TextField
          label="Job title"
          value={career.title}
          error={errors.title}
          onChange={(event) => {
            const title = event.target.value;
            patch({ title, slug: slugTouched ? career.slug : slugify(title) });
          }}
        />
        <TextField
          label="Slug"
          value={career.slug}
          error={errors.slug}
          onChange={(event) => {
            setSlugTouched(true);
            patch({ slug: event.target.value });
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Department" value={career.department} error={errors.department} onChange={(event) => patch({ department: event.target.value })} />
          <TextField label="Location" value={career.location} onChange={(event) => patch({ location: event.target.value })} />
          <TextField label="Employment type" value={career.employmentType} onChange={(event) => patch({ employmentType: event.target.value })} />
          <TextField label="Experience level" value={career.experienceLevel} onChange={(event) => patch({ experienceLevel: event.target.value })} />
        </div>
        <TextArea label="Short description" rows={3} value={career.shortDescription} onChange={(event) => patch({ shortDescription: event.target.value })} />
        <TextArea label="Full job description" rows={6} value={career.description} onChange={(event) => patch({ description: event.target.value })} />
        <TextField label="Salary information" value={career.salary} onChange={(event) => patch({ salary: event.target.value })} placeholder="Leave blank to hide on the public page" />
      </section>

      <StringListEditor label="Responsibilities" addLabel="+ Add Responsibility" items={career.responsibilities} onChange={(responsibilities) => patch({ responsibilities })} />
      <StringListEditor label="Requirements" addLabel="+ Add Requirement" items={career.requirements} onChange={(requirements) => patch({ requirements })} />

      <section className="panel space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Skills</h3>
        <SkillEntry
          label="Required skills"
          value={skillInput}
          skills={career.skills}
          onValue={setSkillInput}
          onAdd={() => addSkill('skills', skillInput, () => setSkillInput(''))}
          onRemove={(skill) => patch({ skills: career.skills.filter((item) => item !== skill) })}
        />
        <SkillEntry
          label="Preferred skills"
          value={preferredInput}
          skills={career.preferredSkills}
          onValue={setPreferredInput}
          onAdd={() => addSkill('preferredSkills', preferredInput, () => setPreferredInput(''))}
          onRemove={(skill) => patch({ preferredSkills: career.preferredSkills.filter((item) => item !== skill) })}
        />
      </section>

      <StringListEditor label="Benefits" addLabel="+ Add Benefit" items={career.benefits} onChange={(benefits) => patch({ benefits })} />

      <section className="panel space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Application</h3>
        <SelectField
          label="Application method"
          value={career.applicationMethod}
          onChange={(event) => patch({ applicationMethod: event.target.value as ApplicationMethod })}
        >
          <option value="email">Application email</option>
          <option value="form">Application form</option>
          <option value="url">External application URL</option>
        </SelectField>
        <p className="text-xs text-muted">{methodLabel(career.applicationMethod)} is used on the public job page.</p>
        <TextField label="Application email" type="email" value={career.applicationEmail} onChange={(event) => patch({ applicationEmail: event.target.value })} />
        <TextField label="External application URL" value={career.applicationUrl} error={errors.applicationUrl} onChange={(event) => patch({ applicationUrl: event.target.value })} placeholder="https://" />
        <TextArea label="Application instructions" rows={3} value={career.applicationInstructions} onChange={(event) => patch({ applicationInstructions: event.target.value })} />
        <TextField label="Application deadline" type="date" value={career.applicationDeadline} onChange={(event) => patch({ applicationDeadline: event.target.value })} />
      </section>

      <section className="panel space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Publishing</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Status" value={career.status} onChange={(event) => patch({ status: event.target.value as CareerStatus })}>
            <option>Draft</option>
            <option>Published</option>
            <option>Closed</option>
          </SelectField>
          <TextField label="Posted date" type="date" value={career.postedDate} onChange={(event) => patch({ postedDate: event.target.value })} />
        </div>
        <Toggle label="Featured" checked={career.featured} onChange={(featured) => patch({ featured })} />
      </section>

      <div className="flex justify-end gap-3">
        <button onClick={() => navigate('/admin/careers')} className="btn-secondary">Cancel</button>
        <button onClick={save} className="btn-primary">{existing ? 'Save Changes' : 'Add Career'}</button>
      </div>
      {toastEl}
    </div>
  );
}

function StringListEditor({
  label,
  addLabel,
  items,
  onChange,
}: {
  label: string;
  addLabel: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const rows = items.length > 0 ? items : [''];
  return (
    <section className="panel space-y-3 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{label}</h3>
      {rows.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input
            value={item}
            onChange={(event) => onChange(rows.map((row, rowIndex) => (rowIndex === index ? event.target.value : row)))}
            className="input"
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
            className="btn-secondary px-3"
            aria-label={`Remove ${label} item`}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, ''])} className="text-sm font-medium text-accent">
        {addLabel}
      </button>
    </section>
  );
}

function SkillEntry({
  label,
  value,
  skills,
  onValue,
  onAdd,
  onRemove,
}: {
  label: string;
  value: string;
  skills: string[];
  onValue: (value: string) => void;
  onAdd: () => void;
  onRemove: (skill: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onAdd();
            }
          }}
          placeholder="Type a skill and press Enter"
          className="input flex-1"
        />
        <button type="button" onClick={onAdd} className="btn-secondary px-4">Add</button>
      </div>
      {skills.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 rounded-lg bg-accent-soft px-2.5 py-1 text-sm text-accent">
              {skill}
              <button type="button" onClick={() => onRemove(skill)} aria-label={`Remove ${skill}`}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
