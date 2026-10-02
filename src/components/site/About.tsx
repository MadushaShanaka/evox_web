import { Target, Eye, Rocket } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About() {
  const { data } = useContent();
  if (!data) return null;

  const pillars = [
    { label: 'R&D', text: data.company.tagline },
    { label: 'Digital solutions', text: data.company.description },
    { label: 'Software engineering', text: data.company.mission },
    { label: 'Industry innovation', text: data.company.vision },
  ];

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="About Us" title="Building Tomorrow's Technology, Today" />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="panel h-full p-8">
              <p className="text-lg leading-relaxed text-muted">{data.company.about}</p>
              <p className="mt-6 text-sm font-medium text-accent">Founded {data.company.foundedYear}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <Reveal delay={80}>
              <article className="panel h-full bg-accent-fade p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-semibold text-ink">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{data.company.mission}</p>
              </article>
            </Reveal>
            <Reveal delay={140}>
              <article className="panel h-full p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-accent">
                  <Eye size={20} />
                </div>
                <h3 className="text-lg font-semibold text-ink">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{data.company.vision}</p>
              </article>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.label} delay={index * 60}>
              <article className="panel h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{pillar.label}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {data.company.registration && (
          <Reveal>
            <div className="mt-8 flex items-center justify-center gap-3 text-center text-sm text-muted">
              <Rocket size={16} className="shrink-0 text-accent" />
              <span>{data.company.registration}</span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
