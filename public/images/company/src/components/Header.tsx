import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../src/images/Logo.jpg";
import DarkModeToggle from "./DarkModeToggle";
import { MegaMenu, MegaMenuContent, MegaMenuColumn, MegaMenuLink } from "./MegaMenu";
import { useScrollPosition } from "../hooks/useScroll";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 10;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const navigation = [
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-soft dark:shadow-soft-dark" 
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto container-padding max-w-7xl" role="navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.img
                src={logo}
                alt="Evox Technologies Logo"
                className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 lg:flex">
              <MegaMenu title="Services">
                <MegaMenuContent>
                  <MegaMenuColumn title="Development">
                    <MegaMenuLink href="/services" description="Custom software solutions">
                      Custom Software
                    </MegaMenuLink>
                    <MegaMenuLink href="/services" description="Web and mobile applications">
                      Web & Mobile
                    </MegaMenuLink>
                    <MegaMenuLink href="/services" description="Cloud infrastructure and DevOps">
                      Cloud & DevOps
                    </MegaMenuLink>
                  </MegaMenuColumn>
                  <MegaMenuColumn title="Advanced Solutions">
                    <MegaMenuLink href="/services" description="Data analytics and AI solutions">
                      Data & AI
                    </MegaMenuLink>
                    <MegaMenuLink href="/services" description="System integration services">
                      Integration
                    </MegaMenuLink>
                    <MegaMenuLink href="/services" description="UI/UX design services">
                      UI/UX Design
                    </MegaMenuLink>
                  </MegaMenuColumn>
                  <MegaMenuColumn title="Featured">
                    <MegaMenuLink href="/case-studies" description="See our success stories">
                      Case Studies
                    </MegaMenuLink>
                    <MegaMenuLink href="/contact" description="Get a free consultation">
                      Free Consultation
                    </MegaMenuLink>
                  </MegaMenuColumn>
                </MegaMenuContent>
              </MegaMenu>

              <MegaMenu title="Industries">
                <MegaMenuContent>
                  <MegaMenuColumn title="Manufacturing">
                    <MegaMenuLink href="/industries" description="ERP and production systems">
                      Manufacturing ERP
                    </MegaMenuLink>
                    <MegaMenuLink href="/industries" description="Quality control systems">
                      Quality Management
                    </MegaMenuLink>
                  </MegaMenuColumn>
                  <MegaMenuColumn title="Construction">
                    <MegaMenuLink href="/industries" description="Project management solutions">
                      Project Management
                    </MegaMenuLink>
                    <MegaMenuLink href="/industries" description="Resource planning systems">
                      Resource Planning
                    </MegaMenuLink>
                  </MegaMenuColumn>
                  <MegaMenuColumn title="Resources">
                    <MegaMenuLink href="/case-studies" description="Industry-specific case studies">
                      Case Studies
                    </MegaMenuLink>
                    <MegaMenuLink href="/insights" description="Industry insights and trends">
                      Industry Insights
                    </MegaMenuLink>
                  </MegaMenuColumn>
                </MegaMenuContent>
              </MegaMenu>

              {navigation.slice(2).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? "text-primary dark:text-sky"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="items-center hidden space-x-4 lg:flex">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky transition-colors duration-200"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              
              <DarkModeToggle />
              
              <Link
                to="/contact"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-primary dark:hover:text-sky"
              >
                Contact
              </Link>
              
              <motion.a
                href="#book-demo"
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 transition-colors rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="py-4 border-t border-gray-200 dark:border-gray-700 lg:hidden"
              >
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-base font-medium transition-colors ${
                        location.pathname === item.href
                          ? "text-primary dark:text-sky"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <DarkModeToggle />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="text-base font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-primary dark:hover:text-sky"
                  >
                    Contact
                  </Link>
                  
                  <motion.a
                    href="#book-demo"
                    className="inline-block text-center px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-base font-medium rounded-lg transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a Demo
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto mt-20 max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-soft dark:shadow-soft-dark p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
