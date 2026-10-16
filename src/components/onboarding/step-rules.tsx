'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle, Loader2, PartyPopper } from 'lucide-react';

interface RulesStepProps {
  onComplete: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const rules = [
  {
    title: 'Respect everyone',
    titleBn: 'সবাইকে সম্মান করুন',
    description: 'No bullying, hate speech, racism, sexism, or discrimination of any kind.',
  },
  {
    title: 'No explicit content',
    titleBn: 'কোনো explicit content নয়',
    description: 'No nudity, sexual content, or graphic violence in photos, bios, or messages.',
  },
  {
    title: 'No minors',
    titleBn: 'নাবালকদের জন্য নয়',
    description: 'This platform is strictly 18+. Do not share or request content involving minors.',
  },
  {
    title: 'No tobacco sales or advertising',
    titleBn: 'তামাক বিক্রি বা বিজ্ঞাপন নিষিদ্ধ',
    description: 'Binder is not affiliated with any tobacco company. No selling, buying, promoting, or advertising tobacco.',
  },
  {
    title: 'Report, don\'t retaliate',
    titleBn: 'রিপোর্ট করুন, প্রতিশোধ নেবেন না',
    description: 'Use the report/block tools. Harassment in response to harassment is still harassment.',
  },
  {
    title: 'Be honest',
    titleBn: 'সৎ থাকুন',
    description: 'Use real photos. Don\'t impersonate others. Catfishing results in permanent bans.',
  },
];

export function RulesStep({ onComplete, onBack, isSubmitting }: RulesStepProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <div className="mb-6 text-center">
        <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-[var(--success)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Community Rules
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          One last thing — agree to keep Binder safe for everyone.
        </p>
      </div>

      {/* Rules list */}
      <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
        {rules.map((rule, i) => (
          <div
            key={rule.title}
            className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{rule.title}</p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Agreement checkbox */}
      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]/30">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
          id="accept-rules"
        />
        <span className="text-sm text-[var(--text-secondary)]">
          I agree to follow Binder&apos;s{' '}
          <a href="/community-rules" className="text-[var(--primary)] underline underline-offset-2">
            Community Rules
          </a>{' '}
          and understand that violations may result in suspension or ban.
        </span>
      </label>

      <div className="mt-5 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
          Back
        </button>
        <button
          type="button"
          onClick={onComplete}
          disabled={!accepted || isSubmitting}
          className="btn-primary flex w-full items-center justify-center gap-2 flex-1 text-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              <PartyPopper className="h-4 w-4" />
              Complete &amp; Start Swiping
            </>
          )}
        </button>
      </div>
    </div>
  );
}
