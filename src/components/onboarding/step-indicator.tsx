'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={currentStep + 1}>
      {steps.map((label, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Step dot */}
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                  isComplete && 'border-[var(--primary)] bg-[var(--primary)] text-white',
                  isCurrent && 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]',
                  !isComplete && !isCurrent && 'border-[var(--border)] text-[var(--text-muted)]'
                )}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isComplete ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span
                className={cn(
                  'mt-1 hidden text-[10px] sm:block',
                  isCurrent ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mx-1 h-[2px] w-4 sm:w-8 transition-colors',
                  i < currentStep ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
