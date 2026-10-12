'use client';

import { TiltCard, InView } from '@/components/motion/primitives';
import { motion } from 'motion/react';
import { Heart, X, Star, Flame } from 'lucide-react';

const mockProfile = {
  name: 'Rafiq',
  age: 24,
  city: 'Dhaka',
  bio: 'Corporate slave by day, chai enthusiast by night. Office pressure Level: 💀',
  tags: ['Gold Leaf Gang', 'Tea Stall Adda'],
  moods: ['Office pressure', 'Deadline er agun'],
  pressureLevel: 4,
};

export function PhoneMockupSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <InView direction="right">
              <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
                The Experience
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Swipe your kind of{' '}
                <span className="text-gradient-ember">people.</span>
              </h2>
              <p className="mt-4 max-w-lg text-[var(--text-secondary)] lg:text-lg">
                Full-screen profiles with photos, vibes, mood chips, and break-time identity. 
                See what pressure they&apos;re surviving today before you swipe.
              </p>

              {/* Quick stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Consent
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">Based matching</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Mutual
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">Likes only</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--success)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Private
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">By default</div>
                </div>
              </div>
            </InView>
          </div>

          {/* Right: Phone Mockup */}
          <InView direction="left" delay={0.2}>
            <TiltCard className="flex-shrink-0" maxTilt={6}>
              <div className="relative mx-auto w-[280px] sm:w-[300px]">
                {/* Phone frame */}
                <div className="rounded-[2.5rem] border-2 border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl shadow-black/50">
                  {/* Notch */}
                  <div className="mx-auto mb-2 h-6 w-24 rounded-full bg-[var(--bg)]" />

                  {/* Screen content */}
                  <div className="overflow-hidden rounded-[2rem] bg-[var(--bg)]">
                    {/* Profile image placeholder */}
                    <div className="relative h-[280px] overflow-hidden bg-gradient-to-b from-[var(--surface-elevated)] to-[var(--surface)]">
                      {/* Gradient overlay with abstract pattern */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />

                      {/* Ember decorative elements */}
                      <div className="absolute top-4 right-4 rounded-full bg-[var(--primary)]/20 p-2">
                        <Flame className="h-4 w-4 text-[var(--primary)]" />
                      </div>

                      {/* Profile info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                            {mockProfile.name}
                          </h3>
                          <span className="text-lg text-white/70">{mockProfile.age}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/60">{mockProfile.city}</p>
                      </div>
                    </div>

                    {/* Profile details */}
                    <div className="p-4">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {mockProfile.bio}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {mockProfile.tags.map((tag) => (
                          <span key={tag} className="chip text-[10px] px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mood chips */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {mockProfile.moods.map((mood) => (
                          <span key={mood} className="chip chip-secondary text-[10px] px-2 py-1">
                            {mood}
                          </span>
                        ))}
                      </div>

                      {/* Pressure meter */}
                      <div className="mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                          <span>Today&apos;s Pressure:</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-1.5 w-4 rounded-full ${
                                  level <= mockProfile.pressureLevel
                                    ? 'bg-[var(--primary)]'
                                    : 'bg-[var(--border)]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-center gap-4 px-4 pb-4">
                      <motion.button
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Pass"
                      >
                        <X className="h-5 w-5 text-[var(--text-muted)]" />
                      </motion.button>
                      <motion.button
                        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-[var(--primary)]/30"
                        style={{ background: 'var(--gradient-ember)' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Like"
                      >
                        <Heart className="h-6 w-6 text-white" />
                      </motion.button>
                      <motion.button
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--surface)] shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Super Like"
                      >
                        <Star className="h-5 w-5 text-[var(--accent)]" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Glow behind phone */}
                <div
                  className="absolute -inset-4 -z-10 rounded-[3rem] opacity-30 blur-3xl"
                  style={{ background: 'var(--gradient-match)' }}
                  aria-hidden="true"
                />
              </div>
            </TiltCard>
          </InView>
        </div>
      </div>
    </section>
  );
}
