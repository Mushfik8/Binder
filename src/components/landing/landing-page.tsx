'use client';

import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero';
import { FeaturesSection } from '@/components/landing/features';
import { PhoneMockupSection } from '@/components/landing/phone-mockup';
import { SafetySection } from '@/components/landing/safety';
import { FAQSection } from '@/components/landing/faq';
import { CTASection } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { ScrollProgressBar } from '@/components/landing/scroll-progress';

export function LandingPage() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <PhoneMockupSection />
        <SafetySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
