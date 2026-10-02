import { useRef, useState, type ChangeEvent } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { fileToDataUrl } from '@/lib/storage';
import { withBase } from '@/lib/nav';

interface ImageUploadProps {
  value: string;
  onChange: (dataUrl: string) => void;
  label: string;
  aspectRatio?: string;
}

export function ImageUpload({ value, onChange, label, aspectRatio = 'aspect-video' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be under 2MB');
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
      setError('');
    } catch {
      setError('Failed to load image');
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        className={`group relative flex ${aspectRatio} cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-line-strong bg-surface-muted transition-colors hover:border-accent hover:bg-accent-soft/40`}
      >
        {value ? (
          <>
            <img src={withBase(value)} alt={label} className="h-full w-full object-contain" />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/45 group-hover:opacity-100">
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <Upload size={16} /> Replace
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto mb-2 text-faint" size={32} />
            <span className="text-sm text-muted">Click to upload image</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-300">{error}</p>}
      <p className="mt-1 text-xs text-faint">Or paste an image URL below</p>
      <input
        type="text"
        value={value.startsWith('data:') ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/path/to/image.jpg"
        className="input mt-1"
      />
    </div>
  );
}
