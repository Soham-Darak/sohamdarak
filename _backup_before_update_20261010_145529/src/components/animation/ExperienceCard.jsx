'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ExperienceCard({ experience, index }) {
  const cardRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      }
    );

    const handleMouseEnter = () => {
      gsap.to(timelineRef.current, {
        color: '#60a5fa',
        scale: 1.1,
        duration: 0.3,
      });

      gsap.to(card, {
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
        y: -5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(timelineRef.current, {
        color: '#e2e8f0',
        scale: 1,
        duration: 0.3,
      });

      gsap.to(card, {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        y: 0,
        duration: 0.3,
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative flex gap-6 mb-12 opacity-0"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-blue-500 mt-2 ring-2 ring-blue-500/30"></div>
        {/* <div className="w-1 h-24 bg-gradient-to-b from-blue-500 to-purple-500 mt-2"></div> */}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 rounded-lg bg-slate-900/50 p-6 border border-slate-800 backdrop-blur-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
          <div>
            <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
            <p className="text-blue-400 font-semibold">{experience.company}</p>
          </div>
          <span
            ref={timelineRef}
            className="whitespace-nowrap text-sm text-slate-400 mt-2 sm:mt-0 transition-colors duration-300"
          >
            {experience.period}
          </span>
        </div>

        <p className="text-slate-300 mb-4 leading-relaxed">{experience.description}</p>

        <div className="flex flex-wrap gap-2">
          {experience.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-200 border border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
