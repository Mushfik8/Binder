import type { Metadata } from 'next';
import { BottomNav } from '@/components/discover/bottom-nav';

export const metadata: Metadata = {
  title: 'Profile — Binder',
  description: 'Manage your Binder profile.',
};

export default function ProfileLayout({ children }: LayoutProps<"/profile">) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg)]">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
