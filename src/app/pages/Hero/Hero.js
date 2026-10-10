"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, Download, Mail, Rocket, Trophy } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";

import SparklesText from "../../../components/animation/sparkles-text";
import { FlipWords } from "../../../components/animation/flip-words";
import FloatingElement from "@/components/animation/FloatingElement";
import FadeInUp from "@/components/animation/FadeInUp";
import RevealText from "@/components/animation/RevealText";
import { profile, socials } from "@/data/portfolio";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  codolio: Trophy,
  mail: Mail,
};

const codeSnippet = `const soham = {
  role: 'Full-Stack & AI Developer',
  education: 'B.Tech CSE @ RCOEM (2027)',
  languages: ['Java', 'Python', 'JavaScript'],
  stack: [
    'FastAPI', 'Next.js', 'React',
    'PostgreSQL', 'Redis', 'Docker', 'AWS'
  ],
  achievements: [
    'HackByte 2026 Runner-Up',
    '300+ DSA problems solved'
  ],
  openToCollab: () => true
};`;

export default function Hero() {
  const codeRef = useRef(null);

  useEffect(() => {
    if (!codeRef.current) return;
    const lines = codeRef.current.querySelectorAll(".code-line");
    const tween = gsap.fromTo(
      lines,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.5 }
    );
    return () => tween.kill();
  }, []);

  return (
    <section
      id="home"
      className="bg-transparent text-white min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-10 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 w-full gap-12">
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center relative lg:pr-10">
          <FadeInUp delay={0}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium">
                Welcome to my universe
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1} className="relative mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <SparklesText text="Hello" />
              <span className="block mt-2">
                I&apos;m{" "}
                <span className="inline-block whitespace-nowrap bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                  <RevealText>{profile.name}</RevealText>
                </span>
              </span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 min-w-[250px] sm:min-w-[340px] rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm w-fit">
              <FlipWords className="text-lg sm:text-xl text-blue-400 font-medium" words={profile.roles} />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3} className="mb-8 max-w-xl">
            <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">{profile.tagline}</p>
          </FadeInUp>

          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-900/30 hover:scale-105 transition-transform"
            >
              <Rocket className="w-4 h-4" /> View Projects
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-200 font-medium hover:text-white hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </FadeInUp>

          <FadeInUp delay={0.5} className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.id];
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.id === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid place-items-center w-11 h-11 rounded-full border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:border-blue-500/60 hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </FadeInUp>
        </div>

        {/* Right column: code window */}
        <FloatingElement
          className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
          duration={5}
        >
          <div className="rounded-xl border border-gray-800 shadow-2xl shadow-blue-900/20 overflow-hidden backdrop-blur-md bg-[#091121]/90 w-full max-w-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1b33] border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">soham.js</span>
            </div>
            <div className="p-4 overflow-x-auto" ref={codeRef}>
              <pre className="text-xs sm:text-sm font-mono leading-relaxed text-gray-300">
                {codeSnippet.split("\n").map((line, idx) => (
                  <div key={idx} className="code-line">
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </FloatingElement>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}