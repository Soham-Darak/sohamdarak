'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ArrowUpRight, BrainCircuit, CheckCircle2, Gauge, Sprout, TrafficCone, TrainFront } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ICONS = {
  brain: BrainCircuit,
  train: TrainFront,
  gauge: Gauge,
  sprout: Sprout,
  traffic: TrafficCone,
};

export default function AnimatedProjectCard({ project }) {
  const Icon = ICONS[project.icon] ?? BrainCircuit;
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.16), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const hasLinks = project.github || project.live;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-6 sm:p-7 transition-colors duration-300 hover:border-blue-500/40 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* cursor-follow spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />
      {/* accent glow strip */}
      <div className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${project.accent} opacity-80`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className={`shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-linear-to-br ${project.accent} shadow-lg shadow-blue-900/30`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
              {project.date}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30">
                ★ Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">{project.summary}</p>

        <ul className={`grid gap-2.5 mb-6 ${project.featured ? 'md:grid-cols-2' : ''}`}>
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-200 border border-blue-500/20"
              >
                {t}
              </span>
            ))}
          </div>

          {hasLinks ? (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm font-medium text-white hover:bg-slate-700 hover:border-slate-500 transition-colors"
                >
                  <FaGithub /> Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:brightness-110 transition"
                >
                  Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500">Source available on request</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}