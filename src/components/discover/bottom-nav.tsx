'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Flame, MessageCircle, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/discover', icon: Flame, label: 'Discover' },
  { href: '/matches', icon: Heart, label: 'Matches' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--glass-border)] bg-[var(--surface)]/95 backdrop-blur-xl safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-4 py-1.5 text-xs font-medium transition-colors',
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn('h-6 w-6', isActive && 'drop-shadow-[0_0_6px_var(--primary)]')}
                  fill={isActive && item.icon === Flame ? 'currentColor' : 'none'}
                />
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-[var(--primary)]"
                    layoutId="nav-indicator"
                    style={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
