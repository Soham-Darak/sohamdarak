'use client';

import { motion } from 'motion/react';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-purple-300 pb-1">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">{subtitle}</p>}
      <div className="mt-5 h-1 w-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
    </motion.div>
  );
}