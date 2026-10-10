'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'motion/react';

import ExperienceCard from '@/components/animation/ExperienceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { journey, journeyStats } from '@/data/portfolio';

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export default function ExperiencePage() {
  return (
    <section id="experience" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="Achievements & Leadership"
          subtitle="Hackathons, community work and the things I've led, because good engineering also needs good teamwork."
        />

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {journeyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 sm:left-[22px] top-2 bottom-2 w-px bg-linear-to-b from-blue-500 via-purple-500 to-transparent" />
          <div className="relative">
            {journey.map((item, idx) => (
              <ExperienceCard key={item.title} experience={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}