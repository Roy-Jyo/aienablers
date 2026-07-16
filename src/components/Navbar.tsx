'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false);
      if (jobsRef.current && !jobsRef.current.contains(target)) setJobsOpen(false);
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setJobsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AI Enablers RaaS
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 relative">
          <div ref={jobsRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setJobsOpen((open) => !open)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
              aria-expanded={jobsOpen}
            >
              Job Board <ChevronDown size={17} />
            </button>

            <AnimatePresence>
              {jobsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-0 top-9 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
                >
                  <Link href="/job-board" onClick={() => setJobsOpen(false)} className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    AIEnablers Jobs
                  </Link>
                  <Link href="/job-market-search" onClick={() => setJobsOpen(false)} className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Job Market Search
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cost-saving" className="hidden lg:block text-gray-700 hover:text-blue-600 font-medium transition">
            Calculate Cost Saving
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <Menu size={28} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-60 bg-white border border-gray-200 shadow-lg rounded-xl py-3 text-center"
              >
                <Link href="/about" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
                  About Us
                </Link>
                <Link href="/job-board" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition sm:hidden" onClick={() => setMenuOpen(false)}>
                  AIEnablers Jobs
                </Link>
                <Link href="/job-market-search" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition sm:hidden" onClick={() => setMenuOpen(false)}>
                  Job Market Search
                </Link>
                <Link href="/cost-saving" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition lg:hidden" onClick={() => setMenuOpen(false)}>
                  Calculate Cost Saving
                </Link>
                <span className="block px-6 py-2 text-gray-400 font-medium cursor-not-allowed">
                  Submit CV – Coming Soon
                </span>
                <Link href="/knowledge" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
                  Knowledge Base
                </Link>
                <Link href="/privacy" className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
                  Privacy Policy
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
