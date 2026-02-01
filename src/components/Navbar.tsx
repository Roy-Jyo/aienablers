'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="border-b bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-2">
          <div className="ticker text-sm">
            <div className="ticker-track">
              <span className="inline-flex items-center gap-2">
                <a
                  href="https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions"
                  className="font-semibold underline decoration-white/70 underline-offset-4 transition hover:text-blue-200"
                  rel="noreferrer"
                  target="_blank"
                >
                  Press release
                </a>
                <span className="text-white/80">·</span>
                <span>Starting price: $500 per role to fill</span>
              </span>
              <span className="mx-8 text-white/40">|</span>
              <span className="inline-flex items-center gap-2">
                <a
                  href="https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions"
                  className="font-semibold underline decoration-white/70 underline-offset-4 transition hover:text-blue-200"
                  rel="noreferrer"
                  target="_blank"
                >
                  Press release
                </a>
                <span className="text-white/80">·</span>
                <span>Starting price: $500 per role to fill</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            AI Enablers RaaS
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Always Visible Link */}
            <Link
              href="/cost-saving"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Calculate Cost Saving
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Animated Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              /* className="bg-white border-t border-gray-200 shadow-md py-3 text-center md:text-left" */
              className="absolute right-6 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-xl py-3 text-center"
            >
              <Link
                href="/about"
                className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
              <span className="block px-6 py-2 text-gray-400 font-medium cursor-not-allowed">
                Submit CV – Coming Soon
              </span>
              <Link
                href="/knowledge"
                className="block px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                Knowledge Base
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
