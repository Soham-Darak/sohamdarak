'use client';

import { motion } from 'motion/react';
import { Megaphone, Trophy, Users } from 'lucide-react';

const TYPE_STYLES = {
  achievement: { icon: Trophy, ring: 'from-amber-400 to-orange-500', label: 'Achievement' },
  leadership: { icon: Users, ring: 'from-blue-500 to-purple-500', label: 'Leadership' },
  outreach: { icon: Megaphone, ring: 'from-pink-500 to-purple-500', label: 'Outreach' },
};

export default function ExperienceCard({ experience, index }) {
  const style = TYPE_STYLES[experience.type] ?? TYPE_STYLES.leadership;
  const Icon = style.icon;
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative pl-14 sm:pl-16 pb-10 last:pb-0"
    >
      {/* timeline node */}
      <div
        className={`absolute left-0 top-1 grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-br ${style.ring} shadow-lg shadow-blue-900/40 ring-4 ring-[#020617]`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{experience.title}</h3>
            <p className="text-blue-400 font-medium text-sm sm:text-base">{experience.org}</p>
          </div>
          <span className="shrink-0 self-start px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
            {experience.period}
          </span>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{experience.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            {style.label}
          </span>
          {experience.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}