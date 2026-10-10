'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollObserver({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate on scroll
    gsap.from(container, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      {children}
    </div>
  );
}
