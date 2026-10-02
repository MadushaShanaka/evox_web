import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useScrollPosition } from '../hooks/useScroll';

export default function BackToTop() {
  const scrollY = useScrollPosition();
  const showButton = scrollY > 600;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary hover:bg-primary-hover text-white rounded-full shadow-soft dark:shadow-soft-dark transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6 mx-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
