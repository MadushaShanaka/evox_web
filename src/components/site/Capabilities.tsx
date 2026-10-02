import { AppWindow, BrainCircuit, Cloud, Smartphone, type LucideIcon } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const capabilities: { key: string; title: string; icon: LucideIcon }[] = [
  { key: 'web applications', title: 'Web applications', icon: AppWindow },
  { key: 'mobile apps', title: 'Mobile apps', icon: Smartphone },
  { key: 'cloud infrastructure', title: 'Cloud infrastructure', icon: Cloud },
  { key: 'ai-driven systems', title: 'AI-driven systems', icon: BrainCircuit },
];

export function Capabilities() {
  const { data } = useContent();
  if (!data) return null;

  const source = `${data.company.description} ${data.company.about}`.toLowerCase();
  const visible = capabilities.filter((item) => source.includes(item.key));
  if (visible.length === 0) return null;

  const specialize = data.company.description
    .split('.')
    .map((sentence) => sentence.trim())
    .find((sentence) => /specialize/i.test(sentence));

  return (
    <section className="relative bg-surface-muted/60 py-20 lg:py-28" aria-label="Capabilities">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title="Technology we already build"
          description={specialize ? `${specialize}.` : undefined}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key} delay={index * 70}>
                <article className="group panel h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-canvas text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
