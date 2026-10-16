'use client';

import { InView } from '@/components/motion/primitives';
import { motion } from 'motion/react';
import { ArrowRight, Flame } from 'lucide-react';

export function CTASection() {
  return (
    <section id="join" className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28">
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[150px]"
          style={{ background: 'var(--primary)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <InView>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2">
            <Flame className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--primary)]">
              Ready for your break?
            </span>
          </div>

          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Same pressure,{' '}
            <span className="text-gradient-ember">same break?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)] md:text-lg">
            Join thousands of adults sharing vibes, surviving deadlines, and finding their break-time people.
            No sales. No spam. No nonsense.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="/age-gate"
              className="btn-primary group flex items-center gap-2 text-base"
              id="cta-join-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Binder — It&apos;s Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

          <p className="mt-6 text-xs text-[var(--text-muted)]">
            18+ only &middot; Free to use &middot; No tobacco sales &middot; Your data, your rules
          </p>
        </InView>
      </div>
    </section>
  );
}
