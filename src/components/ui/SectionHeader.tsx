import { Reveal } from '@/components/ui/Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ eyebrow, title, description, align = 'center' }: SectionHeaderProps) {
  return (
    <Reveal>
      <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </div>
    </Reveal>
  );
}
