'use client';

import { AnimatedGroup, GlowCard, InView } from '@/components/motion/primitives';
import { HaikeiWavesTop } from '@/components/svg/haikei-backgrounds';
import { Heart, MessageCircle, MapPin, Zap } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Swipe by Vibe',
    titleBn: 'Vibe diye swipe korun',
    description:
      'No boring bios. Browse people by their current mood, pressure level, and break-time energy.',
    gradient: 'from-[#E8622C] to-[#F07840]',
  },
  {
    icon: Heart,
    title: 'Match by Mood',
    titleBn: 'Mood diye match hun',
    description:
      "Same pressure? Same break? That's already half a friendship. We connect people who get each other's daily chaos.",
    gradient: 'from-[#D94040] to-[#E8622C]',
  },
  {
    icon: MessageCircle,
    title: 'Chat After Match',
    titleBn: 'Match er por kotha bolun',
    description:
      'Only mutual matches unlock chat. No creepy DMs. Start with a shared vibe, not an unsolicited "hi."',
    gradient: 'from-[#8B6914] to-[#E8A832]',
  },
  {
    icon: MapPin,
    title: 'Nearby, With Consent',
    titleBn: 'Kachakachi, onumoti niye',
    description:
      'Find people in your area — only if you both opt in. We never show exact locations. Your privacy, your rules.',
    gradient: 'from-[#3DA66B] to-[#8B6914]',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 md:py-28">
      {/* Wave transition */}
      <HaikeiWavesTop className="absolute top-0 left-0 right-0 h-[100px] w-full -translate-y-[98px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <InView>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
              How Binder Works
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Break-time just got{' '}
              <span className="text-gradient-ember">interesting.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)] md:text-lg">
              Binder matches you with people who share your pressure, your vibe, and your questionable life choices.
            </p>
          </div>
        </InView>

        {/* Feature Cards */}
        <AnimatedGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.15}
        >
          {features.map((feature) => (
            <GlowCard key={feature.title} className="group card p-6 md:p-8">
              {/* Icon */}
              <div
                className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-3`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Title */}
              <h3
                className="mb-1 text-lg font-semibold text-[var(--text)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {feature.title}
              </h3>
              <p className="mb-3 text-sm text-[var(--primary)] italic">
                {feature.titleBn}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </GlowCard>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
