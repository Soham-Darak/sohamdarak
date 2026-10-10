'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reveals text character by character. Pass a plain string as children.
export default function RevealText({ children, className = '' }) {
  const ref = useRef(null);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('[data-char]');

    const tween = gsap.fromTo(
      chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.03,
        stagger: 0.03,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      }
    );

    // Clean up only this element's animation
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={ref} className={`whitespace-nowrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          data-char
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}