'use client';

import { useState } from 'react';
import { PenLine } from 'lucide-react';

interface BioStepProps {
  initialBio: string;
  onNext: (bio: string) => void;
  onBack: () => void;
}

const MAX_BIO = 500;

export function BioStep({ initialBio, onNext, onBack }: BioStepProps) {
  const [bio, setBio] = useState(initialBio);

  return (
    <div>
      <div className="mb-6 text-center">
        <PenLine className="mx-auto mb-3 h-10 w-10 text-[var(--primary)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Write Your Bio
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          A short bio for your profile. Keep it real, funny, or mysterious.
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)] italic">
          &quot;Corporate slave by day, chai enthusiast by night.&quot;
        </p>
      </div>

      <div>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
          placeholder="Tell people about yourself in a few lines..."
          rows={5}
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          aria-label="Bio"
        />
        <p className={`mt-1 text-right text-xs ${bio.length > MAX_BIO * 0.9 ? 'text-[var(--warning)]' : 'text-[var(--text-muted)]'}`}>
          {bio.length}/{MAX_BIO}
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
          Back
        </button>
        <button
          type="button"
          onClick={() => onNext(bio)}
          className="btn-primary flex-1 text-center"
        >
          {bio.length > 0 ? 'Continue' : 'Skip for Now'}
        </button>
      </div>
    </div>
  );
}
