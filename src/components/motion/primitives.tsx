'use client';

import { motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface TextEffectProps {
  children: string;
  className?: string;
  delay?: number;
  per?: 'word' | 'char';
}

export function TextEffect({ children, className, delay = 0, per = 'word' }: TextEffectProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const units = per === 'word' ? children.split(' ') : children.split('');

  return (
    <span ref={ref} className={className} aria-label={children}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          aria-hidden
        >
          {unit}
          {per === 'word' && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
}

export function TextShimmer({ children, className, duration = 3 }: TextShimmerProps) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundImage:
          'linear-gradient(90deg, var(--text-secondary) 0%, var(--accent) 25%, var(--primary) 50%, var(--accent) 75%, var(--text-secondary) 100%)',
      }}
      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

interface AnimatedGroupProps {
  children: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export function AnimatedGroup({ children, className, delay = 0, stagger = 0.1 }: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface InViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function InView({ children, className, delay = 0, direction = 'up' }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--glow-x', `${x}px`);
    ref.current.style.setProperty('--glow-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x) var(--glow-y), rgba(232, 98, 44, 0.12), transparent 60%)',
        }}
      />
      {children}
    </div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 h-[3px] origin-left ${className || ''}`}
      style={{
        background: 'var(--gradient-ember)',
        scaleX: 0,
      }}
      initial={{ scaleX: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    />
  );
}
