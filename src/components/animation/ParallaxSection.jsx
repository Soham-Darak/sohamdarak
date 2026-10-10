'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      y: (window.innerHeight - container.offsetTop) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
