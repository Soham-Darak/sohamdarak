'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeInUp({ children, delay = 0, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
      }
    );

    // Only clean up THIS element's animation (the old code killed every trigger on the page)
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}