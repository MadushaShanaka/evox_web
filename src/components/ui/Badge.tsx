import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'featured' | 'muted';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-muted text-ink-soft',
  accent: 'bg-accent-soft text-accent',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  warning: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  featured: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  muted: 'bg-surface-muted text-muted',
};

export function Badge({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
