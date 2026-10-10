'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';

import AnimatedProjectCard from '@/components/animation/AnimatedProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects, projectFilters, socials } from '@/data/portfolio';

const githubUrl = socials.find((s) => s.id === 'github')?.href;

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="scroll-mt-24 relative px-4 sm:px-6 py-20 text-white">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects I've Built"
          subtitle="AI platforms, ML pipelines and full-stack apps, built for real problems in code review, railways, agriculture and traffic."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10" role="tablist" aria-label="Filter projects">
          {projectFilters.map((name) => {
            const active = filter === name;
            return (
              <button
                key={name}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(name)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  active ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-purple-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <AnimatedProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <div className="mt-12 flex justify-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 bg-slate-900/60 text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition-all"
          >
            <FaGithub /> See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}