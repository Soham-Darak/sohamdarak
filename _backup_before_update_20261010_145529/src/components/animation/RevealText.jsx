'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({ children, className = '' }) {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Split text into characters
    const text_content = text.innerText;
    text.innerText = '';

    // Create spans for each character
    text_content.split('').forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      text.appendChild(span);
    });

    const characters = text.querySelectorAll('span');

    gsap.to(characters, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.03,
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        markers: false,
      },
      ease: 'power1.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}
