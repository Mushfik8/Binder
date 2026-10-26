'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { mockProfiles, type DiscoverProfile } from '@/lib/data/mock-profiles';
import { SwipeCard } from '@/components/discover/swipe-card';
import { ActionButtons } from '@/components/discover/action-buttons';
import { MatchOverlay } from '@/components/discover/match-overlay';
import { DiscoverHeader } from '@/components/discover/discover-header';
import { FilterPanel, defaultFilters, type FilterState } from '@/components/discover/filter-panel';
import { EmptyState } from '@/components/discover/empty-state';

// Simulate a 30% match chance on "like" or "super like"
const MATCH_CHANCE = 0.3;

interface SwipeRecord {
  profile: DiscoverProfile;
  direction: 'left' | 'right' | 'up';
}

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<DiscoverProfile[]>([...mockProfiles]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>([]);
  const [match, setMatch] = useState<DiscoverProfile | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 2);
  const hasProfiles = currentIndex < profiles.length;

  const handleSwipe = useCallback(
    (direction: 'left' | 'right' | 'up') => {
      const swipedProfile = profiles[currentIndex];
      if (!swipedProfile) return;

      setSwipeHistory((h) => [...h, { profile: swipedProfile, direction }]);
      setCurrentIndex((i) => i + 1);

      // Check for match on right swipe (like) or up swipe (super like)
      if (direction === 'right' || direction === 'up') {
        if (Math.random() < MATCH_CHANCE) {
          // Delay slightly for exit animation
          setTimeout(() => setMatch(swipedProfile), 500);
        }
      }
    },
    [profiles, currentIndex]
  );

  const handleUndo = useCallback(() => {
    if (swipeHistory.length === 0) return;
    setSwipeHistory((h) => h.slice(0, -1));
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, [swipeHistory.length]);

  const handleRefresh = useCallback(() => {
    setProfiles([...mockProfiles]);
    setCurrentIndex(0);
    setSwipeHistory([]);
  }, []);

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <DiscoverHeader
        onOpenFilters={() => setIsFilterOpen(true)}
        notificationCount={swipeHistory.filter((s) => s.direction === 'right' || s.direction === 'up').length > 0 ? 2 : 0}
      />

      {/* Swipe Area */}
      <div className="relative flex-1 overflow-hidden px-3 pb-3">
        {hasProfiles ? (
          <div className="relative mx-auto h-full w-full max-w-md">
            <AnimatePresence>
              {visibleProfiles.map((profile, idx) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  isTop={idx === 0}
                  onSwipe={handleSwipe}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState
            onReset={handleRefresh}
            onAdjustFilters={() => setIsFilterOpen(true)}
          />
        )}
      </div>

      {/* Action Buttons */}
      {hasProfiles && (
        <div className="pb-18 px-4 pt-2">
          <ActionButtons
            onPass={() => handleSwipe('left')}
            onLike={() => handleSwipe('right')}
            onSuperLike={() => handleSwipe('up')}
            onUndo={handleUndo}
            canUndo={swipeHistory.length > 0}
            disabled={!hasProfiles}
          />
        </div>
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Match Overlay */}
      <AnimatePresence>
        {match && (
          <MatchOverlay
            matchName={match.displayName}
            matchPhoto={match.photos[0]}
            onSendMessage={() => {
              setMatch(null);
              // TODO: Navigate to chat with match
            }}
            onKeepSwiping={() => setMatch(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
