'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  ageRange: [number, number];
  maxDistance: number;
  pressureRange: [number, number];
  selectedTags: string[];
}

const defaultFilters: FilterState = {
  ageRange: [18, 40],
  maxDistance: 50,
  pressureRange: [1, 5],
  selectedTags: [],
};

const availableTags = [
  'Gold Leaf Gang',
  'Biri Veteran',
  'Marlboro Mood',
  'Benson Boy',
  'Lucky Strike Crew',
  'Corporate Life',
  'Campus Life',
  'Tea Stall Adda',
  'Late Night Work',
  'Music',
  'Gaming',
  'Football',
  'Coding',
];

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
  };

  const toggleTag = (tag: string) => {
    setLocalFilters((f) => ({
      ...f,
      selectedTags: f.selectedTags.includes(tag)
        ? f.selectedTags.filter((t) => t !== tag)
        : [...f.selectedTags, tag],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[var(--glass-border)] bg-[var(--surface)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-[var(--border)]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Filters
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6 px-5 pb-8">
              {/* Age Range */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                  Age Range: {localFilters.ageRange[0]} – {localFilters.ageRange[1]}
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-muted)]">18</span>
                  <input
                    type="range"
                    min={18}
                    max={60}
                    value={localFilters.ageRange[0]}
                    onChange={(e) =>
                      setLocalFilters((f) => ({
                        ...f,
                        ageRange: [Math.min(Number(e.target.value), f.ageRange[1]), f.ageRange[1]],
                      }))
                    }
                    className="filter-range flex-1"
                  />
                  <input
                    type="range"
                    min={18}
                    max={60}
                    value={localFilters.ageRange[1]}
                    onChange={(e) =>
                      setLocalFilters((f) => ({
                        ...f,
                        ageRange: [f.ageRange[0], Math.max(Number(e.target.value), f.ageRange[0])],
                      }))
                    }
                    className="filter-range flex-1"
                  />
                  <span className="text-xs text-[var(--text-muted)]">60</span>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                  Maximum Distance: {localFilters.maxDistance} km
                </label>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={localFilters.maxDistance}
                  onChange={(e) =>
                    setLocalFilters((f) => ({ ...f, maxDistance: Number(e.target.value) }))
                  }
                  className="filter-range w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-[var(--text-muted)]">
                  <span>1 km</span>
                  <span>200 km</span>
                </div>
              </div>

              {/* Pressure Level */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                  Pressure Level: {localFilters.pressureRange[0]} – {localFilters.pressureRange[1]}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const inRange =
                      level >= localFilters.pressureRange[0] &&
                      level <= localFilters.pressureRange[1];
                    return (
                      <button
                        key={level}
                        onClick={() => {
                          setLocalFilters((f) => {
                            const [min, max] = f.pressureRange;
                            if (level < min) return { ...f, pressureRange: [level, max] };
                            if (level > max) return { ...f, pressureRange: [min, level] };
                            if (level === min && level === max) return f;
                            if (level === min)
                              return { ...f, pressureRange: [level + 1, max] as [number, number] };
                            return { ...f, pressureRange: [min, level - 1] as [number, number] };
                          });
                        }}
                        className={cn(
                          'flex-1 rounded-lg py-2 text-sm font-semibold transition-all',
                          inRange
                            ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                            : 'bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text)]'
                        )}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-between text-xs text-[var(--text-muted)]">
                  <span>Chill 😎</span>
                  <span>Explosive 🤯</span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
                  Tags{' '}
                  {localFilters.selectedTags.length > 0 && (
                    <span className="text-[var(--text-muted)]">
                      ({localFilters.selectedTags.length} selected)
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const selected = localFilters.selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          'chip transition-all',
                          selected
                            ? 'bg-[var(--primary)]/20 border-[var(--primary)]/40 text-[var(--primary)]'
                            : 'bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply button */}
              <button onClick={handleApply} className="btn-primary w-full text-center">
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { defaultFilters };
