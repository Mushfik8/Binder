'use client';

import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { InView } from '@/components/motion/primitives';
import { Mail } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
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
                  <XIcon className="h-4 w-4" />
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
              &copy; 2025 Binder. All rights reserved. Not affiliated with any tobacco company.
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
