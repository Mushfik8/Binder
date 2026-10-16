'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from 'lucide-react';
import { CitySelector } from '@/components/ui/city-selector';

const basicsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less'),
  age: z
    .number()
    .int()
    .min(18, 'Must be at least 18')
    .max(120, 'Please enter a valid age'),
  pronouns: z.string().max(30).optional(),
});

type BasicsFormData = z.infer<typeof basicsSchema>;

interface BasicInfoStepProps {
  initialData: {
    displayName?: string;
    age?: number;
    city?: string;
    country?: string;
    pronouns?: string;
  };
  onNext: (data: { displayName: string; age: number; city: string; country: string; pronouns?: string }) => void;
  onBack: () => void;
}

export function BasicInfoStep({ initialData, onNext, onBack }: BasicInfoStepProps) {
  const [city, setCity] = useState(initialData.city || '');
  const [country, setCountry] = useState(initialData.country || '');
  const [cityError, setCityError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      displayName: initialData.displayName || '',
      age: initialData.age || undefined,
      pronouns: initialData.pronouns || '',
    },
  });

  const onSubmit = (data: BasicsFormData) => {
    if (!city || !country) {
      setCityError('Please select your city');
      return;
    }
    setCityError('');
    onNext({
      displayName: data.displayName,
      age: data.age,
      city,
      country,
      pronouns: data.pronouns,
    });
  };

  const displayValue = city && country
    ? `${city}, ${country}`
    : '';

  return (
    <div>
      <div className="mb-6 text-center">
        <User className="mx-auto mb-3 h-10 w-10 text-[var(--primary)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About You
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Basic info for your profile card. Your age must be 18 or above.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Display Name */}
        <div>
          <label htmlFor="onboard-name" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Display Name *
          </label>
          <input
            id="onboard-name"
            type="text"
            placeholder="e.g. Rafiq, রাফিক"
            {...register('displayName')}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          {errors.displayName && (
            <p className="mt-1 text-xs text-[var(--danger)]">{errors.displayName.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="onboard-age" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Age *
          </label>
          <input
            id="onboard-age"
            type="number"
            min={18}
            max={120}
            placeholder="18+"
            {...register('age', { valueAsNumber: true })}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          {errors.age && (
            <p className="mt-1 text-xs text-[var(--danger)]">{errors.age.message}</p>
          )}
        </div>

        {/* City — searchable selector */}
        <CitySelector
          value={displayValue}
          onChange={(c, co) => { setCity(c); setCountry(co); setCityError(''); }}
          error={cityError}
        />

        {/* Pronouns (optional) */}
        <div>
          <label htmlFor="onboard-pronouns" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Pronouns <span className="text-[var(--text-muted)]">(optional)</span>
          </label>
          <input
            id="onboard-pronouns"
            type="text"
            placeholder="e.g. he/him, she/her, they/them"
            {...register('pronouns')}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
            Back
          </button>
          <button type="submit" className="btn-primary flex-1 text-center">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
