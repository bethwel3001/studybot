import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/'},
  { name: 'AI Companion', path: '/ai-companion'},
  { name: 'Homework', path: '/homework'},
  { name: 'Pricing', path: '/pricing'},
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('darkMode') === 'true';
    setDarkMode(stored);
    document.documentElement.classList.toggle('dark', stored);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    const updated = !darkMode;
    setDarkMode(updated);
    localStorage.setItem('darkMode', updated);
    document.documentElement.classList.toggle('dark', updated);
  };

  return (
    <nav className="backdrop-blur bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
          StudyBot
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base transition-all duration-150 font-medium ${
                location.pathname === link.path
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <Link
            to="/ai-companion"
            className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all text-sm"
          >
            <div className="flex items-center gap-1">
              <SparklesIcon className="h-4 w-4" />
              Get Started
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block w-full py-2 rounded-md text-center text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/ai-companion"
              className="block w-full py-2 mt-2 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-md text-sm text-center"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;