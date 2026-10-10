'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

// ── Easy to customise ────────────────────────────────────────────────
const NAME = 'SOHAM DARAK';
const ROLE = 'Full-Stack Developer';
const DOMAIN = 'sohamdarak.dev';
const DURATION = 2.4; // seconds of "loading" before the split reveal

const STATUS = [
  { at: 0, text: 'initializing environment' },
  { at: 28, text: 'loading components' },
  { at: 58, text: 'compiling experience' },
  { at: 86, text: 'launching portfolio' },
];

const BG = '#020617';
const DOTS = 'radial-gradient(rgba(148,163,184,0.10) 1px, transparent 1px)';

export default function LoadingScreen({ onReveal, onComplete }) {
  const [visible, setVisible] = useState(true);
  const [statusIdx, setStatusIdx] = useState(0);

  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const tlRef = useRef(null);
  const idxRef = useRef(0);
  const cbRef = useRef({ onReveal, onComplete });

  useEffect(() => {
    cbRef.current = { onReveal, onComplete };
  });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 0.6 : DURATION;
    const state = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          cbRef.current.onComplete?.();
        },
      });
      tlRef.current = tl;

      // 1) Intro: monogram draws, name fades in, corner labels appear
      if (reduce) {
        gsap.set('.sd-stroke', { strokeDashoffset: 0, fillOpacity: 1 });
        gsap.set('.sd-char, .sd-corner', { opacity: 1, y: 0 });
      } else {
        tl.fromTo(
          '.sd-stroke',
          { strokeDashoffset: 600 },
          { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' },
          0.1
        )
          .fromTo(
            '.sd-stroke',
            { fillOpacity: 0 },
            { fillOpacity: 1, duration: 0.6, ease: 'power1.out' },
            1.0
          )
          .fromTo(
            '.sd-char',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' },
            0.5
          )
          .to('.sd-corner', { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.3);
      }

      // 2) Progress: counter + status text + the glowing horizon line
      tl.to(
        state,
        {
          value: 100,
          duration: dur,
          ease: 'power2.inOut',
          onUpdate: () => {
            const v = state.value;
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(v)).padStart(3, '0');
            }
            let idx = 0;
            STATUS.forEach((s, i) => {
              if (v >= s.at) idx = i;
            });
            if (idx !== idxRef.current) {
              idxRef.current = idx;
              setStatusIdx(idx);
            }
          },
        },
        0
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: dur, ease: 'power2.inOut' },
        0
      );

      // 3) Exit: the screen splits along the horizon line
      tl.addLabel('exit', dur + 0.25);
      tl.call(() => cbRef.current.onReveal?.(), null, 'exit+=0.1');

      if (reduce) {
        tl.to(rootRef.current, { opacity: 0, duration: 0.4 }, 'exit+=0.1');
      } else {
        tl.to(lineRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 'exit');
        tl.to(topRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 'exit+=0.1');
        tl.to(bottomRef.current, { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, 'exit+=0.1');
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Skip: jump straight to the exit animation
  const skip = () => {
    const tl = tlRef.current;
    if (!tl || tl.time() >= tl.labels.exit) return;
    tl.seek('exit', false).play();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (['Enter', ' ', 'Escape'].includes(e.key)) skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      onClick={skip}
      className="fixed inset-0 z-100 cursor-pointer overflow-hidden select-none"
    >
      {/* ── TOP HALF: monogram + name ───────────────────────────── */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2 will-change-transform"
        style={{
          backgroundColor: BG,
          backgroundImage: `radial-gradient(70% 90% at 50% 100%, rgba(59,130,246,0.18), transparent 70%), ${DOTS}`,
          backgroundSize: 'auto, 28px 28px',
        }}
      >
        <span
          className="sd-corner absolute top-5 left-5 sm:top-7 sm:left-8 text-[10px] sm:text-xs font-mono tracking-widest text-slate-500"
          style={{ opacity: 0 }}
        >
          {DOMAIN}
        </span>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-10">
          <svg viewBox="0 0 150 96" className="w-28 sm:w-36 mb-3 overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="sdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="55%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <text
              className="sd-stroke"
              x="75"
              y="78"
              textAnchor="middle"
              fontSize="86"
              fontWeight="800"
              letterSpacing="-3"
              fill="url(#sdGrad)"
              stroke="url(#sdGrad)"
              strokeWidth="1.5"
              style={{
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                strokeDasharray: 600,
                strokeDashoffset: 600,
                fillOpacity: 0,
              }}
            >
              SD
            </text>
          </svg>

          <p className="text-xs sm:text-sm tracking-[0.5em] text-slate-300 font-light">
            {NAME.split('').map((ch, i) => (
              <span
                key={i}
                className="sd-char inline-block"
                style={{ opacity: 0, whiteSpace: 'pre' }}
              >
                {ch}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* ── BOTTOM HALF: status + counter ───────────────────────── */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 will-change-transform"
        style={{
          backgroundColor: BG,
          backgroundImage: `radial-gradient(70% 90% at 50% 0%, rgba(168,85,247,0.16), transparent 70%), ${DOTS}`,
          backgroundSize: 'auto, 28px 28px',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 sm:pt-10 gap-3">
          <div className="flex items-center gap-1.5 h-5 text-xs sm:text-sm font-mono text-blue-300/90">
            <ChevronRight className="w-4 h-4 text-purple-400" />
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {STATUS[statusIdx].text}
              </motion.span>
            </AnimatePresence>
            <motion.span
              aria-hidden="true"
              className="inline-block w-1.75 h-3.5 bg-blue-400 ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          <div className="font-mono text-4xl sm:text-5xl font-bold tabular-nums bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
            <span ref={counterRef}>000</span>
            <span className="text-lg sm:text-xl ml-1 text-slate-500">%</span>
          </div>
        </div>

        <span
          className="sd-corner absolute bottom-5 left-5 sm:bottom-7 sm:left-8 text-[10px] sm:text-xs font-mono tracking-widest text-slate-500 uppercase"
          style={{ opacity: 0 }}
        >
          {ROLE}
        </span>
        <span
          className="sd-corner absolute bottom-5 right-5 sm:bottom-7 sm:right-8 text-[10px] sm:text-xs font-mono tracking-widest text-slate-600"
          style={{ opacity: 0 }}
        >
          click to skip
        </span>
      </div>

      {/* ── HORIZON LINE (progress bar on the seam) ─────────────── */}
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute left-0 w-full pointer-events-none"
        style={{
          top: '50%',
          height: '2px',
          marginTop: '-1px',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
          background:
            'linear-gradient(90deg, transparent 0%, #3b82f6 25%, #a855f7 50%, #ec4899 75%, transparent 100%)',
          boxShadow: '0 0 14px rgba(139,92,246,0.9), 0 0 40px rgba(59,130,246,0.5)',
        }}
      />
    </div>
  );
}