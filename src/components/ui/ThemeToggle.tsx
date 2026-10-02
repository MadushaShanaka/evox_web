import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme, type Theme } from '@/context/ThemeContext';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();

  const change = (next: Theme) => {
    if (next === theme) return;
    const apply = () => {
      flushSync(() => setTheme(next));
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (callback: () => void) => void };
    if (!reduce && typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(apply);
      return;
    }
    apply();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => change(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-line bg-surface-muted p-1 focus-visible:outline-none"
    >
      <span
        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6A80] text-white shadow transition-transform duration-300 dark:bg-[#2A97B3] ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
      </span>
      <span className="sr-only">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
