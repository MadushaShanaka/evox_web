import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionGate } from '@/components/hero/useMotionGate';

interface CountUpProps {
  value: number;
  suffix?: string;
}

export function CountUp({ value, suffix = '+' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduce } = useMotionGate();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const duration = 1400;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
