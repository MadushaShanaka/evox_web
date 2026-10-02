import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface MegaMenuProps {
  title: string;
  children: React.ReactNode;
}

interface MegaMenuContentProps {
  children: React.ReactNode;
}

export function MegaMenu({ title, children }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{title}</span>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-soft dark:shadow-soft-dark border border-gray-200 dark:border-gray-700 z-50"
            role="menu"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MegaMenuContent({ children }: MegaMenuContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {children}
    </div>
  );
}

interface MegaMenuColumnProps {
  title: string;
  children: React.ReactNode;
}

export function MegaMenuColumn({ title, children }: MegaMenuColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <ul className="space-y-3" role="none">
        {children}
      </ul>
    </div>
  );
}

interface MegaMenuLinkProps {
  href: string;
  children: React.ReactNode;
  description?: string;
}

export function MegaMenuLink({ href, children, description }: MegaMenuLinkProps) {
  return (
    <li role="none">
      <Link
        to={href}
        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group"
        role="menuitem"
      >
        <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-accent transition-colors">
          {children}
        </div>
        {description && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </div>
        )}
      </Link>
    </li>
  );
}
