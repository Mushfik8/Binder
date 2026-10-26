'use client';

import { motion } from 'motion/react';
import { Ghost, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  onAdjustFilters: () => void;
}

export function EmptyState({ onReset, onAdjustFilters }: EmptyStateProps) {
  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated ghost */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <div className="relative mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]">
            <Ghost className="h-12 w-12 text-[var(--text-muted)]" />
          </div>
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>

      <h3
        className="text-xl font-bold text-[var(--text)]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Keu nai ekhon! 👀
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        No more profiles to show right now. <br />
        Try adjusting your filters or come back later!
      </p>
      <p className="mt-1 text-xs italic text-[var(--text-muted)]">
        &quot;Shob gulo card sesh — chai kha, abar aay&quot;
      </p>

      <div className="mt-6 flex gap-3">
        <button onClick={onAdjustFilters} className="btn-secondary flex items-center gap-2">
          Adjust Filters
        </button>
        <button onClick={onReset} className="btn-primary flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Feed
        </button>
      </div>
    </motion.div>
  );
}
