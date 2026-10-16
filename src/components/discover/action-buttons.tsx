'use client';

import { motion } from 'motion/react';
import { X, Heart, Star, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onUndo: () => void;
  canUndo: boolean;
  disabled: boolean;
}

export function ActionButtons({
  onPass,
  onLike,
  onSuperLike,
  onUndo,
  canUndo,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Undo */}
      <motion.button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
          canUndo && !disabled
            ? 'border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning)]/10'
            : 'border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed'
        )}
        whileTap={canUndo && !disabled ? { scale: 0.9 } : {}}
        aria-label="Undo last swipe"
      >
        <RotateCcw className="h-5 w-5" />
      </motion.button>

      {/* Pass */}
      <motion.button
        onClick={onPass}
        disabled={disabled}
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--danger)] text-[var(--danger)] transition-all hover:bg-[var(--danger)]/10 disabled:opacity-40 disabled:cursor-not-allowed"
        whileTap={!disabled ? { scale: 0.85 } : {}}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        aria-label="Pass"
      >
        <X className="h-7 w-7" strokeWidth={3} />
      </motion.button>

      {/* Super Like */}
      <motion.button
        onClick={onSuperLike}
        disabled={disabled}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent)] text-[var(--accent)] transition-all hover:bg-[var(--accent)]/10 disabled:opacity-40 disabled:cursor-not-allowed"
        whileTap={!disabled ? { scale: 0.85 } : {}}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        aria-label="Super Like"
      >
        <Star className="h-6 w-6" fill="currentColor" />
      </motion.button>

      {/* Like */}
      <motion.button
        onClick={onLike}
        disabled={disabled}
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--success)] text-[var(--success)] transition-all hover:bg-[var(--success)]/10 disabled:opacity-40 disabled:cursor-not-allowed"
        whileTap={!disabled ? { scale: 0.85 } : {}}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        aria-label="Like"
      >
        <Heart className="h-7 w-7" fill="currentColor" />
      </motion.button>

      {/* Empty spacer for symmetry */}
      <div className="h-12 w-12" />
    </div>
  );
}
