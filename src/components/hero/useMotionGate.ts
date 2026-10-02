import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useMotionGate() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => (typeof document === 'undefined' ? true : !document.hidden));

  useEffect(() => {
    const onVisibility = () => {
      const hidden = document.hidden;
      setVisible(!hidden);
      document.documentElement.classList.toggle('motion-paused', hidden);
    };
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.documentElement.classList.remove('motion-paused');
    };
  }, []);

  const reduce = reduced === true;
  return { reduce, paused: reduce || !visible, visible };
}
