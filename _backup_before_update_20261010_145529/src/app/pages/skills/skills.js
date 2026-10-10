
"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LogoLoop from "@/components/animation/LogoLoop";
import ElectricBorder from "@/components/ui/ElectricBorder";
import FadeInUp from "@/components/animation/FadeInUp";
import StaggerChildren from "@/components/animation/StaggerChildren";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaFigma,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";

const SkillCard = ({ icon: Icon, title, skills, color, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
        rotateY: -10,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.7,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  return (
    <div ref={cardRef} className="h-full">
      <Card className="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
              {title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="font-medium">{skill.name}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillsSection = () => {
  const loopLogos = [
    { node: <FaReact className="h-7 w-7 text-[#61DAFB]" />, ariaLabel: "React" },
    { node: <SiNextdotjs className="h-7 w-7 text-white" />, ariaLabel: "Next.js" },
    { node: <SiTailwindcss className="h-7 w-7 text-[#38B2AC]" />, ariaLabel: "Tailwind CSS" },
    { node: <FaNodeJs className="h-7 w-7 text-[#339933]" />, ariaLabel: "Node.js" },
    { node: <SiMongodb className="h-7 w-7 text-[#47A248]" />, ariaLabel: "MongoDB" },
    { node: <SiPostgresql className="h-7 w-7 text-[#336791]" />, ariaLabel: "PostgreSQL" },
    { node: <FaDocker className="h-7 w-7 text-[#2496ED]" />, ariaLabel: "Docker" },
    { node: <FaGitAlt className="h-7 w-7 text-[#F05032]" />, ariaLabel: "Git" },
    { node: <SiVercel className="h-7 w-7 text-white" />, ariaLabel: "Vercel" },
    { node: <SiVite className="h-7 w-7 text-[#646CFF]" />, ariaLabel: "Vite" },
    { node: <SiRedux className="h-7 w-7 text-[#764ABC]" />, ariaLabel: "Redux" },
    { node: <TbBrandVscode className="h-7 w-7 text-[#007ACC]" />, ariaLabel: "VS Code" },
    { node: <SiTypescript className="h-7 w-7 text-[#3178C6]" />, ariaLabel: "TypeScript" },
    { node: <SiGraphql className="h-7 w-7 text-[#E10098]" />, ariaLabel: "GraphQL" },
    { node: <SiJest className="h-7 w-7 text-[#C21325]" />, ariaLabel: "Jest" },
    { node: <SiWebpack className="h-7 w-7 text-[#8DD6F9]" />, ariaLabel: "Webpack" },
    { node: <SiFirebase className="h-7 w-7 text-[#FFCA28]" />, ariaLabel: "Firebase" },
    { node: <FaPython className="h-7 w-7 text-[#3776AB]" />, ariaLabel: "Python" },
    { node: <FaLinux className="h-7 w-7 text-[#FCC624]" />, ariaLabel: "Linux" },
    { node: <FaFigma className="h-7 w-7 text-[#F24E1E]" />, ariaLabel: "Figma" },
    { node: <FaAws className="h-7 w-7 text-[#FF9900]" />, ariaLabel: "AWS" },
  ];

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        { name: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="w-4 h-4 text-white" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "HTML5",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-[#E34F26]" />,
        },
        {
          name: "CSS3",
          icon: <BsFileEarmarkCode className="w-4 h-4 text-[#1572B6]" />,
        },
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-green-400",
      skills: [
        {
          name: "Node.js",
          icon: <FaNodeJs className="w-4 h-4 text-[#339933]" />,
        },
        {
          name: "Python",
          icon: <FaPython className="w-4 h-4 text-[#3776AB]" />,
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="w-4 h-4 text-[#336791]" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="w-4 h-4 text-[#47A248]" />,
        },
        {
          name: "REST APIs",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "GraphQL",
          icon: <SiGraphql className="w-4 h-4 text-[#E10098]" />,
        },
      ],
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      color: "text-purple-400",
      skills: [
        { name: "Figma", icon: <FaFigma className="w-4 h-4 text-[#F24E1E]" /> },
        {
          name: "Responsive Design",
          icon: <Layout className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "Wireframing",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#9CA3AF]" />,
        },
        {
          name: "Prototyping",
          icon: <MdAnimation className="w-4 h-4 text-[#F59E0B]" />,
        },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "text-orange-400",
      skills: [
        { name: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
        {
          name: "Docker",
          icon: <FaDocker className="w-4 h-4 text-[#2496ED]" />,
        },
        { name: "CI/CD", icon: <FcWorkflow className="w-4 h-4" /> },
        {
          name: "Kubernetes",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#326CE5]" />,
        },
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "Linux", icon: <FaLinux className="w-4 h-4 text-[#FCC624]" /> },
      ],
    },
    {
      icon: Cpu,
      title: "Tools & Technologies",
      color: "text-pink-400",
      skills: [
        {
          name: "VS Code",
          icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
        },
        { name: "Jest", icon: <SiJest className="w-4 h-4 text-[#C21325]" /> },
        {
          name: "Webpack",
          icon: <SiWebpack className="w-4 h-4 text-[#8DD6F9]" />,
        },
        { name: "Redux", icon: <SiRedux className="w-4 h-4 text-[#764ABC]" /> },
        {
          name: "Firebase",
          icon: <SiFirebase className="w-4 h-4 text-[#FFCA28]" />,
        },
        { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
        { name: "Vite", icon: <SiVite className="w-4 h-4 text-[#646CFF]" /> },
      ],
    },
    {
      icon: Paintbrush,
      title: "Creative Skills",
      color: "text-yellow-400",
      skills: [
        {
          name: "UI Animation",
          icon: <MdAnimation className="w-4 h-4 text-[#FF4081]" />,
        },
        {
          name: "SVG Animation",
          icon: <MdAnimation className="w-4 h-4 text-[#00C853]" />,
        },
        {
          name: "3D Modeling",
          icon: <Cpu className="w-4 h-4 text-[#7C4DFF]" />,
        },
        {
          name: "Motion Graphics",
          icon: <MdAnimation className="w-4 h-4 text-[#FF6D00]" />,
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="pt-15 lg:pt-0 text-white min-h-screen bg-transparent relative"
    >
      {/* Subtle grid overlay on galaxy */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-11 relative z-10">
        <FadeInUp delay={0} className="flex justify-center items-center mb-12">
          <div className="w-full">
            <LogoLoop
              logos={loopLogos}
              speed={90}
              gap={24}
              logoHeight={28}
              fadeOut
              fadeOutColor="transparent"
              className="py-2"
              renderItem={(item, key) => (
                <div key={key} className="p-2">
                  <ElectricBorder
                    color="#38BDF8"
                    borderRadius={999}
                    speed={1.0}
                    chaos={0.08}
                    className="rounded-full"
                  >
                    <div className="rounded-full bg-[#050b1a]/80 border border-white/10 backdrop-blur-xl p-3">
                      {item.node}
                    </div>
                  </ElectricBorder>
                </div>
              )}
            />
          </div>
        </FadeInUp>
        <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
              index={index}
            />
          ))}
        </StaggerChildren>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
