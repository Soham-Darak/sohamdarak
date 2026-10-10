'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Trophy } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import AnimatedContactForm from '@/components/animation/AnimatedContactForm';
import SectionHeading from '@/components/ui/SectionHeading';
import { profile, socials } from '@/data/portfolio';

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  codolio: Trophy,
  mail: Mail,
};

export default function ContactPage() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something"
          subtitle="Have a project, internship or collaboration in mind? Send a message and I'll reply as soon as I can."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4 transition-all hover:border-blue-500/40 hover:-translate-y-0.5"
            >
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300">
                <Mail className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">Email</span>
                <span className="block text-sm sm:text-base text-white truncate">{profile.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">Based in</span>
                <span className="block text-sm sm:text-base text-white">{profile.location}</span>
              </span>
            </div>

            <div className="pt-2 space-y-3">
              {socials
                .filter((s) => s.id !== 'mail')
                .map((s) => {
                  const Icon = SOCIAL_ICONS[s.id] ?? ArrowUpRight;
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md px-4 py-3 text-slate-300 transition-all hover:text-white hover:border-blue-500/40 hover:bg-slate-800/70"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" /> {s.label}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </a>
                  );
                })}
            </div>
          </motion.div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <AnimatedContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}