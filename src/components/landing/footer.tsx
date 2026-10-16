'use client';

import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { InView } from '@/components/motion/primitives';
import { Mail } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const footerLinks = {
  product: [
    { label: 'How it works', href: '#features' },
    { label: 'Safety', href: '#safety' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Community Rules', href: '/community-rules' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  support: [
    { label: 'Contact', href: 'mailto:support@binder.app' },
    { label: 'Safety Center', href: '/safety' },
    { label: 'Report Abuse', href: '/report' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-4 pt-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <InView>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <BinderLogo size={24} />
                <BinderWordmark className="text-lg text-[var(--text)]" />
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
                A social community for adults who share break-time vibes, pressure memes, and questionable life decisions.
                Not a dating app. Not a tobacco store.
              </p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                ⚠️ Smoking harms health. Binder does not sell or promote tobacco.
              </p>

              {/* Social links */}
              <div className="mt-6 flex gap-3">
                <a
                  href="https://github.com/Mushfik8/Binder"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
                <a
                  href="mailto:support@binder.app"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label="Email support"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[var(--text)]">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-[var(--text)]">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-[var(--text)]">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
            <p className="text-xs text-[var(--text-muted)]">
              &copy; 2026 Binder. All rights reserved. Not affiliated with any tobacco company.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[var(--danger)] bg-[var(--danger)]/10 px-3 py-1 text-xs font-semibold text-[var(--danger)]">
                18+ Only
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Made in 🇧🇩
              </span>
            </div>
          </div>
        </InView>
      </div>
    </footer>
  );
}
