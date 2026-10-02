import type { AppData } from '@/types';

const STORAGE_KEY = 'evox_cms_data';

export const CMS_SECTIONS = ['projects', 'directors', 'careers', 'company', 'address', 'branding', 'social', 'settings'] as const;
export type CmsSection = (typeof CMS_SECTIONS)[number];

async function fetchJson(file: string) {
  const response = await fetch(`/data/${file}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load ${file}`);
  return response.json();
}

export async function fetchSeedData(): Promise<AppData> {
  const [projects, directors, careers, company, address, branding, social, settings] =
    await Promise.all([
      fetchJson('projects.json'),
      fetchJson('directors.json'),
      fetchJson('careers.json'),
      fetchJson('company.json'),
      fetchJson('address.json'),
      fetchJson('branding.json'),
      fetchJson('social.json'),
      fetchJson('settings.json'),
    ]);

  return {
    projects,
    directors,
    careers,
    company,
    address,
    branding,
    social,
    settings,
  };
}

export function loadData(): AppData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppData;
  } catch {
    return null;
  }
}

export class ProjectPublishError extends Error {
  constructor(message = 'Project files were not written. Run npm run dev and save again.') {
    super(message);
    this.name = 'ProjectPublishError';
  }
}

async function postCms(url: string, body: unknown): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ProjectPublishError();
  }

  if (!response.ok) {
    let serverError = '';
    try {
      const payload = (await response.json()) as { error?: string };
      if (typeof payload?.error === 'string') serverError = payload.error;
    } catch {
      serverError = '';
    }
    if (serverError && response.status !== 404) {
      throw new ProjectPublishError(`Project files were not written. ${serverError}`);
    }
    throw new ProjectPublishError();
  }

  try {
    return await response.json();
  } catch {
    throw new ProjectPublishError();
  }
}

export async function publishSection<T>(section: CmsSection, data: T): Promise<T> {
  const written = await postCms('/__cms/save', { section, data });
  if (written == null || typeof written !== 'object') throw new ProjectPublishError();
  return written as T;
}

export async function migrateBrowserData(data: Partial<AppData>): Promise<void> {
  const written = await postCms('/__cms/migrate', data);
  if (written == null || typeof written !== 'object') throw new ProjectPublishError();
}

export async function reportProjectSave(
  action: () => Promise<void>,
  showToast: (message: string, type?: 'success' | 'error') => void,
  success: string,
): Promise<boolean> {
  try {
    await action();
    const label = success.endsWith('.') ? success : `${success}.`;
    showToast(`${label} Files were written into the project.`);
    return true;
  } catch (error) {
    showToast(
      error instanceof ProjectPublishError
        ? error.message
        : 'Project files were not written. Run npm run dev and save again.',
      'error',
    );
    return false;
  }
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportData(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `evox-cms-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file: File): Promise<AppData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as AppData;
        resolve(parsed);
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
}
