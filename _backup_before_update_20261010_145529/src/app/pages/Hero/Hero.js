"use client";

import React, { useEffect, useRef } from "react";
import SparklesText from "../../../components/animation/sparkles-text";
import { FlipWords } from "../../../components/animation/flip-words";
import FloatingElement from "@/components/animation/FloatingElement";
import FadeInUp from "@/components/animation/FadeInUp";
import RevealText from "@/components/animation/RevealText";
import gsap from "gsap";

export default function Hero() {
  const codeRef = useRef(null);
  
  const words = [
    "Full-Stack Developer & UI/UX Enthusiast",
    "JavaScript Developer",
    "Learning MARN Stack",
    "Linux & GitHub for DevOps Enthusiast",
  ];

  const codeSnippet = `const profile = {
    name: 'Soham Darak',
    title: 'Full-Stack Developer',
    skills: [
        'React', 'NextJS', 'JavaScript', 'Express',
        'MySQL', 'MongoDB', 'Docker', 'Git'
    ],
    hardWorker: true,
    quickLearner: true,
    hireable: function() {
        return (
            this.hardWorker &&
            this.skills.length >= 5
        );
    }
};`;

  useEffect(() => {
    // Animate code snippet with line-by-line reveal
    if (codeRef.current) {
      const lines = codeRef.current.querySelectorAll('.code-line');
      gsap.fromTo(
        lines,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <section
      id="home"
      className="bg-transparent text-white min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-0 overflow-hidden"
    >

      {/* Main content container */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 w-full h-full">

        {/* Left column - Text content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center relative pointer-events-none lg:pr-10">
          {/* Welcome badge */}
          <FadeInUp delay={0} className="pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 w-fit">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-gray-300 text-xs sm:text-sm font-medium">
                Welcome to my universe
              </span>
            </div>
          </FadeInUp>

          {/* Name section */}
          <FadeInUp delay={0.1} className="relative mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <SparklesText text="Hello" />
              <span className="relative inline-block mt-2">
                I&apos;m
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 ml-6">
                  <RevealText>Soham Darak</RevealText>
                </span>
              </span>
            </h1>
          </FadeInUp>

          {/* Role badge */}
          <FadeInUp delay={0.2} className="pointer-events-auto">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-sm w-fit">
              <span>
                <FlipWords
                  className={"text-lg sm:text-xl text-blue-400 font-medium"}
                  words={words}
                />
              </span>
            </div>
          </FadeInUp>

          {/* Description */}
          <FadeInUp delay={0.3} className="relative mb-8 max-w-xl">
            <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
             Java & JavaScript lover 🚀 | Crafting frameworks and coding the future 💻✨
            </p>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pointer-events-auto">
            <a
              href="https://github.com/soham-darak"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-teal-500 text-white font-medium hover:scale-105 transition-transform"
            >
              Learn More
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-medium hover:text-white hover:bg-gray-700 transition-colors"
            >
              Get Resume
            </a>
          </FadeInUp>
        </div>

        {/* Right column - Code window */}
        <FloatingElement className="w-full lg:w-1/2 mt-12 lg:mt-0 relative pointer-events-auto flex justify-center lg:justify-end" duration={5}>
          <div className="bg-[#091121] rounded-lg border border-gray-800 shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-80 w-full max-w-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1b33] border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-400">developer.js</span>
            </div>
            <div className="p-4 overflow-x-auto" ref={codeRef}>
              <pre className="text-sm sm:text-base font-mono leading-relaxed text-gray-300">
                {codeSnippet.split('\n').map((line, idx) => (
                  <div key={idx} className="code-line">
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </FloatingElement>

      </div>
    </section>
  );
}
