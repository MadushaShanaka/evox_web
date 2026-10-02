import { useState, useEffect } from 'react';
import { Save, Phone, Mail, MessageCircle } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { SocialMedia } from '@/types';
import { TextField, Toggle } from '@/components/ui/Field';
import { useToast } from '@/components/ui/Modal';
import { reportProjectSave } from '@/lib/storage';

export function ContactManager() {
  const { data, updateSocial } = useContent();
  const { showToast, toastEl } = useToast();
  const [form, setForm] = useState<SocialMedia | null>(null);

  useEffect(() => {
    if (data) setForm(data.social);
  }, [data]);

  if (!data || !form) return null;

  const handleSave = () => {
    void reportProjectSave(() => updateSocial(form), showToast, 'Contact information saved.');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Contact Information</h2>
          <p className="text-sm text-muted mt-0.5">Primary contact details shown across the site</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save
        </button>
      </div>

      <div className="p-6 space-y-4 panel rounded-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <Phone size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">Primary Contact</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="info@evoxtech.com"
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+94 11 234 5678"
          />
        </div>
        <TextField
          label="WhatsApp Number"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          placeholder="+94 77 123 4567"
        />
      </div>

      <div className="p-6 space-y-4 panel rounded-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <MessageCircle size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">Social Media Links</h3>
        </div>
        <p className="text-xs text-muted">Only enabled links will appear on the public website.</p>
        {(['linkedin', 'facebook', 'instagram', 'youtube', 'github', 'other'] as const).map((platform) => (
          <div key={platform} className="flex items-start gap-4">
            <div className="w-40 flex-shrink-0 pt-2.5">
              <Toggle
                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                checked={form.enabled[platform]}
                onChange={(v) => setForm({ ...form, enabled: { ...form.enabled, [platform]: v } })}
              />
            </div>
            <div className="flex-1">
              <TextField
                label=""
                value={form[platform]}
                onChange={(e) => setForm({ ...form, [platform]: e.target.value })}
                placeholder={`https://${platform}.com/...`}
                disabled={!form.enabled[platform]}
              />
            </div>
          </div>
        ))}
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
