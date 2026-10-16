'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { BinderLogo, BinderWordmark } from '@/components/brand/logo';
import { HaikeiBlurryGradient } from '@/components/svg/haikei-backgrounds';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { PhotoUploadStep } from '@/components/onboarding/step-photos';
import { BasicInfoStep } from '@/components/onboarding/step-basics';
import { BioStep } from '@/components/onboarding/step-bio';
import { TagsStep } from '@/components/onboarding/step-tags';
import { MoodStep } from '@/components/onboarding/step-moods';
import { LocationStep } from '@/components/onboarding/step-location';
import { RulesStep } from '@/components/onboarding/step-rules';
import { createClient } from '@/lib/supabase/client';

const STEPS = ['Photos', 'Basics', 'Bio', 'Tags', 'Moods', 'Location', 'Rules'];

interface OnboardingData {
  photos: string[];
  basics: {
    displayName?: string;
    age?: number;
    city?: string;
    country?: string;
    pronouns?: string;
  };
  bio: string;
  tags: string[];
  moods: string[];
  pressureLevel: number;
  locationMode: 'approximate' | 'city_only' | 'hidden';
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    photos: [],
    basics: {},
    bio: '',
    tags: [],
    moods: [],
    pressureLevel: 3,
    locationMode: 'approximate',
  });

  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1)), []);
  const back = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), []);

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Upsert profile (creates if trigger didn't, updates if it did)
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          display_name: data.basics.displayName,
          age: data.basics.age,
          city: `${data.basics.city}, ${data.basics.country}`,
          pronouns: data.basics.pronouns || null,
          bio: data.bio || null,
          pressure_meter: data.pressureLevel,
          location_mode: data.locationMode,
          location_city: data.basics.city,
          onboarding_completed: true,
          terms_accepted_at: new Date().toISOString(),
          health_disclaimer_accepted_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Profile update error:', error);
        // Still redirect — profile can be completed later
      }

      // In production: upload photos to Supabase Storage,
      // insert tags into profile_tags, moods into profile_moods

      router.push('/discover');
    } catch (err) {
      console.error('Onboarding error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <HaikeiBlurryGradient className="absolute inset-0 h-full w-full opacity-30" />
      <div className="absolute inset-0 bg-[var(--bg)]/70" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <BinderLogo size={36} />
          <BinderWordmark className="mt-1 text-lg text-[var(--text)]" />
        </div>

        {/* Step indicator */}
        <div className="mb-6">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {currentStep === 0 && (
                <PhotoUploadStep
                  photos={data.photos}
                  onPhotosChange={(photos) => setData((d) => ({ ...d, photos }))}
                  onNext={next}
                />
              )}

              {currentStep === 1 && (
                <BasicInfoStep
                  initialData={data.basics}
                  onNext={(basics) => {
                    setData((d) => ({ ...d, basics }));
                    next();
                  }}
                  onBack={back}
                />
              )}

              {currentStep === 2 && (
                <BioStep
                  initialBio={data.bio}
                  onNext={(bio) => {
                    setData((d) => ({ ...d, bio }));
                    next();
                  }}
                  onBack={back}
                />
              )}

              {currentStep === 3 && (
                <TagsStep
                  selectedTags={data.tags}
                  onNext={(tags) => {
                    setData((d) => ({ ...d, tags }));
                    next();
                  }}
                  onBack={back}
                />
              )}

              {currentStep === 4 && (
                <MoodStep
                  selectedMoods={data.moods}
                  pressureLevel={data.pressureLevel}
                  onNext={(moods, pressure) => {
                    setData((d) => ({ ...d, moods, pressureLevel: pressure }));
                    next();
                  }}
                  onBack={back}
                />
              )}

              {currentStep === 5 && (
                <LocationStep
                  initialMode={data.locationMode}
                  onNext={(mode) => {
                    setData((d) => ({ ...d, locationMode: mode }));
                    next();
                  }}
                  onBack={back}
                />
              )}

              {currentStep === 6 && (
                <RulesStep
                  onComplete={handleComplete}
                  onBack={back}
                  isSubmitting={isSubmitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          Step {currentStep + 1} of {STEPS.length} · You can update everything later in Settings
        </p>
      </div>
    </div>
  );
}
