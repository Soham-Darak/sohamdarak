"use client";

import React from "react";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";

import ProfileCard from "@/components/sections/ProfileCard/ProfileCard";
import TextType from "@/components/sections/TextType";
import FadeInUp from "@/components/animation/FadeInUp";
import FloatingElement from "@/components/animation/FloatingElement";
import { education, profile, stats } from "@/data/portfolio";

export default function AboutMe() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] relative px-4 sm:px-8 py-10">
      <section
        id="about"
        className="scroll-mt-24 w-full rounded-2xl bg-gray-900/70 border border-gray-700/70 p-4 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.05)] to-transparent group-hover:via-[rgba(100,100,255,0.12)] animate-shimmer pointer-events-none" />

        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12 relative z-10">
          {/* Text */}
          <FadeInUp
            delay={0}
            className="basis-full lg:basis-7/12 pl-0 lg:pl-10 border-b lg:border-b-0 lg:border-l border-gray-700/50 pb-8 lg:pb-0"
          >
            <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Turning ideas into{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                working products
              </span>
            </h2>

            <TextType
              text={profile.bio}
              as="p"
              startOnVisible={true}
              loop={false}
              hideCursorWhileTyping={false}
              pauseDuration={100000}
              typingSpeed={14}
              className="text-base sm:text-lg lg:text-xl font-normal leading-[1.8] mb-7 text-gray-200 text-left"
              cursorClassName="text-blue-500 font-bold"
            />

            <div className="flex flex-col sm:flex-row gap-3 mb-7 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                {education.degree.replace("B.Tech in ", "B.Tech ")}, RCOEM
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700">
                <MapPin className="w-4 h-4 text-purple-400" />
                {profile.location}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {s.value}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                      {s.suffix}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeInUp>

          {/* Profile card */}
          <FloatingElement duration={5} className="basis-full lg:basis-5/12 flex justify-center items-center py-4 lg:py-0">
            <ProfileCard
              avatarUrl="/soham.png"
              name={profile.name}
              title={profile.title}
              handle={profile.handle}
              status="Building"
              contactText="Contact Me"
              onContactClick={scrollToContact}
            />
          </FloatingElement>
        </div>
      </section>
    </div>
  );
}