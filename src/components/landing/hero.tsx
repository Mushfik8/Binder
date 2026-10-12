'use client';

import { TextEffect, TextShimmer, InView } from '@/components/motion/primitives';
import { HaikeiWavesBottom } from '@/components/svg/haikei-backgrounds';
import { motion } from 'motion/react';
import { ArrowRight, Flame } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6"
    >
      {/* Background smoke haze */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Ambient glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'var(--primary)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'var(--secondary)' }}
        />
      </div>

      {/* Haikei waves at the bottom */}
      <HaikeiWavesBottom className="absolute bottom-0 left-0 right-0 h-[250px] w-full md:h-[350px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Small tagline */}
        <InView delay={0.1}>
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
              <Flame className="h-3.5 w-3.5 text-[var(--primary)]" />
              Swipe your smoke break
            </span>
          </div>
        </InView>

        {/* Hero headline */}
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
          <TextEffect per="word" delay={0.3}>
            Your smoke break
          </TextEffect>
          <br />
          <span className="text-gradient-ember">
            <TextEffect per="word" delay={0.8}>
              has a social life.
            </TextEffect>
          </span>
        </h1>

        {/* Banglish subheadline */}
        <div className="mb-8 text-lg text-[var(--text-secondary)] sm:text-xl md:text-2xl">
          <TextShimmer duration={4}>
            Biri ho, cigarette ho — break-time er buddy khujen nin.
          </TextShimmer>
        </div>

        {/* Secondary description */}
        <InView delay={1.2}>
          <p className="mx-auto mb-10 max-w-2xl text-base text-[var(--text-muted)] md:text-lg">
            A community for adults who vibe over shared pressure, chai breaks, and questionable life choices.
            Match by mood, not just by looks.
          </p>
        </InView>

        {/* CTA Buttons */}
        <InView delay={1.4}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="#join"
              className="btn-primary group flex items-center gap-2 text-base"
              id="hero-join-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Binder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#features"
              className="btn-secondary text-base"
              id="hero-features-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              How it works
            </motion.a>
          </div>
        </InView>

        {/* Health disclaimer */}
        <InView delay={1.6}>
          <p className="mt-8 text-xs text-[var(--text-muted)] sm:text-sm">
            ⚠️ Smoking harms health. Binder does not sell or promote tobacco.
          </p>
        </InView>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="h-10 w-6 rounded-full border-2 border-[var(--border)] p-1">
          <motion.div
            className="h-2 w-2 rounded-full bg-[var(--primary)]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
