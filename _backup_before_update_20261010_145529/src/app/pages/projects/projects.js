'use client';

import AnimatedProjectCard from '@/components/animation/AnimatedProjectCard';
import ScrollObserver from '@/components/animation/ScrollObserver';
import RotatingCube from '@/components/utilities/RotatingCube';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Interactive dashboard with real-time data visualization and advanced filtering capabilities.',
    tags: ['React', 'D3.js', 'WebSocket', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Mobile App',
    description: 'Cross-platform mobile application with offline support and cloud synchronization.',
    tags: ['React Native', 'Firebase', 'Redux'],
    link: '#',
  },
  {
    title: 'AI Chat Interface',
    description: 'Real-time chat application powered by AI with natural language processing.',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'TailwindCSS'],
    link: '#',
  },
];

export default function ProjectsPage() {
  const titleRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (headerRef.current) {
      const words = headerRef.current.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-24 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <RotatingCube />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16">
          <div className="mb-4">
            <span className="text-blue-400 font-semibold">Featured Work</span>
          </div>
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400"
          >
            <span className="word">Innovative</span>
            <span className="word"> Projects</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            A collection of my best work showcasing expertise in full-stack development, creative problem-solving, and
            cutting-edge technologies.
          </p>
        </div>

        <ScrollObserver className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, idx) => (
            <AnimatedProjectCard key={idx} project={project} />
          ))}
        </ScrollObserver>
      </div>
    </section>
  );
}
