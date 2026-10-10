'use client';

import ExperienceCard from '@/components/animation/ExperienceCard';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description:
      'Led development of responsive web applications using React and Next.js. Mentored junior developers and implemented best practices for code quality and performance optimization.',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'WebGL'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2020 - 2022',
    description:
      'Developed full-stack web applications with Node.js and React. Collaborated with UI/UX designers to implement beautiful and functional interfaces.',
    skills: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS'],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 - 2020',
    description:
      'Built responsive websites and small web applications. Gained solid foundation in JavaScript, HTML, CSS and version control systems.',
    skills: ['JavaScript', 'HTML/CSS', 'jQuery', 'Git', 'Bootstrap'],
  },
];

export default function ExperiencePage() {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
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

  return (
    <section className="min-h-screen px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div ref={titleRef} className="mb-16">
          <div className="mb-4">
            <span className="text-blue-400 font-semibold">Career Journey</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
            Experience
          </h1>
          <p className="text-lg text-slate-400">
            A timeline of my professional growth and accomplishments in web development.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

          {/* Experience cards */}
          <div className="relative z-10 ml-8">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} experience={exp} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
