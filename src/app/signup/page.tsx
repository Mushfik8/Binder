'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { HaikeiBlurryGradient } from '@/components/svg/haikei-backgrounds';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupData } from '@/lib/validations/auth';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setServerError('');

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: data.displayName,
          },
        },
      });

      if (error) {
        setServerError(error.message);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <HaikeiBlurryGradient className="absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-0 bg-[var(--bg)]/60" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <BinderLogo size={48} />
          <BinderWordmark className="mt-2 text-2xl text-[var(--text)]" />
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {!isSuccess ? (
            <>
              <div className="mb-6 text-center">
                <h1
                  className="text-xl font-bold text-[var(--text)] sm:text-2xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Join Binder
                </h1>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Create your account with a magic link — no password needed.
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)] italic">
                  &quot;No judgement. Maybe a little friendly roast.&quot;
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Display Name */}
                <div>
                  <label htmlFor="signup-name" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                    Display Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="e.g. Rafiq, রাফিক"
                    {...register('displayName')}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                    autoComplete="name"
                  />
                  {errors.displayName && (
                    <p className="mt-1 text-xs text-[var(--danger)]">{errors.displayName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-[var(--danger)]">{errors.email.message}</p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-3">
                    <p className="text-xs text-[var(--danger)]">{serverError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex w-full items-center justify-center gap-2 text-center disabled:opacity-50"
                  id="signup-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending magic link...
                    </>
                  ) : (
                    <>
                      Sign Up with Magic Link
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="text-xs text-[var(--text-muted)]">or</span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              {/* OAuth placeholders */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--primary)]/30 hover:text-[var(--text)]"
                  disabled
                  title="Coming soon"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google (Coming Soon)
                </button>
              </div>

              {/* Login link */}
              <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-[var(--primary)] underline underline-offset-2 transition-colors hover:text-[var(--primary-hover)]"
                >
                  Log in
                </a>
              </p>
            </>
          ) : (
            /* Success state */
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-[var(--success)]" />
              </motion.div>
              <h2
                className="text-xl font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Check Your Email!
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                We sent a magic link to{' '}
                <strong className="text-[var(--text)]">{getValues('email')}</strong>.
                Click the link to sign in — no password needed.
              </p>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Didn&apos;t receive it? Check your spam folder or try again in a minute.
              </p>
              <button
                onClick={() => { setIsSuccess(false); setServerError(''); }}
                className="btn-secondary mt-6"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          ⚠️ Smoking harms health. Binder does not sell or promote tobacco. 18+ only.
        </p>
      </motion.div>
    </div>
  );
}
