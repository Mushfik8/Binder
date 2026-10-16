'use client';

import { InView } from '@/components/motion/primitives';
import { Accordion } from '@/components/motion/accordion';

const faqItems = [
  {
    question: 'Binder ki Tinder er moto?',
    answer:
      'Na! Binder ekta completely original product — Bangladeshi adults er jonno banano, jara break-time er vibe share korte chay. Eikhane dating er focus na, shared pressure ar lifestyle humor er focus. We have our own identity, rules, and community.',
  },
  {
    question: 'Is Binder a dating app?',
    answer:
      'Binder is a social matching app, not a dating platform. While you can connect with like-minded people, the focus is on shared vibes, break-time moments, and community — not romantic matching. Think of it as finding your smoke-break squad.',
  },
  {
    question: 'Does Binder sell cigarettes or tobacco?',
    answer:
      'Absolutely not. Binder does not sell, promote, advertise, or facilitate the sale of any tobacco product. We are not affiliated with any tobacco company. Brand-preference tags like "Gold Leaf Gang" are user-created vibe tags only — not endorsements.',
  },
  {
    question: 'Ami ki 18 er niche hole use korte parbo?',
    answer:
      'Na. Binder strictly 18+ only. Registration er shomoy date-of-birth confirmation lagbe, and age gate bypass attempt monitor kora hoy. Under-18 accounts immediately removed hobe.',
  },
  {
    question: 'How does location work? Is my exact location shared?',
    answer:
      'Never. We only use approximate location — broad buckets like "within 2 km" or "in Dhaka." You can choose: approximate location, city only, or stay completely hidden. GPS coordinates are never exposed to other users. EXIF location data is stripped from all uploaded photos.',
  },
  {
    question: 'How do you handle harassment and abuse?',
    answer:
      'Every profile, message, and post has block/report controls. Reports are reviewed by our moderation team. Harassment, hate speech, bullying, and explicit content result in warnings, suspensions, or permanent bans. We also have automated content filtering for Bangla and Banglish text.',
  },
  {
    question: 'Can I delete my account and data?',
    answer:
      'Yes. Go to Settings → Delete Account. You\'ll get a 7-day grace period to change your mind. After that, your profile, photos, messages, and posts are permanently deleted. You can also export all your data before deletion.',
  },
  {
    question: 'Binder ki free?',
    answer:
      'Ha, Binder free to use. Amra kono tobacco company er sponsor nei, ar premium features kabhu safety features er pichone locked thakbe na. Future e optional cosmetic features ashte pare, but core experience shob shomoy free thakbe.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <InView>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
              FAQ
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Questions? We got{' '}
              <span className="text-gradient-ember">answers.</span>
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Common questions about Binder, safety, and how it works.
            </p>
          </div>
        </InView>

        {/* FAQ Accordion */}
        <InView delay={0.2}>
          <Accordion items={faqItems} />
        </InView>

        {/* Contact CTA */}
        <InView delay={0.4}>
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              Still have questions?{' '}
              <a
                href="mailto:support@binder.app"
                className="text-[var(--primary)] underline underline-offset-4 transition-colors hover:text-[var(--primary-hover)]"
              >
                Contact us
              </a>
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}
