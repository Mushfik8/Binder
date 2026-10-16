'use client';

import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Safety', href: '#safety' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" aria-label="Binder home">
          <BinderLogo size={28} />
          <BinderWordmark className="text-xl text-[var(--text)]" />
        </a>

        {/* 18+ Badge */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
          <span className="inline-flex items-center rounded-full border border-[var(--danger)] bg-[var(--danger)]/10 px-3 py-1 text-xs font-semibold text-[var(--danger)]">
            18+ Only
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/age-gate"
            className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
            style={{ background: 'var(--gradient-ember)' }}
            id="nav-join-cta"
          >
            Join Binder
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-[var(--text)] transition-colors hover:bg-[var(--surface)] md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="glass border-t border-[var(--glass-border)] px-4 pb-6 pt-2 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-1">
            {/* Mobile 18+ badge */}
            <div className="mb-2 flex justify-center sm:hidden">
              <span className="inline-flex items-center rounded-full border border-[var(--danger)] bg-[var(--danger)]/10 px-3 py-1 text-xs font-semibold text-[var(--danger)]">
                18+ Only
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/age-gate"
              className="mt-2 flex justify-center rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ background: 'var(--gradient-ember)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Binder
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
