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
import logo from './logo.jpg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'AI Companion', path: '/ai-companion' },
  { name: 'Homework', path: '/homework' },
  { name: 'Pricing', path: '/pricing' },
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
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="StudyBot Logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500 shadow-lg transition-transform duration-200 group-hover:scale-110"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-md text-base transition-all duration-200 font-medium shadow-sm hover:shadow-md ${
                location.pathname === link.path
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dark Mode Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-inner"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {/* CTA */}
          <Link
            to="/ai-companion"
            className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform text-sm flex items-center gap-2"
          >
            <SparklesIcon className="h-4 w-4" />
            Chat
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
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
            className="md:hidden px-4 pb-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block w-full py-2 rounded-md text-center font-medium shadow-sm transition-all duration-150 ${
                  location.pathname === link.path
                    ? 'bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/ai-companion"
              className="block w-full py-2 mt-2 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-full text-sm text-center shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform"
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
