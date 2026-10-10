'use client';

import { motion } from 'motion/react';
import { Award, BadgeCheck, GraduationCap, MapPin } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { certifications, education } from '@/data/portfolio';

export default function EducationPage() {
  return (
    <section id="education" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Learning"
          title="Education & Certifications"
          subtitle="Formal foundations in computer science, plus industry certifications in AI, ML and web development."
        />

        {/* Degree card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 mb-10"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 grid place-items-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-900/40">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">{education.degree}</h3>
                  <p className="text-blue-400 font-medium mt-1">{education.school}</p>
                  <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1">
                    <MapPin className="w-4 h-4" /> {education.location}
                  </p>
                </div>
                <span className="self-start px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
                  {education.period}
                </span>
              </div>

              <span className="inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30">
                {education.honours}
              </span>

              <div className="mt-5 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-200 border border-blue-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-200 mb-5">
          <Award className="w-5 h-5 text-purple-400" /> Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="shrink-0 grid place-items-center w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white leading-snug">{cert.title}</p>
                <p className="text-sm text-slate-400">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}