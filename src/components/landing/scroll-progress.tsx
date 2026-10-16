'use client';

import { motion, useScroll } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        background: 'var(--gradient-ember)',
        scaleX: scrollYProgress,
      }}
      aria-hidden="true"
    />
  );
}
