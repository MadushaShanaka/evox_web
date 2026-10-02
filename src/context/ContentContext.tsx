import {
  createContext,
  useContext,
  useEffect,
  useRef,
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
import {
  fetchSeedData,
  loadData,
  clearData,
  publishSection,
  migrateBrowserData,
  ProjectPublishError,
  type CmsSection,
} from '@/lib/storage';

interface ContentContextValue {
  data: AppData | null;
  loading: boolean;
  updateProjects: (projects: Project[]) => Promise<void>;
  updateDirectors: (directors: Director[]) => Promise<void>;
  updateCareers: (careers: Career[]) => Promise<void>;
  updateCompany: (company: CompanyInfo) => Promise<void>;
  updateAddress: (address: CompanyAddress) => Promise<void>;
  updateBranding: (branding: Branding) => Promise<void>;
  updateSocial: (social: SocialMedia) => Promise<void>;
  updateSettings: (settings: WebsiteSettings) => Promise<void>;
  replaceData: (data: AppData) => Promise<void>;
  resetData: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const dataRef = useRef<AppData | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = loadData();
        if (stored) {
          try {
            await migrateBrowserData(stored);
            clearData();
          } catch {
            // Keep the browser copy so the next dev-server refresh can write it.
          }
        }
        if (cancelled) return;
        const seed = await fetchSeedData();
        if (!cancelled) {
          dataRef.current = seed;
          setData(seed);
        }
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

  const commitSection = useCallback(async <K extends CmsSection>(section: K, value: AppData[K]) => {
    if (!dataRef.current) throw new ProjectPublishError('Content is still loading.');
    const written = await publishSection(section, value);
    const current = dataRef.current;
    if (!current) throw new ProjectPublishError('Content is still loading.');
    const next = { ...current, [section]: written };
    dataRef.current = next;
    setData(next);
  }, []);

  const updateProjects = useCallback(
    async (projects: Project[]) => commitSection('projects', projects),
    [commitSection],
  );

  const updateDirectors = useCallback(
    async (directors: Director[]) => commitSection('directors', directors),
    [commitSection],
  );

  const updateCareers = useCallback(
    async (careers: Career[]) => commitSection('careers', careers),
    [commitSection],
  );

  const updateCompany = useCallback(
    async (company: CompanyInfo) => commitSection('company', company),
    [commitSection],
  );

  const updateAddress = useCallback(
    async (address: CompanyAddress) => commitSection('address', address),
    [commitSection],
  );

  const updateBranding = useCallback(
    async (branding: Branding) => commitSection('branding', branding),
    [commitSection],
  );

  const updateSocial = useCallback(
    async (social: SocialMedia) => commitSection('social', social),
    [commitSection],
  );

  const updateSettings = useCallback(
    async (settings: WebsiteSettings) => commitSection('settings', settings),
    [commitSection],
  );

  const replaceData = useCallback(async (newData: AppData) => {
    await migrateBrowserData(newData);
    const seed = await fetchSeedData();
    dataRef.current = seed;
    setData(seed);
  }, []);

  const resetData = useCallback(async () => {
    clearData();
    const seed = await fetchSeedData();
    dataRef.current = seed;
    setData(seed);
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
