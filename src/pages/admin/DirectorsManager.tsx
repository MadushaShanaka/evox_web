import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Users,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Director } from '@/types';
import { Modal, ConfirmDialog, useToast } from '@/components/ui/Modal';
import { TextField, TextArea, Toggle } from '@/components/ui/Field';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { reportProjectSave } from '@/lib/storage';
import { withBase } from '@/lib/nav';

const emptyDirector: Director = {
  id: '',
  name: '',
  designation: '',
  image: '',
  bio: '',
  displayOrder: 0,
  active: true,
};

export function DirectorsManager() {
  const { data, updateDirectors } = useContent();
  const { showToast, toastEl } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Director>(emptyDirector);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!data) return null;
  const directors = [...data.directors].sort((a, b) => a.displayOrder - b.displayOrder);

  const openAdd = () => {
    setEditing({ ...emptyDirector, id: `d${Date.now()}`, displayOrder: data.directors.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (dir: Director) => {
    setEditing({ ...dir });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editing.name.trim()) {
      showToast('Director name is required', 'error');
      return;
    }
    const exists = data.directors.some((d) => d.id === editing.id);
    const updated = exists
      ? data.directors.map((d) => (d.id === editing.id ? editing : d))
      : [...data.directors, editing];
    void reportProjectSave(
      () => updateDirectors(updated),
      showToast,
      exists ? 'Director updated.' : 'Director added.',
    ).then((ok) => {
      if (ok) setModalOpen(false);
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const id = deleteId;
    void reportProjectSave(
      () => updateDirectors(data.directors.filter((d) => d.id !== id)),
      showToast,
      'Director deleted.',
    );
  };

  const moveDirector = (id: string, dir: 'up' | 'down') => {
    const sorted = [...data.directors].sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((d) => d.id === id);
    if (dir === 'up' && idx > 0) {
      [sorted[idx], sorted[idx - 1]] = [sorted[idx - 1], sorted[idx]];
    } else if (dir === 'down' && idx < sorted.length - 1) {
      [sorted[idx], sorted[idx + 1]] = [sorted[idx + 1], sorted[idx]];
    }
    const renumbered = sorted.map((d, i) => ({ ...d, displayOrder: i + 1 }));
    void reportProjectSave(() => updateDirectors(renumbered), showToast, 'Director order saved.');
  };

  const toggleActive = (id: string) => {
    void reportProjectSave(
      () => updateDirectors(data.directors.map((d) => (d.id === id ? { ...d, active: !d.active } : d))),
      showToast,
      'Director updated.',
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Director Board</h2>
          <p className="text-sm text-muted mt-0.5">
            {data.directors.length} directors · {directors.filter((d) => d.active).length} active
          </p>
        </div>
        <button
          onClick={openAdd}
          className="btn-primary"
        >
          <Plus size={18} /> Add Director
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {directors.map((dir, i) => (
          <div
            key={dir.id}
            className="panel rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
          >
            {/* Photo */}
            <div className="w-16 h-16 rounded-full bg-surface-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
              {dir.image ? (
                <img src={withBase(dir.image)} alt="" className="w-full h-full object-cover" />
              ) : (
                <Users size={24} className="text-faint" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-ink">{dir.name}</h3>
                <span className="text-xs text-faint">#{dir.displayOrder}</span>
                {!dir.active && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-surface-muted text-muted">
                    <EyeOff size={10} /> Hidden
                  </span>
                )}
              </div>
              <p className="text-xs text-accent font-medium mt-0.5">{dir.designation}</p>
              <p className="text-xs text-muted mt-1 line-clamp-2">{dir.bio}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <div className="flex gap-1">
                <button
                  onClick={() => moveDirector(dir.id, 'up')}
                  disabled={i === 0}
                  className="p-1 rounded text-faint hover:bg-surface-muted hover:text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => moveDirector(dir.id, 'down')}
                  disabled={i === directors.length - 1}
                  className="p-1 rounded text-faint hover:bg-surface-muted hover:text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
              <button
                onClick={() => toggleActive(dir.id)}
                className="p-1 rounded text-faint hover:bg-surface-muted hover:text-muted transition-colors"
                title={dir.active ? 'Hide from website' : 'Show on website'}
              >
                {dir.active ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button
                onClick={() => openEdit(dir)}
                className="p-1 rounded text-faint hover:bg-accent-soft hover:text-accent transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(dir.id)}
                className="p-1 rounded text-faint hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {directors.length === 0 && (
          <div className="col-span-full text-center py-12 panel rounded-xl">
            <Users className="mx-auto text-faint" size={40} />
            <p className="text-muted mt-3 text-sm">No directors yet. Click "Add Director" to create one.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing.name ? 'Edit Director' : 'Add Director'}>
        <div className="space-y-4">
          <ImageUpload
            label="Profile Photo"
            value={editing.image}
            onChange={(v) => setEditing({ ...editing, image: v })}
            aspectRatio="aspect-square"
          />
          <TextField
            label="Full Name"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            placeholder="e.g. Roshan Perera"
          />
          <TextField
            label="Designation"
            value={editing.designation}
            onChange={(e) => setEditing({ ...editing, designation: e.target.value })}
            placeholder="e.g. Managing Director & CEO"
          />
          <TextArea
            label="Short Biography"
            value={editing.bio}
            onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
            placeholder="Brief professional biography..."
            rows={4}
          />
          <div className="pt-2">
            <Toggle
              label="Show on website (active)"
              checked={editing.active}
              onChange={(v) => setEditing({ ...editing, active: v })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              {editing.name ? 'Save Changes' : 'Add Director'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Director"
        message="Are you sure you want to remove this director? This action cannot be undone."
      />
      {toastEl}
    </div>
  );
}
