"use client";
import React from "react";
import ProfileCard from "@/components/sections/ProfileCard/ProfileCard";
import TextType from "@/components/sections/TextType";
import FadeInUp from "@/components/animation/FadeInUp";
import FloatingElement from "@/components/animation/FloatingElement";

export default function AboutMe() {
    return (
        <div className="mt-10 sm:mt-15 mx-4 sm:mx-auto w-full max-w-[1600px] relative px-4 sm:px-8">
            <section
                className="w-full rounded-2xl bg-gray-900/80 border border-gray-700 p-4 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group backdrop-blur-sm"
                id="about"
            >
                {/* Shimmer effect matching the skill cards */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.05)] to-transparent group-hover:via-[rgba(100,100,255,0.15)] animate-shimmer pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-10 pt-0 px-4 sm:px-8 relative z-10">
                    {/* Right Column (Desktop): Text Content */}
                    <FadeInUp delay={0} className="basis-full lg:basis-7/12 pl-0 lg:pl-8 border-b lg:border-b-0 lg:border-l border-gray-700/50 pb-8 lg:pb-0">
                        <div className="flex-1 text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
                                About Me
                            </h2>
                            <TextType
                                text="Hi, I'm Soham! I'm a full-stack developer who loves crafting modern, snappy web applications that are genuinely pleasant to use. I'm always exploring new technologies—right now I'm super interested in integrating Artificial Intelligence and cloud solutions into everyday digital products. With over 10 projects under my belt and an eye for both design and functionality, my goal is to build software that not only looks great, but solves real problems and helps businesses grow."
                                as="p"
                                startOnVisible={true}
                                loop={false}
                                hideCursorWhileTyping={false}
                                pauseDuration={100000} // Failsafe to guarantee text never deletes
                                typingSpeed={18}
                                className="text-lg sm:text-xl lg:text-[22px] font-normal leading-[1.8] sm:leading-[1.8] mb-6 sm:mb-8 text-gray-200 tracking-wide text-justify sm:text-left"
                                cursorClassName="text-blue-500 font-bold"
                            />

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start text-left gap-y-6 sm:gap-x-16 mb-4 w-full">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl mb-1 text-white font-bold">
                                        10<span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">+</span>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-300">Projects Finished</p>
                                </div>
                                <div className="max-w-[280px]">
                                    <h3 className="text-2xl sm:text-3xl md:text-3xl mb-1 font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                                        Student
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-snug">
                                        Shri Ramdeobaba College of Engineering and Management, Nagpur
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeInUp>

                    {/* Left Column (Desktop): ProfileCard */}
                    <FloatingElement duration={5} className="basis-full lg:basis-5/12 flex justify-center items-center py-4 lg:py-0">
                        <ProfileCard
                            avatarUrl="/soham.png"
                            name="Soham Darak"
                            title="Software Engineer"
                            handle="sohamdarak"
                            status="Online"
                            contactText="Contact Me"
                        />
                    </FloatingElement>
                </div>
            </section>
        </div>
    );
}