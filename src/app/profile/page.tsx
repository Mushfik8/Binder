'use client';

import { motion } from 'motion/react';
import { User, Settings, Shield, Camera, MapPin, Flame, Edit3 } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';

export default function ProfilePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-[var(--primary)]" />
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Profile
          </h1>
        </div>
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text)]"
          whileTap={{ scale: 0.9 }}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </motion.button>
      </header>

      <div className="flex-1 px-5 pb-20">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-28 w-28 overflow-hidden rounded-full border-3 border-[var(--primary)] bg-[var(--surface-elevated)]">
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-14 w-14 text-[var(--text-muted)]" />
              </div>
            </div>
            <motion.button
              className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
              whileTap={{ scale: 0.9 }}
              aria-label="Change photo"
            >
              <Camera className="h-4 w-4" />
            </motion.button>
          </div>
          <h2
            className="mt-3 text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Name
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">@username</p>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Likes', value: '0', icon: '❤️' },
            { label: 'Matches', value: '0', icon: '🔥' },
            { label: 'Super', value: '0', icon: '⭐' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass flex flex-col items-center rounded-xl px-3 py-4"
            >
              <span className="text-lg">{stat.icon}</span>
              <span className="mt-1 text-lg font-bold text-[var(--text)]">{stat.value}</span>
              <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Profile Sections */}
        <div className="mt-6 space-y-3">
          {[
            { icon: Edit3, label: 'Edit Profile', desc: 'Update bio, photos, and tags' },
            { icon: MapPin, label: 'Location Settings', desc: 'Manage your location privacy' },
            { icon: Flame, label: 'Pressure Level', desc: 'Adjust your daily pressure meter' },
            { icon: Shield, label: 'Safety & Privacy', desc: 'Block list, report history' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                className="flex w-full items-center gap-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-4 text-left transition-colors hover:border-[var(--primary)]/30"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-muted)]">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                </div>
                <span className="text-[var(--text-muted)]">→</span>
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="mt-8 flex justify-center">
          <LogoutButton />
        </div>

        {/* Version */}
        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          Binder v0.1.0 · Made with ❤️ in Bangladesh
        </p>
      </div>
    </div>
  );
}
