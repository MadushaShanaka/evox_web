import { useState, useEffect } from 'react';
import { Save, Settings, Download, Upload, RotateCcw } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { WebsiteSettings } from '@/types';
import { TextField, TextArea } from '@/components/ui/Field';
import { useToast } from '@/components/ui/Modal';
import { exportData, importData, reportProjectSave } from '@/lib/storage';

export function SettingsManager() {
  const { data, updateSettings, replaceData, resetData } = useContent();
  const { showToast, toastEl } = useToast();
  const [form, setForm] = useState<WebsiteSettings | null>(null);

  useEffect(() => {
    if (data) setForm(data.settings);
  }, [data]);

  if (!data || !form) return null;

  const handleSave = () => {
    void reportProjectSave(() => updateSettings(form), showToast, 'Settings saved.');
  };

  const handleExport = () => {
    exportData(data);
    showToast('Data exported');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importData(file)
      .then((imported) => reportProjectSave(() => replaceData(imported), showToast, 'Data imported.'))
      .catch(() => showToast('Invalid JSON file', 'error'));
  };

  const handleReset = () => {
    if (confirm('Reload content from the project files? Unsaved edits on this page will be discarded.')) {
      resetData()
        .then(() => showToast('Content reloaded from the project files.'))
        .catch(() => showToast('Could not reload the project files.', 'error'));
    }
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Website Settings</h2>
          <p className="text-sm text-muted mt-0.5">SEO, branding references, and footer text</p>
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
          <Settings size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-ink">SEO & Metadata</h3>
        </div>
        <TextField
          label="Website Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextArea
          label="Meta Description"
          value={form.metaDescription}
          onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
          rows={3}
        />
        <TextField
          label="Footer Copyright Text"
          value={form.footerCopyright}
          onChange={(e) => setForm({ ...form, footerCopyright: e.target.value })}
        />
      </div>

      {/* Branding reference */}
      <div className="panel rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-semibold text-ink">Active Branding Assets</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-soft0"></span>
            Main Logo: <span className="text-faint truncate">{data.branding.mainLogo}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-soft0"></span>
            Favicon: <span className="text-faint truncate">{data.branding.favicon}</span>
          </div>
        </div>
        <p className="text-xs text-faint pt-1">Manage these in the Branding section.</p>
      </div>

      {/* Data management */}
      <div className="panel rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-ink">Data Management</h3>
        <p className="text-xs text-muted">
          Export your CMS data as a JSON file for backup or deployment. Import to restore from a backup.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="btn-secondary"
          >
            <Download size={16} /> Export Data
          </button>
          <label className="btn-secondary cursor-pointer">
            <Upload size={16} /> Import Data
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="btn-danger"
          >
            <RotateCcw size={16} /> Reload project files
          </button>
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
