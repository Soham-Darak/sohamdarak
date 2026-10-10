'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StaggerChildren({ children, staggerDelay = 0.1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childElements = container.children;
    
    gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerDelay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
