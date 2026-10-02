import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

interface FieldProps {
  label: string;
  className?: string;
  error?: string;
}

export function TextField({
  label,
  className = '',
  error,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label ? <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label> : null}
      <input className={`input ${error ? 'input-error' : ''}`} {...props} />
      {error ? <p className="mt-1 text-xs text-red-600 dark:text-red-300">{error}</p> : null}
    </div>
  );
}

export function TextArea({
  label,
  className = '',
  error,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      {label ? <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label> : null}
      <textarea className={`input resize-y ${error ? 'input-error' : ''}`} {...props} />
      {error ? <p className="mt-1 text-xs text-red-600 dark:text-red-300">{error}</p> : null}
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-accent' : 'bg-line-strong'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium text-ink-soft">{label}</span>
    </label>
  );
}

export function SelectField({
  label,
  className = '',
  children,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLSelectElement> & { children?: ReactNode }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label>
      <select className="input bg-surface" {...(props as Record<string, unknown>)}>
        {children}
      </select>
    </div>
  );
}
