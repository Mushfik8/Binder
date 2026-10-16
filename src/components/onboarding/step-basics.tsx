'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileBasicsSchema, type ProfileBasicsData } from '@/lib/validations/profile';
import { User } from 'lucide-react';

interface BasicInfoStepProps {
  initialData: Partial<ProfileBasicsData>;
  onNext: (data: ProfileBasicsData) => void;
  onBack: () => void;
}

export function BasicInfoStep({ initialData, onNext, onBack }: BasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileBasicsData>({
    resolver: zodResolver(profileBasicsSchema),
    defaultValues: {
      displayName: initialData.displayName || '',
      age: initialData.age || undefined,
      city: initialData.city || '',
      pronouns: initialData.pronouns || '',
    },
  });

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

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
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

        {/* City */}
        <div>
          <label htmlFor="onboard-city" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            City *
          </label>
          <input
            id="onboard-city"
            type="text"
            placeholder="e.g. Dhaka, Chittagong"
            {...register('city')}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-[var(--danger)]">{errors.city.message}</p>
          )}
        </div>

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
