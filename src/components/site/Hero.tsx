import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { CodeWindow } from '@/components/hero/CodeWindow';
import { CountUp } from '@/components/hero/CountUp';
import { FloatingCard } from '@/components/hero/FloatingCard';
import { GridSpotlight } from '@/components/hero/GridSpotlight';
import { OrbitBadges, OrbitRing } from '@/components/hero/OrbitBadges';
import { TechMarquee } from '@/components/hero/TechMarquee';
import { useMotionGate } from '@/components/hero/useMotionGate';

const PHRASES = ['We build web apps', 'We build mobile apps', 'We build cloud systems', 'We build AI solutions'];

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export function Hero() {
  const { data } = useContent();
  const { reduce, paused } = useMotionGate();
  const sectionRef = useRef<HTMLElement>(null);
  const [phrase, setPhrase] = useState(0);
  const [sceneOn, setSceneOn] = useState(false);
  const [cardsOn, setCardsOn] = useState(false);
  const [canTilt, setCanTilt] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const finishTyping = useCallback(() => setCardsOn(true), []);

  useEffect(() => {
    if (reduce) {
      setSceneOn(true);
      setCardsOn(true);
    }
  }, [reduce]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const sync = () => setCanTilt(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setPhrase((current) => (current + 1) % PHRASES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const onHeroMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const onSceneMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt || reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  if (!data) return null;

  const years = Math.max(0, new Date().getFullYear() - Number(data.company.foundedYear));
  const stats = [
    { value: Number.isFinite(years) ? years : 0, label: 'Years experience' },
    { value: data.projects.length, label: 'Projects delivered' },
    { value: data.directors.filter((director) => director.active).length, label: 'Expert leaders' },
  ];
  const summary = `${data.company.description.split('.')[0]}.`;

  return (
    <>
      <section
        id="home"
        ref={sectionRef}
        onMouseMove={onHeroMove}
        className="relative flex min-h-svh items-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-canvas" />
        <GridSpotlight interactive={!reduce} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-[#22B8D4]/20 blur-3xl"
          animate={paused ? undefined : { x: [0, 28, 0], y: [0, 18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#0F6A80]/20 blur-3xl dark:bg-[#2A97B3]/15"
          animate={paused ? undefined : { x: [0, -20, 0], y: [0, -24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 700" fill="none" aria-hidden>
          <motion.path
            d="M30 150 C 220 40, 360 240, 640 80"
            stroke="#22B8D4"
            strokeWidth="1.4"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 2.4, ease: 'easeInOut' }}
          />
          <motion.path
            d="M70 560 C 280 400, 540 660, 940 360"
            stroke="#22B8D4"
            strokeWidth="1.4"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 2.8, ease: 'easeInOut', delay: reduce ? 0 : 0.2 }}
          />
        </svg>
        {[
          'left-[14%] top-[22%]',
          'right-[18%] top-[16%]',
          'bottom-[18%] left-[46%]',
        ].map((position, index) => (
          <span key={position} className={`pointer-events-none absolute ${position}`} aria-hidden>
            <span className="relative block h-2 w-2 rounded-full bg-[#22B8D4]">
              {!reduce && (
                <span
                  className="hero-pulse-ring absolute inset-0 rounded-full bg-[#22B8D4]/40"
                  style={{ animationDelay: `${index * 0.6}s` }}
                />
              )}
            </span>
          </span>
        ))}

        <div className="relative mx-auto grid w-full max-w-[1000px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <motion.div
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
          >
            <motion.div variants={rise} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F6A80]/25 bg-surface/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F6A80] dark:border-[#2A97B3]/40 dark:text-[#2A97B3]">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-[#2ECF8B] ${reduce ? '' : 'hero-pulse-ring'}`} />
                <span className="relative h-2 w-2 rounded-full bg-[#2ECF8B]" />
              </span>
              {data.company.tagline}
            </motion.div>

            <motion.h1
              variants={rise}
              className="hero-shimmer text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[56px]"
            >
              {data.company.name.includes('(Pvt)') ? (
                <>
                  {data.company.name.slice(0, data.company.name.indexOf('(Pvt)')).trim()}
                  <br />
                  {data.company.name.slice(data.company.name.indexOf('(Pvt)'))}
                </>
              ) : (
                data.company.name
              )}
            </motion.h1>

            <motion.div variants={rise} className="relative mt-4 h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={PHRASES[phrase]}
                  initial={reduce ? false : { y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -22, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute text-lg font-semibold text-[#0F6A80] dark:text-[#2A97B3]"
                >
                  {PHRASES[phrase]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={rise} className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {summary}
            </motion.p>

            <motion.div variants={rise} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F6A80] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_-10px_rgba(34,184,212,0.85)] focus-visible:outline-none dark:bg-[#2A97B3]"
              >
                {!reduce && <span className="hero-pulse-ring pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#22B8D4]" aria-hidden />}
                <span className="relative">View our work</span>
                <ArrowRight size={16} className="relative transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#0F6A80]/35 px-5 py-3 text-sm font-semibold text-ink focus-visible:outline-none dark:border-[#2A97B3]/50"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#0F6A80] transition-transform duration-300 group-hover:scale-x-100 dark:bg-[#2A97B3]" />
                <span className="relative transition-colors duration-300 group-hover:text-white">Get in touch</span>
              </a>
            </motion.div>

            <motion.dl variants={rise} className="mt-10 grid max-w-md grid-cols-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className={index === 0 ? '' : 'border-l border-line pl-3 sm:pl-4'}>
                  <dt className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    <CountUp value={stat.value} />
                  </dt>
                  <dd className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[320px] w-full max-w-[420px] sm:h-[420px]"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.8, duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() => setSceneOn(true)}
            onMouseMove={onSceneMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            aria-hidden
          >
            <OrbitRing paused={paused || !sceneOn} />
            <CodeWindow
              started={sceneOn}
              paused={paused}
              reduce={reduce}
              tilt={canTilt && !reduce}
              tiltX={tilt.x}
              tiltY={tilt.y}
              onComplete={finishTyping}
            />
            <OrbitBadges paused={paused || !sceneOn} />
            <FloatingCard show={cardsOn} delay={0.05} paused={paused} className="absolute right-0 top-3 z-20 sm:right-1 sm:top-8">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#132430] px-3 py-2 shadow-xl">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2ECF8B] text-[#06281A]">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-white">Build passed</span>
                  <span className="block text-[10px] text-[#9DB3BF]">Deployed in 42s</span>
                </span>
              </div>
            </FloatingCard>
            <FloatingCard show={cardsOn} delay={0.28} paused={paused} className="absolute bottom-8 left-0 z-20 sm:bottom-12">
              <div className="rounded-2xl border border-white/10 bg-[#132430] px-3 py-2 shadow-xl">
                <p className="text-xs font-semibold text-white">Uptime 99.98%</p>
                <p className="text-[10px] text-[#9DB3BF]">Last 30 days</p>
                <svg viewBox="0 0 88 28" className="mt-1 h-7 w-24" aria-hidden>
                  <motion.path
                    d="M2 20 C 12 20, 16 10, 26 12 S 42 18, 52 8 S 70 14, 86 5"
                    fill="none"
                    stroke="#22B8D4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={cardsOn ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: reduce ? 0 : 1.2, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </FloatingCard>
            <FloatingCard show={cardsOn} delay={0.5} paused={paused} className="absolute bottom-1 right-0 z-20 sm:bottom-4 sm:right-2">
              <div className="w-36 rounded-2xl border border-white/10 bg-[#132430] px-3 py-2 shadow-xl">
                <p className="text-xs font-semibold text-white">AI model</p>
                <p className="text-[10px] text-[#9DB3BF]">Training</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full origin-left rounded-full bg-[#22B8D4]"
                    initial={{ scaleX: reduce ? 0.72 : 0.15 }}
                    animate={
                      cardsOn && !paused ? { scaleX: [0.15, 1, 0.2] } : { scaleX: cardsOn ? 0.72 : 0.15 }
                    }
                    transition={cardsOn && !paused ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                  />
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </section>
      <TechMarquee paused={paused} />
    </>
  );
}
