import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Branding } from '@/types';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/Modal';
import { reportProjectSave } from '@/lib/storage';

export function BrandingManager() {
  const { data, updateBranding } = useContent();
  const { showToast, toastEl } = useToast();
  const [form, setForm] = useState<Branding | null>(null);

  useEffect(() => {
    if (data) setForm(data.branding);
  }, [data]);

  if (!data || !form) return null;

  const handleSave = () => {
    void reportProjectSave(() => updateBranding(form), showToast, 'Branding updated.');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Branding</h2>
          <p className="text-sm text-muted mt-0.5">Logos and favicon shown across the website</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save
        </button>
      </div>

      <div className="panel rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <ImageIcon size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">Logo Assets</h3>
        </div>
        <ImageUpload
          label="Main Company Logo"
          value={form.mainLogo}
          onChange={(v) => setForm({ ...form, mainLogo: v })}
          aspectRatio="aspect-[5/1]"
        />
        <ImageUpload
          label="Footer Logo"
          value={form.footerLogo}
          onChange={(v) => setForm({ ...form, footerLogo: v })}
          aspectRatio="aspect-[5/1]"
        />
        <ImageUpload
          label="Favicon"
          value={form.favicon}
          onChange={(v) => setForm({ ...form, favicon: v })}
          aspectRatio="aspect-square"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ImageUpload
            label="Dark Version Logo"
            value={form.darkLogo}
            onChange={(v) => setForm({ ...form, darkLogo: v })}
            aspectRatio="aspect-[5/1]"
          />
          <ImageUpload
            label="Light Version Logo"
            value={form.lightLogo}
            onChange={(v) => setForm({ ...form, lightLogo: v })}
            aspectRatio="aspect-[5/1]"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-line bg-surface-muted p-5 space-y-3">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide">Live Preview</p>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="bg-surface rounded-lg px-4 py-3 border border-line">
            <img src={form.mainLogo} alt="Main" className="h-8" />
          </div>
          <div className="bg-ink rounded-lg px-4 py-3">
            <img src={form.footerLogo} alt="Footer" className="h-8" />
          </div>
          <div className="bg-surface rounded-lg p-2 border border-line">
            <img src={form.favicon} alt="Favicon" className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
      {toastEl}
    </div>
  );
}
