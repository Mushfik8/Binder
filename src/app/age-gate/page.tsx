'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { HaikeiBlurryGradient } from '@/components/svg/haikei-backgrounds';
import { isAtLeast18 } from '@/lib/validations/auth';
import { AlertTriangle, ShieldCheck, ChevronDown } from 'lucide-react';

const AGE_GATE_STORAGE_KEY = 'binder_age_verified';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function AgeGatePage() {
  const router = useRouter();
  const [step, setStep] = useState<'dob' | 'confirm' | 'denied'>('dob');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmations, setConfirmations] = useState({
    isAdult: false,
    healthDisclaimer: false,
    noSales: false,
  });

  const handleDobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!d || d < 1 || d > 31) newErrors.push('Please enter a valid day');
    if (!m || m < 1 || m > 12) newErrors.push('Please select a month');
    if (!y || y < 1900 || y > 2100) newErrors.push('Please enter a valid year');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isAtLeast18(d, m, y)) {
      setStep('denied');
      return;
    }

    setErrors([]);
    setStep('confirm');
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!confirmations.isAdult) newErrors.push('You must confirm you are 18 or older');
    if (!confirmations.healthDisclaimer) newErrors.push('You must acknowledge the health disclaimer');
    if (!confirmations.noSales) newErrors.push('You must acknowledge the no-sales policy');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store age verification
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AGE_GATE_STORAGE_KEY, 'true');
    }

    router.push('/signup');
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-4 py-8">
      {/* Background */}
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
          <span className="mt-2 inline-flex items-center rounded-full border border-[var(--danger)] bg-[var(--danger)]/10 px-3 py-1 text-xs font-semibold text-[var(--danger)]">
            18+ Only
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Date of Birth */}
          {step === 'dob' && (
            <motion.div
              key="dob"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <h1
                    className="text-xl font-bold text-[var(--text)] sm:text-2xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Verify Your Age
                  </h1>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Binder is for adults only. Enter your date of birth to continue.
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)] italic">
                    &quot;Boss er chokh theke bachar jonno age ta confirm korun.&quot;
                  </p>
                </div>

                <form onSubmit={handleDobSubmit} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {/* Day */}
                    <div>
                      <label htmlFor="age-day" className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                        Day
                      </label>
                      <input
                        id="age-day"
                        type="number"
                        min="1"
                        max="31"
                        placeholder="DD"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-center text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        aria-label="Day of birth"
                        required
                      />
                    </div>

                    {/* Month */}
                    <div>
                      <label htmlFor="age-month" className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                        Month
                      </label>
                      <div className="relative">
                        <select
                          id="age-month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-center text-[var(--text)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                          aria-label="Month of birth"
                          required
                        >
                          <option value="">MM</option>
                          {months.map((m, i) => (
                            <option key={m} value={i + 1}>
                              {m.slice(0, 3)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                      </div>
                    </div>

                    {/* Year */}
                    <div>
                      <label htmlFor="age-year" className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                        Year
                      </label>
                      <input
                        id="age-year"
                        type="number"
                        min="1900"
                        max="2100"
                        placeholder="YYYY"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-center text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        aria-label="Year of birth"
                        required
                      />
                    </div>
                  </div>

                  {/* Errors */}
                  {errors.length > 0 && (
                    <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-3">
                      {errors.map((err) => (
                        <p key={err} className="text-xs text-[var(--danger)]">
                          {err}
                        </p>
                      ))}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary w-full text-center"
                    id="age-gate-submit"
                  >
                    Continue
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 2: Confirmations */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-[var(--success)]" />
                  <h1
                    className="text-xl font-bold text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Almost There
                  </h1>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Please read and confirm the following before entering Binder.
                  </p>
                </div>

                <form onSubmit={handleConfirmSubmit} className="space-y-4">
                  {/* Confirmation checkboxes */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]">
                    <input
                      type="checkbox"
                      checked={confirmations.isAdult}
                      onChange={(e) =>
                        setConfirmations((prev) => ({ ...prev, isAdult: e.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                      id="confirm-adult"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      I confirm that I am <strong className="text-[var(--text)]">18 years or older</strong> and legally
                      an adult in my jurisdiction.
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]">
                    <input
                      type="checkbox"
                      checked={confirmations.healthDisclaimer}
                      onChange={(e) =>
                        setConfirmations((prev) => ({
                          ...prev,
                          healthDisclaimer: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                      id="confirm-health"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      I understand that <strong className="text-[var(--text)]">smoking harms health</strong>. Binder
                      is a social community, not medical advice.
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]">
                    <input
                      type="checkbox"
                      checked={confirmations.noSales}
                      onChange={(e) =>
                        setConfirmations((prev) => ({
                          ...prev,
                          noSales: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                      id="confirm-no-sales"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      I understand that Binder does <strong className="text-[var(--text)]">not sell or promote
                      tobacco products</strong>.
                    </span>
                  </label>

                  {/* Errors */}
                  {errors.length > 0 && (
                    <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-3">
                      {errors.map((err) => (
                        <p key={err} className="text-xs text-[var(--danger)]">
                          {err}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setStep('dob'); setErrors([]); }}
                      className="btn-secondary flex-1 text-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1 text-center"
                      id="age-gate-confirm"
                    >
                      Enter Binder
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Denied */}
          {step === 'denied' && (
            <motion.div
              key="denied"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6 text-center sm:p-8">
                <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-[var(--danger)]" />
                <h1
                  className="text-xl font-bold text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Access Denied
                </h1>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Binder is strictly for adults aged 18 and above.
                  You must be at least 18 years old to use this platform.
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  This is not a place for minors. Please come back when you&apos;re old enough.
                </p>
                <a
                  href="/"
                  className="btn-secondary mt-6 inline-block text-center"
                >
                  Return to Home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-[var(--primary)] underline underline-offset-2">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-[var(--primary)] underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
