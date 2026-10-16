'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Flame, Cigarette } from 'lucide-react';

interface TagsStepProps {
  selectedTags: string[];
  onNext: (tags: string[]) => void;
  onBack: () => void;
}

const brandTags = [
  { id: 'benson-boy', label: 'Benson Boy', labelBn: 'বেনসন বয়' },
  { id: 'gold-leaf-gang', label: 'Gold Leaf Gang', labelBn: 'গোল্ড লিফ গ্যাং' },
  { id: 'lucky-strike-crew', label: 'Lucky Strike Crew', labelBn: 'লাকি স্ট্রাইক ক্রু' },
  { id: 'marlboro-mood', label: 'Marlboro Mood', labelBn: 'মার্লবরো মুড' },
  { id: 'biri-veteran', label: 'Biri Veteran', labelBn: 'বিড়ি ভেটেরান' },
];

const interestTags = [
  { id: 'tea-stall-adda', label: 'Tea Stall Adda', labelBn: 'চায়ের স্টলে আড্ডা', emoji: '☕' },
  { id: 'late-night-work', label: 'Late Night Work', labelBn: 'রাত জেগে কাজ', emoji: '🌙' },
  { id: 'music', label: 'Music', labelBn: 'গান-বাজনা', emoji: '🎵' },
  { id: 'football', label: 'Football', labelBn: 'ফুটবল', emoji: '⚽' },
  { id: 'coding', label: 'Coding', labelBn: 'কোডিং', emoji: '💻' },
  { id: 'gaming', label: 'Gaming', labelBn: 'গেমিং', emoji: '🎮' },
  { id: 'campus-life', label: 'Campus Life', labelBn: 'ক্যাম্পাস লাইফ', emoji: '🎓' },
  { id: 'corporate-life', label: 'Corporate Life', labelBn: 'কর্পোরেট লাইফ', emoji: '💼' },
];

export function TagsStep({ selectedTags, onNext, onBack }: TagsStepProps) {
  const [selected, setSelected] = useState<string[]>(selectedTags);

  const toggleTag = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <Flame className="mx-auto mb-3 h-10 w-10 text-[var(--primary)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your Break-Time Identity
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Pick your vibe tags and interests. These help people find you.
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)] italic">
          &quot;Brand preference ≠ endorsement. Just vibe, bhai.&quot;
        </p>
      </div>

      {/* Brand / Style Tags */}
      <div className="mb-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
          <Cigarette className="h-4 w-4 text-[var(--primary)]" />
          Brand / Style
          <span className="text-[var(--text-muted)] font-normal">(non-commercial vibe tags)</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {brandTags.map((tag) => (
            <motion.button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={cn(
                'chip cursor-pointer transition-all',
                selected.includes(tag.id)
                  ? 'bg-[var(--primary)] !text-white border-[var(--primary)]'
                  : ''
              )}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              {tag.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Interest Tags */}
      <div className="mb-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">
          Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interestTags.map((tag) => (
            <motion.button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={cn(
                'chip chip-secondary cursor-pointer transition-all',
                selected.includes(tag.id)
                  ? 'bg-[var(--secondary)] !text-white border-[var(--secondary)]'
                  : ''
              )}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              {tag.emoji} {tag.label}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[var(--text-muted)]">
        Selected: {selected.length} tag{selected.length !== 1 ? 's' : ''}
      </p>

      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 text-center">
          Back
        </button>
        <button
          type="button"
          onClick={() => onNext(selected)}
          className="btn-primary flex-1 text-center"
        >
          {selected.length > 0 ? 'Continue' : 'Skip for Now'}
        </button>
      </div>
    </div>
  );
}
