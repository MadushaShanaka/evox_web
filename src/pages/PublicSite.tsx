import { useEffect } from 'react';
import { Navbar } from '@/components/site/Navbar';
import { Hero } from '@/components/site/Hero';
import { About } from '@/components/site/About';
import { Capabilities } from '@/components/site/Capabilities';
import { Projects } from '@/components/site/Projects';
import { Directors } from '@/components/site/Directors';
import { CareersPage } from '@/components/site/CareersPage';
import { CareerDetail } from '@/components/site/CareerDetail';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { usePathname } from '@/lib/nav';

interface PublicSiteProps {
  onAdminClick: () => void;
}

export function PublicSite({ onAdminClick }: PublicSiteProps) {
  const path = usePathname();
  const careerSlug = path.match(/^\/careers\/([^/]+)\/?$/)?.[1];
  const isCareers = path === '/careers' || path === '/careers/';

  useEffect(() => {
    if (careerSlug || isCareers) {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
    }, 40);
    return () => window.clearTimeout(timer);
  }, [path, careerSlug, isCareers]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <ScrollProgress />
      <Navbar onAdminClick={onAdminClick} />
      <main>
        {careerSlug ? (
          <CareerDetail slug={decodeURIComponent(careerSlug)} />
        ) : isCareers ? (
          <CareersPage />
        ) : (
          <>
            <Hero />
            <About />
            <Capabilities />
            <Projects />
            <Directors />
            <Contact />
          </>
        )}
      </main>
      <Footer onAdminClick={onAdminClick} />
    </div>
  );
}
