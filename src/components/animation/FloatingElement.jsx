'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingElement({ children, className = '', duration = 4 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: -20,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
