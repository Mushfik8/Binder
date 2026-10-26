import type { Metadata } from 'next';
import { BottomNav } from '@/components/discover/bottom-nav';

export const metadata: Metadata = {
  title: 'Chat — Binder',
  description: 'Chat with your matches on Binder.',
};

export default function ChatLayout({ children }: LayoutProps<"/chat">) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg)]">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
