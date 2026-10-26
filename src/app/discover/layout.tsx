import type { Metadata } from 'next';
import { BottomNav } from '@/components/discover/bottom-nav';

export const metadata: Metadata = {
  title: 'Discover — Binder',
  description: 'Swipe through profiles, match by mood. Find your break-time people on Binder.',
};

export default function DiscoverLayout({ children }: LayoutProps<"/discover">) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg)]">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
