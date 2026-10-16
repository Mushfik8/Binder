'use client';

import { useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'motion/react';
import { cn } from '@/lib/utils';
import type { DiscoverProfile } from '@/lib/data/mock-profiles';
import {
  MapPin,
  Verified,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface SwipeCardProps {
  profile: DiscoverProfile;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;
const SWIPE_UP_THRESHOLD = 80;

const pressureLabels = ['Chill 😎', 'Low-key 🙂', 'Moderate 😐', 'High 😤', 'Explosive 🤯'];

export function SwipeCard({ profile, onSwipe, isTop }: SwipeCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotation based on drag
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);

  // Stamp opacity
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const passOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
  const superOpacity = useTransform(y, [-SWIPE_UP_THRESHOLD, 0], [1, 0]);

  // Background tint
  const bgLike = useTransform(x, [0, SWIPE_THRESHOLD], ['rgba(0,0,0,0)', 'rgba(34,197,94,0.15)']);
  const bgPass = useTransform(x, [-SWIPE_THRESHOLD, 0], ['rgba(239,68,68,0.15)', 'rgba(0,0,0,0)']);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;

    // Super like (swipe up)
    if (offset.y < -SWIPE_UP_THRESHOLD && Math.abs(offset.x) < SWIPE_THRESHOLD) {
      setExitDirection('up');
      onSwipe('up');
      return;
    }

    // Like (swipe right)
    if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
      setExitDirection('right');
      onSwipe('right');
      return;
    }

    // Pass (swipe left)
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
      setExitDirection('left');
      onSwipe('left');
      return;
    }
  };

  const nextPhoto = () => {
    if (photoIndex < profile.photos.length - 1) {
      setPhotoIndex((i) => i + 1);
    }
  };

  const prevPhoto = () => {
    if (photoIndex > 0) {
      setPhotoIndex((i) => i - 1);
    }
  };

  const exitVariants = {
    left: { x: -600, rotate: -30, opacity: 0 },
    right: { x: 600, rotate: 30, opacity: 0 },
    up: { y: -600, opacity: 0 },
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'absolute inset-0 cursor-grab active:cursor-grabbing',
        !isTop && 'pointer-events-none'
      )}
      style={{ x, y, rotate, zIndex: isTop ? 10 : 0 }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection
          ? exitVariants[exitDirection]
          : isTop
            ? { scale: 1, y: 0 }
            : { scale: 0.95, y: 10 }
      }
      transition={
        exitDirection
          ? { duration: 0.4, ease: 'easeOut' }
          : { type: 'spring', stiffness: 300, damping: 25 }
      }
      initial={isTop ? { scale: 1, y: 0 } : { scale: 0.95, y: 10 }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl"
        style={{ background: bgLike }}
      >
        <motion.div className="absolute inset-0" style={{ background: bgPass }} />

        {/* Photo */}
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photos[photoIndex]}
            alt={profile.displayName}
            className="h-full w-full object-cover"
            draggable={false}
          />

          {/* Photo navigation indicators */}
          {profile.photos.length > 1 && (
            <div className="absolute top-3 left-3 right-3 flex gap-1">
              {profile.photos.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    i === photoIndex ? 'bg-white' : 'bg-white/30'
                  )}
                />
              ))}
            </div>
          )}

          {/* Photo navigation tap zones */}
          {profile.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-0 top-0 h-full w-1/3 z-20"
                aria-label="Previous photo"
              />
              <button
                onClick={nextPhoto}
                className="absolute right-0 top-0 h-full w-1/3 z-20"
                aria-label="Next photo"
              />
            </>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* LIKE stamp */}
          <motion.div
            className="absolute top-8 left-6 z-30 -rotate-12 rounded-lg border-4 border-[var(--success)] px-4 py-2"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-3xl font-black tracking-widest text-[var(--success)]">LIKE</span>
          </motion.div>

          {/* PASS stamp */}
          <motion.div
            className="absolute top-8 right-6 z-30 rotate-12 rounded-lg border-4 border-[var(--danger)] px-4 py-2"
            style={{ opacity: passOpacity }}
          >
            <span className="text-3xl font-black tracking-widest text-[var(--danger)]">NOPE</span>
          </motion.div>

          {/* SUPER stamp */}
          <motion.div
            className="absolute top-1/3 left-1/2 z-30 -translate-x-1/2 rounded-lg border-4 border-[var(--accent)] px-4 py-2"
            style={{ opacity: superOpacity }}
          >
            <span className="text-2xl font-black tracking-widest text-[var(--accent)]">SUPER 🔥</span>
          </motion.div>

          {/* Profile info overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
            {/* Name and age */}
            <div className="flex items-center gap-2">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {profile.displayName}
              </h2>
              <span className="text-lg text-white/80">{profile.age}</span>
              {profile.isVerified && (
                <Verified className="h-5 w-5 text-[var(--primary)]" />
              )}
            </div>

            {/* City and distance */}
            <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-3.5 w-3.5" />
              <span>{profile.city}</span>
              {profile.distanceKm && (
                <span className="text-white/50">· {profile.distanceKm} km away</span>
              )}
            </div>

            {/* Bio */}
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {profile.bio}
            </p>

            {/* Pressure meter */}
            <div className="mt-3 flex items-center gap-2">
              <Flame className="h-4 w-4 text-[var(--primary)]" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      'h-2 w-5 rounded-full',
                      level <= profile.pressureLevel
                        ? 'bg-[var(--primary)]'
                        : 'bg-white/20'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-white/60">
                {pressureLabels[profile.pressureLevel - 1]}
              </span>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {profile.moods.slice(0, 1).map((mood) => (
                <span
                  key={mood}
                  className="rounded-full bg-[var(--warning)]/20 px-2.5 py-1 text-[11px] font-medium text-[var(--warning)] backdrop-blur-sm"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
