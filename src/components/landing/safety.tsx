'use client';

import { AnimatedGroup, InView } from '@/components/motion/primitives';
import { HaikeiWavesTop } from '@/components/svg/haikei-backgrounds';
import { Shield, Ban, Eye, AlertTriangle, Lock, HeartHandshake } from 'lucide-react';

const safetyItems = [
  {
    icon: Shield,
    title: '18+ Age Gate',
    description:
      'Date-of-birth verification required before any content. No access for minors, ever.',
  },
  {
    icon: Ban,
    title: 'No Tobacco Sales',
    description:
      'Binder is not affiliated with any tobacco company. No sales, promotions, ads, or product listings.',
  },
  {
    icon: Eye,
    title: 'Block, Report, Unmatch',
    description:
      'Every profile, message, and post has quick block/report access. We review reports within 24 hours.',
  },
  {
    icon: Lock,
    title: 'Privacy by Default',
    description:
      'Your exact location is never shown. Photos are moderated. EXIF data stripped. You control what\'s visible.',
  },
  {
    icon: AlertTriangle,
    title: 'Content Moderation',
    description:
      'AI-assisted + human review pipeline for photos, text, and reported content. Hate speech and harassment result in bans.',
  },
  {
    icon: HeartHandshake,
    title: 'Mental Health Aware',
    description:
      'We never diagnose, score, or rank depression. If stress feels overwhelming, please speak with someone you trust.',
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="relative px-4 py-20 sm:px-6 md:py-28">
      <HaikeiWavesTop className="absolute top-0 left-0 right-0 h-[100px] w-full -translate-y-[98px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <InView>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-1.5 text-sm text-[var(--danger)]">
              <Shield className="mr-1.5 inline h-3.5 w-3.5" />
              Community Safety
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Respect first.{' '}
              <span className="text-gradient-ember">Roast later.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)] md:text-lg">
              Binder takes safety seriously. Every feature is built with privacy, moderation, and user protection at its core.
            </p>
          </div>
        </InView>

        {/* Safety grid */}
        <AnimatedGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {safetyItems.map((item) => (
            <div
              key={item.title}
              className="card group relative overflow-hidden p-6 md:p-8"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--danger)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3">
                <item.icon className="h-5 w-5 text-[var(--danger)]" />
              </div>
              <h3
                className="mb-2 text-base font-semibold text-[var(--text)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
            </div>
          ))}
        </AnimatedGroup>

        {/* Safety callout */}
        <InView delay={0.3}>
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center md:p-8">
            <p className="text-sm text-[var(--text-secondary)] md:text-base">
              <strong className="text-[var(--accent)]">Need help?</strong>{' '}
              If stress, depression, or anxiety feels overwhelming, please speak with someone you trust
              or a qualified mental-health professional. Binder is not a crisis service.
            </p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              🇧🇩 Kaan Pete Roi: 01779-554391 &middot; National Mental Health Helpline: 16789
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}
