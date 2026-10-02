import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  show: boolean;
  delay?: number;
  paused: boolean;
  className?: string;
  children: ReactNode;
}

export function FloatingCard({ show, delay = 0, paused, className = '', children }: FloatingCardProps) {
  return (
    <motion.div
      className={className}
      initial={paused ? false : { opacity: 0, scale: 0.7 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
    >
      <motion.div
        animate={show && !paused ? { y: [0, -6, 0] } : { y: 0 }}
        transition={
          show && !paused
            ? { delay: delay + 0.35, duration: 5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
