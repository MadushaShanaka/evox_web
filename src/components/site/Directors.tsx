import { useState } from 'react';
import { Users } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Director } from '@/types';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { withBase } from '@/lib/nav';

function DirectorCard({ director }: { director: Director }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(director.image) && !failed;

  return (
    <article
      tabIndex={0}
      className="group panel h-full p-6 text-center outline-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow focus-visible:border-accent/50"
    >
      <div className="relative mx-auto mb-5 h-32 w-32 lg:h-36 lg:w-36">
        <div className="absolute inset-0 rounded-full bg-accent/25 blur-md transition-opacity group-hover:opacity-80" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-line bg-surface-muted shadow-card">
          {showImage ? (
            <>
              {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-muted" />}
              <img
                src={withBase(director.image)}
                alt={director.name}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </>
          ) : (
            <Users size={40} className="text-faint" />
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-ink">{director.name}</h3>
      <p className="mt-1 text-sm font-medium text-accent">{director.designation}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:max-h-48 sm:group-hover:opacity-100 sm:group-focus-within:max-h-48 sm:group-focus-within:opacity-100">
        {director.bio}
      </p>
    </article>
  );
}

export function Directors() {
  const { data } = useContent();
  if (!data) return null;

  const directors = [...data.directors]
    .filter((director) => director.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="directors" className="scroll-mt-20 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Leadership"
          title="Board of Directors"
          description={`The visionaries guiding ${data.company.name}`}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {directors.map((director, index) => (
            <Reveal key={director.id} delay={(index % 4) * 70} className="h-full">
              <DirectorCard director={director} />
            </Reveal>
          ))}
        </div>

        {directors.length === 0 && (
          <div className="py-16 text-center">
            <Users className="mx-auto text-faint" size={48} />
            <p className="mt-4 text-muted">No directors to display.</p>
          </div>
        )}
      </div>
    </section>
  );
}
