import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { navigate } from '@/lib/nav';
import { applySeo } from '@/lib/seo';
import { formatCareerDate, methodLabel } from '@/lib/careers';
import type { Career } from '@/types';

interface CareerDetailProps {
  slug: string;
}

export function CareerDetail({ slug }: CareerDetailProps) {
  const { data } = useContent();
  const job = data?.careers.find((item) => item.slug === slug && item.status !== 'Draft');

  useEffect(() => {
    if (!data || !job) return;
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const description = job.shortDescription || job.description;
    applySeo(`${job.title} | Careers | ${data.company.name}`, description);
    return () => {
      applySeo(previousTitle, previousDescription);
    };
  }, [data, job]);

  useEffect(() => {
    if (window.location.hash !== '#apply') return;
    const timer = window.setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!data) return null;

  if (!job) {
    return (
      <section className="bg-canvas px-4 pb-20 pt-32">
        <div className="panel mx-auto max-w-xl px-6 py-14 text-center">
          <h1 className="text-2xl font-semibold text-ink">This role is no longer listed.</h1>
          <button onClick={() => navigate('/careers')} className="btn-primary mt-6">
            Back to Careers
          </button>
        </div>
      </section>
    );
  }

  const email = job.applicationEmail || data.company.email;

  return (
    <article className="bg-canvas px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate('/careers')} className="inline-flex items-center gap-2 text-sm font-medium text-accent">
          <ArrowLeft size={16} /> All positions
        </button>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{job.department}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{job.title}</h1>
        {job.shortDescription && <p className="mt-4 text-lg leading-relaxed text-muted">{job.shortDescription}</p>}

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <Fact label="Department" value={job.department} />
          <Fact label="Location" value={job.location} />
          <Fact label="Employment type" value={job.employmentType} />
          <Fact label="Experience" value={job.experienceLevel} />
          <Fact label="Salary" value={job.salary} />
          <Fact label="Status" value={job.status} />
          <Fact label="Posted" value={formatCareerDate(job.postedDate)} />
          <Fact label="Application deadline" value={formatCareerDate(job.applicationDeadline)} />
        </dl>

        <Block title="About the role" text={job.description} />
        <ListBlock title="Responsibilities" items={job.responsibilities} />
        <ListBlock title="Required qualifications" items={job.requirements} />
        <ListBlock title="Required skills" items={job.skills} badges />
        <ListBlock title="Preferred skills" items={job.preferredSkills} badges />
        <ListBlock title="Benefits" items={job.benefits} />

        <section id="apply" className="scroll-mt-28 panel mt-10 p-6">
          <h2 className="text-xl font-semibold text-ink">Apply</h2>
          <p className="mt-2 text-sm text-muted">{methodLabel(job.applicationMethod)}</p>
          {job.applicationInstructions && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{job.applicationInstructions}</p>}
          {job.applicationDeadline && (
            <p className="mt-3 text-sm text-muted">Applications close on {formatCareerDate(job.applicationDeadline)}.</p>
          )}
          <div className="mt-5">
            {job.status !== 'Published' ? (
              <p className="text-sm text-muted">This position is closed and is no longer accepting applications.</p>
            ) : (
              <ApplyPanel job={job} email={email} />
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

function ApplyPanel({ job, email }: { job: Career; email: string }) {
  if (job.applicationMethod === 'url' && job.applicationUrl) {
    return (
      <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
        Apply Now <ArrowRight size={16} />
      </a>
    );
  }

  if (job.applicationMethod === 'email' && email) {
    return (
      <a href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`} className="btn-primary">
        Apply by email <ArrowRight size={16} />
      </a>
    );
  }

  return <ApplicationForm jobTitle={job.title} />;
}

function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.querySelectorAll<HTMLElement>(':invalid').forEach((field) => field.classList.add('input-error'));
      return;
    }
    alert('This is a demo form. Connect a backend to receive messages.');
    setSent(true);
    form.reset();
  };

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
        <p className="text-sm">Your application for {jobTitle} was recorded in this demo. Connect a backend to receive applications.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Your Name</span>
        <input name="name" required className="input" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Your Email</span>
        <input name="email" type="email" required className="input" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Message</span>
        <textarea name="message" required rows={5} className="input resize-y" />
      </label>
      <button type="submit" className="btn-primary w-fit">
        Submit application
      </button>
    </form>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  if (!text.trim()) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{text}</p>
    </section>
  );
}

function ListBlock({ title, items, badges = false }: { title: string; items: string[]; badges?: boolean }) {
  const values = items.filter((item) => item.trim());
  if (values.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {badges ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((item) => (
            <span key={item} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          {values.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
