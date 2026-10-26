import type { Metadata } from 'next';
import { BottomNav } from '@/components/discover/bottom-nav';

export const metadata: Metadata = {
  title: 'Matches — Binder',
  description: 'See who matched with you on Binder.',
};

export default function MatchesLayout({ children }: LayoutProps<"/matches">) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg)]">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
