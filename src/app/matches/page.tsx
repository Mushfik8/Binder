'use client';

import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export default function MatchesPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <header className="flex items-center gap-2 px-5 py-4">
        <Heart className="h-6 w-6 text-[var(--primary)]" fill="currentColor" />
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Matches
        </h1>
      </header>

      {/* Empty state placeholder */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <Sparkles className="h-10 w-10 text-[var(--accent)]" />
        </motion.div>
        <h2
          className="text-lg font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Start swiping!
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Your matches will appear here once you and someone else both like each other.
        </p>
        <p className="mt-1 text-xs italic text-[var(--text-muted)]">
          &quot;Patience er game, bhai — match hobe ekdin&quot;
        </p>
      </div>
    </div>
  );
}
