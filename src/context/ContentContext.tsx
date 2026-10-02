import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  AppData,
  Project,
  Director,
  Career,
  CompanyInfo,
  CompanyAddress,
  Branding,
  SocialMedia,
  WebsiteSettings,
} from '@/types';
import { fetchSeedData, loadData, saveData } from '@/lib/storage';

interface ContentContextValue {
  data: AppData | null;
  loading: boolean;
  updateProjects: (projects: Project[]) => void;
  updateDirectors: (directors: Director[]) => void;
  updateCareers: (careers: Career[]) => void;
  updateCompany: (company: CompanyInfo) => void;
  updateAddress: (address: CompanyAddress) => void;
  updateBranding: (branding: Branding) => void;
  updateSocial: (social: SocialMedia) => void;
  updateSettings: (settings: WebsiteSettings) => void;
  replaceData: (data: AppData) => void;
  resetData: () => void;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = loadData();
        if (stored && Array.isArray(stored.careers)) {
          if (!cancelled) setData(stored);
          return;
        }
        const seed = await fetchSeedData();
        const next = stored ? { ...stored, careers: seed.careers } : seed;
        saveData(next);
        if (!cancelled) setData(next);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((updater: (prev: AppData) => AppData) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const updateProjects = useCallback(
    (projects: Project[]) => persist((prev) => ({ ...prev, projects })),
    [persist],
  );

  const updateDirectors = useCallback(
    (directors: Director[]) => persist((prev) => ({ ...prev, directors })),
    [persist],
  );

  const updateCareers = useCallback(
    (careers: Career[]) => persist((prev) => ({ ...prev, careers })),
    [persist],
  );

  const updateCompany = useCallback(
    (company: CompanyInfo) => persist((prev) => ({ ...prev, company })),
    [persist],
  );

  const updateAddress = useCallback(
    (address: CompanyAddress) => persist((prev) => ({ ...prev, address })),
    [persist],
  );

  const updateBranding = useCallback(
    (branding: Branding) => persist((prev) => ({ ...prev, branding })),
    [persist],
  );

  const updateSocial = useCallback(
    (social: SocialMedia) => persist((prev) => ({ ...prev, social })),
    [persist],
  );

  const updateSettings = useCallback(
    (settings: WebsiteSettings) => persist((prev) => ({ ...prev, settings })),
    [persist],
  );

  const replaceData = useCallback((newData: AppData) => {
    setData((prev) => {
      const next = {
        ...newData,
        careers: Array.isArray(newData.careers) ? newData.careers : prev?.careers ?? [],
      };
      saveData(next);
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem('evox_cms_data');
    fetchSeedData().then((seed) => {
      setData(seed);
      saveData(seed);
    });
  }, []);

  return (
    <ContentContext.Provider
      value={{
        data,
        loading,
        updateProjects,
        updateDirectors,
        updateCareers,
        updateCompany,
        updateAddress,
        updateBranding,
        updateSocial,
        updateSettings,
        replaceData,
        resetData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
