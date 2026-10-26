'use client';

import { motion } from 'motion/react';
import { MessageCircle, Coffee } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <header className="flex items-center gap-2 px-5 py-4">
        <MessageCircle className="h-6 w-6 text-[var(--primary)]" />
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Chat
        </h1>
      </header>

      {/* Empty state placeholder */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <Coffee className="h-10 w-10 text-[var(--secondary)]" />
        </motion.div>
        <h2
          className="text-lg font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          No chats yet
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          When you match with someone, you can start chatting here.
        </p>
        <p className="mt-1 text-xs italic text-[var(--text-muted)]">
          &quot;Adda dite gele match lagbe age — swipe kor!&quot;
        </p>
      </div>
    </div>
  );
}
