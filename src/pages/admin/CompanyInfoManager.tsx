import { useState, useEffect } from 'react';
import { Save, Building2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { CompanyInfo } from '@/types';
import { TextField, TextArea } from '@/components/ui/Field';
import { useToast } from '@/components/ui/Modal';

export function CompanyInfoManager() {
  const { data, updateCompany } = useContent();
  const { showToast, toastEl } = useToast();
  const [form, setForm] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    if (data) setForm(data.company);
  }, [data]);

  if (!data || !form) return null;

  const handleSave = () => {
    updateCompany(form);
    showToast('Company information saved');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Company Information</h2>
          <p className="text-sm text-muted mt-0.5">Update core company details</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="p-6 space-y-4 panel rounded-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <Building2 size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">Basic Information</h3>
        </div>
        <TextField
          label="Company Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Tagline"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          placeholder="Engineering Tomorrow's Solutions, Todayee"
        />
        <TextField
          label="Founded Year"
          value={form.foundedYear}
          onChange={(e) => setForm({ ...form, foundedYear: e.target.value })}
        />
        <TextArea
          label="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="p-6 space-y-4 panel rounded-xl">
        <h3 className="pb-3 text-sm font-semibold border-b text-ink border-line">About & Mission</h3>
        <TextArea
          label="About Us"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          rows={5}
        />
        <TextArea
          label="Mission"
          value={form.mission}
          onChange={(e) => setForm({ ...form, mission: e.target.value })}
          rows={2}
        />
        <TextArea
          label="Vision"
          value={form.vision}
          onChange={(e) => setForm({ ...form, vision: e.target.value })}
          rows={2}
        />
      </div>

      <div className="p-6 space-y-4 panel rounded-xl">
        <h3 className="pb-3 text-sm font-semibold border-b text-ink border-line">Business Registration</h3>
        <TextArea
          label="Registration Information"
          value={form.registration}
          onChange={(e) => setForm({ ...form, registration: e.target.value })}
          rows={2}
          placeholder="PV 00234567 | Registered under Companies Act..."
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <Save size={18} /> Save All Changes
        </button>
      </div>
      {toastEl}
    </div>
  );
}
