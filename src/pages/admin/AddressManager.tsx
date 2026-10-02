import { useState, useEffect } from 'react';
import { Save, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { CompanyAddress } from '@/types';
import { TextField } from '@/components/ui/Field';
import { useToast } from '@/components/ui/Modal';
import { reportProjectSave } from '@/lib/storage';

export function AddressManager() {
  const { data, updateAddress } = useContent();
  const { showToast, toastEl } = useToast();
  const [form, setForm] = useState<CompanyAddress | null>(null);

  useEffect(() => {
    if (data) setForm(data.address);
  }, [data]);

  if (!data || !form) return null;

  const handleSave = () => {
    void reportProjectSave(() => updateAddress(form), showToast, 'Address saved.');
  };

  const fullAddress = [form.line1, form.line2, form.city, form.province, form.country, form.postalCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Company Address</h2>
          <p className="text-sm text-muted mt-0.5">Used in contact section, footer, and map</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save
        </button>
      </div>

      <div className="panel rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <MapPin size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">Address Details</h3>
        </div>
        <TextField
          label="Address Line 1"
          value={form.line1}
          onChange={(e) => setForm({ ...form, line1: e.target.value })}
          placeholder="No. 142, Galle Road"
        />
        <TextField
          label="Address Line 2"
          value={form.line2}
          onChange={(e) => setForm({ ...form, line2: e.target.value })}
          placeholder="Colombo 03"
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <TextField
            label="Province / State"
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
          <TextField
            label="Postal Code"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          />
        </div>
        <TextField
          label="Google Maps Embed URL"
          value={form.mapsUrl}
          onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-line bg-surface-muted p-5">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Preview</p>
        <div className="flex items-start gap-2 text-sm text-ink-soft">
          <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <span>{fullAddress || 'No address set'}</span>
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
