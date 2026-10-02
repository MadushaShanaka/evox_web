import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  GripVertical,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  FolderKanban,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import type { Project } from '@/types';
import { Modal, ConfirmDialog, useToast } from '@/components/ui/Modal';
import { TextField, TextArea, SelectField, Toggle } from '@/components/ui/Field';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { withBase } from '@/lib/nav';

const emptyProject: Project = {
  id: '',
  title: '',
  description: '',
  image: '',
  technologies: [],
  industry: '',
  status: 'completed',
  url: '',
  featured: false,
  displayOrder: 0,
};

export function ProjectsManager() {
  const { data, updateProjects } = useContent();
  const { showToast, toastEl } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!data) return null;
  const projects = [...data.projects].sort((a, b) => a.displayOrder - b.displayOrder);

  const openAdd = () => {
    setEditing({ ...emptyProject, id: `p${Date.now()}`, displayOrder: data.projects.length + 1 });
    setTechInput('');
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing({ ...project });
    setTechInput('');
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editing.title.trim()) {
      showToast('Project title is required', 'error');
      return;
    }
    const exists = data.projects.some((p) => p.id === editing.id);
    const updated = exists
      ? data.projects.map((p) => (p.id === editing.id ? editing : p))
      : [...data.projects, editing];
    updateProjects(updated);
    setModalOpen(false);
    showToast(exists ? 'Project updated' : 'Project added');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    updateProjects(data.projects.filter((p) => p.id !== deleteId));
    showToast('Project deleted');
  };

  const moveProject = (id: string, dir: 'up' | 'down') => {
    const sorted = [...data.projects].sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((p) => p.id === id);
    if (dir === 'up' && idx > 0) {
      [sorted[idx], sorted[idx - 1]] = [sorted[idx - 1], sorted[idx]];
    } else if (dir === 'down' && idx < sorted.length - 1) {
      [sorted[idx], sorted[idx + 1]] = [sorted[idx + 1], sorted[idx]];
    }
    const renumbered = sorted.map((p, i) => ({ ...p, displayOrder: i + 1 }));
    updateProjects(renumbered);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !editing.technologies.includes(t)) {
      setEditing({ ...editing, technologies: [...editing.technologies, t] });
      setTechInput('');
    }
  };

  const removeTech = (t: string) => {
    setEditing({ ...editing, technologies: editing.technologies.filter((x) => x !== t) });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Projects</h2>
          <p className="text-sm text-muted mt-0.5">{data.projects.length} projects in portfolio</p>
        </div>
        <button
          onClick={openAdd}
          className="btn-primary"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-3">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="panel rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
          >
            {/* Image */}
            <div className="w-20 h-20 rounded-lg bg-surface-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img src={withBase(project.image)} alt="" className="w-full h-full object-cover" />
              ) : (
                <FolderKanban size={24} className="text-faint" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <h3 className="text-sm font-semibold text-ink">{project.title}</h3>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    <Star size={10} /> Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-xs bg-surface-muted text-muted">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-xs text-faint">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    project.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : project.status === 'in-progress'
                      ? 'bg-orange-500/10 text-orange-700 dark:text-orange-300'
                      : 'bg-surface-muted text-muted'
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-faint">{project.industry}</span>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline flex items-center gap-0.5"
                  >
                    <ExternalLink size={12} /> Visit
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <div className="flex gap-1">
                <button
                  onClick={() => moveProject(project.id, 'up')}
                  disabled={i === 0}
                  className="p-1.5 rounded text-faint hover:bg-surface-muted hover:text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveProject(project.id, 'down')}
                  disabled={i === projects.length - 1}
                  className="p-1.5 rounded text-faint hover:bg-surface-muted hover:text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
              <button
                onClick={() => openEdit(project)}
                className="p-1.5 rounded text-faint hover:bg-accent-soft hover:text-accent transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setDeleteId(project.id)}
                className="p-1.5 rounded text-faint hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 panel rounded-xl">
            <FolderKanban className="mx-auto text-faint" size={40} />
            <p className="text-muted mt-3 text-sm">No projects yet. Click "Add Project" to create one.</p>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing.title ? 'Edit Project' : 'Add Project'}>
        <div className="space-y-4">
          <ImageUpload
            label="Project Image"
            value={editing.image}
            onChange={(v) => setEditing({ ...editing, image: v })}
            aspectRatio="aspect-video"
          />
          <TextField
            label="Project Title"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            placeholder="e.g. Smart Retail POS System"
          />
          <TextArea
            label="Description"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            placeholder="Brief description of the project"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Industry"
              value={editing.industry}
              onChange={(e) => setEditing({ ...editing, industry: e.target.value })}
              placeholder="e.g. Retail"
            />
            <SelectField
              label="Status"
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value as Project['status'] })}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </SelectField>
          </div>
          <TextField
            label="Project URL"
            value={editing.url}
            onChange={(e) => setEditing({ ...editing, url: e.target.value })}
            placeholder="https://..."
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-soft">Technologies</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Type and press Enter"
                className="input flex-1"
              />
              <button
                onClick={addTech}
                type="button"
                className="btn-secondary px-4"
              >
                Add
              </button>
            </div>
            {editing.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {editing.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent-soft text-accent text-sm"
                  >
                    {tech}
                    <button onClick={() => removeTech(tech)} className="text-accent hover:text-accent">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="pt-2">
            <Toggle
              label="Mark as Featured"
              checked={editing.featured}
              onChange={(v) => setEditing({ ...editing, featured: v })}
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
              {editing.title ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
      {toastEl}
    </div>
  );
}
