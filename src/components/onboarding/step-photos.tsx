'use client';

import { useState } from 'react';
import { Camera, Plus, X, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoUploadStepProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  onNext: () => void;
}

export function PhotoUploadStep({ photos, onPhotosChange, onNext }: PhotoUploadStepProps) {
  const [error, setError] = useState('');
  const maxPhotos = 6;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setError('');

    const remaining = maxPhotos - photos.length;
    if (remaining <= 0) {
      setError('Maximum 6 photos allowed');
      return;
    }

    const newPhotos: string[] = [];

    Array.from(files).slice(0, remaining).forEach((file) => {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Only JPEG, PNG, and WebP images are allowed');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Each photo must be under 5MB');
        return;
      }

      // Create preview URL (in production, upload to Supabase Storage)
      const url = URL.createObjectURL(file);
      newPhotos.push(url);
    });

    if (newPhotos.length > 0) {
      onPhotosChange([...photos, ...newPhotos]);
    }

    // Reset input
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    onPhotosChange(updated);
  };

  const canContinue = photos.length >= 1;

  return (
    <div>
      <div className="mb-6 text-center">
        <Camera className="mx-auto mb-3 h-10 w-10 text-[var(--primary)]" />
        <h2
          className="text-xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Add Your Photos
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Upload at least 1 photo (up to 6). These will be shown on your profile card.
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)] italic">
          &quot;Profile e nijer chhobi diye shuru korun — catfish na!&quot;
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: maxPhotos }).map((_, i) => {
          const photo = photos[i];
          return (
            <div key={i} className="relative aspect-[3/4]">
              {photo ? (
                <motion.div
                  className="group relative h-full w-full overflow-hidden rounded-xl border border-[var(--border)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Profile photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--danger)] text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Remove photo ${i + 1}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded-full bg-[var(--primary)] px-2 py-0.5 text-[10px] font-semibold text-white">
                      Primary
                    </span>
                  )}
                </motion.div>
              ) : (
                <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--primary)]/30 hover:bg-[var(--surface-elevated)]">
                  <Plus className="h-6 w-6 text-[var(--text-muted)]" />
                  <span className="mt-1 text-[10px] text-[var(--text-muted)]">
                    {i === 0 ? 'Required' : 'Optional'}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                    aria-label={`Upload photo ${i + 1}`}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-center text-xs text-[var(--danger)]">{error}</p>
      )}

      {/* Photo guidelines */}
      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
        <p className="text-xs text-[var(--text-muted)]">
          <strong className="text-[var(--text-secondary)]">Photo guidelines:</strong> No explicit,
          violent, hateful, or underage content. EXIF/GPS data is stripped on upload.
          You confirm you have permission to use each photo.
        </p>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!canContinue}
        className="btn-primary mt-6 w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue ({photos.length}/6 photos)
      </button>
    </div>
  );
}
