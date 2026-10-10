'use client';

import AnimatedContactForm from '@/components/animation/AnimatedContactForm';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const socialLinks = [
    { icon: FaLinkedin, link: '#', label: 'LinkedIn' },
    { icon: FaGithub, link: '#', label: 'GitHub' },
    { icon: FaTwitter, link: '#', label: 'Twitter' },
    { icon: FaEnvelope, link: 'mailto:your@email.com', label: 'Email' },
  ];

  return (
    <section className="min-h-screen px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div ref={headerRef} className="mb-16 text-center">
          <div className="mb-4">
            <span className="text-blue-400 font-semibold">Get In Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
            Contact Me
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'm always interested in hearing about new opportunities and
            exciting challenges.
          </p>
        </div>

        <AnimatedContactForm />

        {/* Social Links */}
        <div className="mt-16 flex justify-center gap-8">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 hover:scale-110"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
