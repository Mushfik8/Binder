'use client';

import { SlidersHorizontal, Bell } from 'lucide-react';
import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { motion } from 'motion/react';

interface DiscoverHeaderProps {
  onOpenFilters: () => void;
  notificationCount?: number;
}

export function DiscoverHeader({ onOpenFilters, notificationCount = 0 }: DiscoverHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BinderLogo size={28} />
        <BinderWordmark className="text-base text-[var(--text)]" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <motion.button
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <motion.span
              className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </motion.span>
          )}
        </motion.button>

        {/* Filters */}
        <motion.button
          onClick={onOpenFilters}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </motion.button>
      </div>
    </header>
  );
}
