import { motion } from 'framer-motion';

const ITEMS = ['React', 'Node.js', 'Flutter', 'AWS', 'Docker', 'PostgreSQL', 'TensorFlow', 'Kubernetes'];

interface TechMarqueeProps {
  paused: boolean;
}

export function TechMarquee({ paused }: TechMarqueeProps) {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section aria-label="Technology stack" className="overflow-hidden border-y border-line bg-surface/70">
      <motion.div
        className="flex w-max gap-8 py-4"
        animate={paused ? undefined : { x: ['0%', '-50%'] }}
        transition={paused ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 text-sm font-semibold tracking-wide text-muted">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-[#22B8D4]" aria-hidden />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
