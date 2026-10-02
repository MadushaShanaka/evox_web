import type { AppData } from '@/types';
import { withBase } from '@/lib/nav';

const STORAGE_KEY = 'evox_cms_data';

export async function fetchSeedData(): Promise<AppData> {
  const [projects, directors, careers, company, address, branding, social, settings] =
    await Promise.all([
      fetch(withBase('/data/projects.json')).then((r) => r.json()),
      fetch(withBase('/data/directors.json')).then((r) => r.json()),
      fetch(withBase('/data/careers.json')).then((r) => r.json()),
      fetch(withBase('/data/company.json')).then((r) => r.json()),
      fetch(withBase('/data/address.json')).then((r) => r.json()),
      fetch(withBase('/data/branding.json')).then((r) => r.json()),
      fetch(withBase('/data/social.json')).then((r) => r.json()),
      fetch(withBase('/data/settings.json')).then((r) => r.json()),
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

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
