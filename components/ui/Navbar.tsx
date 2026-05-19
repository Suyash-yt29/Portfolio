"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 9, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-[100] w-[90%] max-w-2xl -translate-x-1/2"
    >
      <div 
        className={`relative flex items-center justify-between rounded-full border px-6 py-3 transition-all duration-300 ${
          hasScrolled || isMobileMenuOpen
            ? "border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold tracking-tighter text-white cursor-none z-50 relative">
          M<span className="text-[#d4af37]">.</span>V
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-[#d4af37] cursor-none"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-white cursor-none z-50 relative p-1"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[120%] left-0 w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-6 backdrop-blur-2xl shadow-2xl md:hidden flex flex-col gap-4"
            >
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-[#d4af37] border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}