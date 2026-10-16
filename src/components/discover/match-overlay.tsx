'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, X } from 'lucide-react';

interface MatchOverlayProps {
  matchName: string;
  matchPhoto: string;
  onSendMessage: () => void;
  onKeepSwiping: () => void;
}

export function MatchOverlay({
  matchName,
  matchPhoto,
  onSendMessage,
  onKeepSwiping,
}: MatchOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-sm text-center"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      >
        {/* Close button */}
        <button
          onClick={onKeepSwiping}
          className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Animated hearts */}
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <div className="relative">
            <Heart className="h-20 w-20 text-[var(--danger)]" fill="currentColor" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="h-20 w-20 text-[var(--danger)]/30" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl font-black"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'var(--gradient-ember)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          It&apos;s a Match!
        </motion.h2>

        <motion.p
          className="mt-2 text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You and <strong className="text-white">{matchName}</strong> both liked each other!
        </motion.p>

        <motion.p
          className="mt-1 text-xs text-white/50 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          &quot;Same pressure, same break — match hoye gese!&quot;
        </motion.p>

        {/* Match photo */}
        <motion.div
          className="mx-auto mt-5 h-24 w-24 overflow-hidden rounded-full border-3 border-[var(--primary)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={matchPhoto}
            alt={matchName}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="mt-6 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onSendMessage}
            className="btn-primary flex w-full items-center justify-center gap-2 text-center"
          >
            <MessageCircle className="h-4 w-4" />
            Send a Message
          </button>
          <button
            onClick={onKeepSwiping}
            className="btn-secondary w-full text-center"
          >
            Keep Swiping
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
