'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedProjectCard({ project }) {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(titleRef.current, {
        color: '#60a5fa',
        duration: 0.3,
      });

      gsap.to(descRef.current, {
        color: '#e2e8f0',
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(titleRef.current, {
        color: '#ffffff',
        duration: 0.3,
      });

      gsap.to(descRef.current, {
        color: '#94a3b8',
        opacity: 0.8,
        duration: 0.3,
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Initial animation on mount
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
    });

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-800 p-6 backdrop-blur-sm transition-all"
      style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <h3
          ref={titleRef}
          className="text-2xl font-bold text-white mb-3 transition-colors duration-300"
        >
          {project.title}
        </h3>

        <p
          ref={descRef}
          className="text-slate-400 mb-4 text-sm leading-relaxed transition-all duration-300"
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}
