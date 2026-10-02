import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../src/images/Logo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white bg-navy dark:bg-gray-900">
      <div className="mx-auto container-padding max-w-7xl section-padding">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <motion.img
                src={logo}
                alt="Evox Technologies Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-xl font-bold">Evox Technologies</span>
            </div>
            <p className="max-w-md mb-6 text-gray-300 dark:text-gray-400">
              Build. Integrate. Scale. Delivering reliable software solutions
              that ship on time and deliver measurable results.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/company/evoxtechnologies"
                className="text-gray-300 transition-colors hover:text-white dark:hover:text-sky"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:info@evoxtechnologies.com"
                className="text-gray-300 transition-colors hover:text-white dark:hover:text-sky"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="tel:+94706640664"
                className="text-gray-300 transition-colors hover:text-white dark:hover:text-sky"
                aria-label="Phone"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-gray-100">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Web & Mobile
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Data & AI
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Integration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-gray-100">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-gray-100">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-300 dark:text-gray-400">
              Stay updated with our latest insights and news.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
              />
              <motion.button
                type="submit"
                className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-hover"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 space-y-4 border-t border-white/10 dark:border-gray-700 md:flex-row md:space-y-0">
          <p className="text-sm text-gray-300 dark:text-gray-400">
            &copy; {currentYear} Evox Technologies. All rights reserved. |
            evoxtechnologies.com
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
            >
              Terms of Service
            </Link>
            <Link
              to="/security"
              className="text-gray-300 dark:text-gray-400 transition-colors hover:text-white dark:hover:text-sky"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
