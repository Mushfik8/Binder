'use client';

import { motion } from 'motion/react';
import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { Construction } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';

export default function OnboardingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BinderLogo size={48} className="mx-auto" />
        <BinderWordmark className="mt-2 text-2xl text-[var(--text)]" />

        <div className="mt-8 glass rounded-2xl p-6 sm:p-8">
          <Construction className="mx-auto mb-4 h-12 w-12 text-[var(--primary)]" />
          <h1
            className="text-xl font-bold text-[var(--text)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Welcome to Binder! 🎉
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Your account is created. The onboarding flow (photos, bio, tags, mood selection,
            location preferences) is coming in the next section.
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)] italic">
            &quot;Profile ta complete korun, boss er chokh theke bachar jonno.&quot;
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <a href="/" className="btn-secondary text-center">
              Back to Home
            </a>
            <LogoutButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
