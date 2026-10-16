'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface MoodStepProps {
  selectedMoods: string[];
  pressureLevel: number;
  onNext: (moods: string[], pressure: number) => void;
  onBack: () => void;
}

const moods = [
  { id: 'office-pressure', label: 'Office pressure', labelBn: 'অফিসের প্রেশার', emoji: '💼' },
  { id: 'gf-er-pera', label: 'GF er pera', labelBn: 'জিএফ এর পেরা', emoji: '💔' },
  { id: 'wife-pressure', label: 'Wife pressure', labelBn: 'বউয়ের প্রেশার', emoji: '😅' },
  { id: 'boss-dekhe-felse', label: 'Boss dekhe felse', labelBn: 'বস দেখে ফেলসে', emoji: '😰' },
  { id: 'salary-nai', label: 'Salary ekhono ashe nai', labelBn: 'স্যালারি আসে নাই', emoji: '💸' },
  { id: 'traffic', label: 'Traffic e atke asi', labelBn: 'ট্রাফিকে আটকে আসি', emoji: '🚗' },
  { id: 'deadline', label: 'Deadline er agun', labelBn: 'ডেডলাইনের আগুন', emoji: '🔥' },
  { id: 'exam', label: 'Exam er tension', labelBn: 'পরীক্ষার টেনশন', emoji: '📚' },
  { id: 'family-group', label: 'Family group er notification', labelBn: 'ফ্যামিলি গ্রুপ', emoji: '📱' },
  { id: 'just-break', label: 'Just need a break', labelBn: 'শুধু ব্রেক দরকার', emoji: '☕' },
];

const pressureLabels = ['Chill 😎', 'Low-key 🙂', 'Moderate 😐', 'High 😤', 'Explosive 🤯'];

export function MoodStep({ selectedMoods, pressureLevel, onNext, onBack }: MoodStepProps) {
  const [selected, setSelected] = useState<string[]>(selectedMoods);
  const [pressure, setPressure] = useState(pressureLevel);

  const toggleMood = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <Zap className="mx-auto mb-3 h-10 w-10 text-[var(--warning)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          What&apos;s Pressing Today?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Pick your current vibe. This helps people relate to you.
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)] italic">
          &quot;Same pressure, same break?&quot;
        </p>
      </div>

      {/* Pressure Meter */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">
          Today&apos;s Pressure Meter
        </h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setPressure(level)}
              className={cn(
                'flex-1 rounded-lg py-3 text-center text-xs font-medium transition-all border',
                pressure === level
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary)]/30'
              )}
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-[var(--accent)]">
          {pressureLabels[pressure - 1]}
        </p>
      </div>

      {/* Mood tags */}
      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">
          What&apos;s going on?
        </h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              onClick={() => toggleMood(mood.id)}
              className={cn(
                'chip cursor-pointer transition-all',
                selected.includes(mood.id)
                  ? 'bg-[var(--warning)] !text-[var(--bg)] border-[var(--warning)]'
                  : ''
              )}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              {mood.emoji} {mood.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
          Back
        </button>
        <button
          type="button"
          onClick={() => onNext(selected, pressure)}
          className="btn-primary flex-1 text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
