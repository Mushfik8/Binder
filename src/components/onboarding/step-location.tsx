'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Shield, Eye, EyeOff } from 'lucide-react';

interface LocationStepProps {
  initialMode: 'approximate' | 'city_only' | 'hidden';
  onNext: (mode: 'approximate' | 'city_only' | 'hidden') => void;
  onBack: () => void;
}

const locationOptions = [
  {
    value: 'approximate' as const,
    icon: MapPin,
    title: 'Approximate',
    titleBn: 'আনুমানিক',
    description: 'Show "within 2 km" radius. Your exact location is never shown.',
    recommended: true,
  },
  {
    value: 'city_only' as const,
    icon: Eye,
    title: 'City Only',
    titleBn: 'শুধু শহর',
    description: 'Only your city name is visible. No distance shown.',
    recommended: false,
  },
  {
    value: 'hidden' as const,
    icon: EyeOff,
    title: 'Hidden',
    titleBn: 'লুকানো',
    description: 'No location info shown at all. You can still browse nearby people.',
    recommended: false,
  },
];

export function LocationStep({ initialMode, onNext, onBack }: LocationStepProps) {
  const [mode, setMode] = useState<'approximate' | 'city_only' | 'hidden'>(initialMode);

  return (
    <div>
      <div className="mb-6 text-center">
        <MapPin className="mx-auto mb-3 h-10 w-10 text-[var(--success)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Location Preferences
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Choose how your location is shared. You can change this anytime.
        </p>
      </div>

      {/* Privacy callout */}
      <div className="mb-5 flex items-start gap-3 rounded-lg border border-[var(--success)]/20 bg-[var(--success)]/5 p-3">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" />
        <div>
          <p className="text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text)]">Your exact GPS coordinates are never shared</strong> with other users.
            EXIF location data is stripped from all uploaded photos.
          </p>
        </div>
      </div>

      {/* Location options */}
      <div className="space-y-3">
        {locationOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            className={cn(
              'flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all',
              mode === opt.value
                ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/30'
            )}
            type="button"
          >
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                mode === opt.value
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-muted)]'
              )}
            >
              <opt.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text)]">{opt.title}</span>
                {opt.recommended && (
                  <span className="rounded-full bg-[var(--success)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--success)]">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{opt.description}</p>
            </div>
            <div
              className={cn(
                'mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-all',
                mode === opt.value
                  ? 'border-[var(--primary)] bg-[var(--primary)]'
                  : 'border-[var(--border)]'
              )}
            >
              {mode === opt.value && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
          Back
        </button>
        <button
          type="button"
          onClick={() => onNext(mode)}
          className="btn-primary flex-1 text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
