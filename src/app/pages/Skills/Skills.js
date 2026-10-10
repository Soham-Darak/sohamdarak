"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, Layout, Server, Database, Cloud, GitBranch, Brain, ShieldCheck, Webhook, Workflow, Boxes, Network, Cpu } from "lucide-react";
import { FaJava, FaPython, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaLinux, FaGithub } from "react-icons/fa";
import { SiJavascript, SiC, SiNextdotjs, SiTailwindcss, SiStreamlit, SiFastapi, SiJsonwebtokens, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiJenkins, SiGithubactions } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LogoLoop from "@/components/animation/LogoLoop";
import ElectricBorder from "@/components/ui/ElectricBorder";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, loopLogoKeys } from "@/data/portfolio";

const ICONS = {
  java: [FaJava, "text-[#f89820]"], python: [FaPython, "text-[#3776AB]"], javascript: [SiJavascript, "text-[#F7DF1E]"], c: [SiC, "text-[#A8B9CC]"], sql: [Database, "text-sky-300"], react: [FaReact, "text-[#61DAFB]"], nextjs: [SiNextdotjs, "text-white"], html5: [FaHtml5, "text-[#E34F26]"], css3: [FaCss3Alt, "text-[#1572B6]"], tailwind: [SiTailwindcss, "text-[#38B2AC]"], streamlit: [SiStreamlit, "text-[#FF4B4B]"], fastapi: [SiFastapi, "text-[#009688]"], nodejs: [FaNodeJs, "text-[#339933]"], jwt: [SiJsonwebtokens, "text-[#d63aff]"], oauth: [ShieldCheck, "text-emerald-400"], postgresql: [SiPostgresql, "text-[#4a90c2]"], mysql: [SiMysql, "text-[#4479A1]"], mongodb: [SiMongodb, "text-[#47A248]"], rest: [Webhook, "text-orange-400"], github: [FaGithub, "text-white"], rbac: [ShieldCheck, "text-amber-400"], aws: [FaAws, "text-[#FF9900]"], docker: [FaDocker, "text-[#2496ED]"], redis: [SiRedis, "text-[#DC382D]"], jenkins: [SiJenkins, "text-[#D24939]"], githubactions: [SiGithubactions, "text-[#2088FF]"], cicd: [Workflow, "text-violet-400"], git: [FaGitAlt, "text-[#F05032]"], linux: [FaLinux, "text-[#FCC624]"], oop: [Boxes, "text-pink-400"], dsa: [Network, "text-fuchsia-400"], dbms: [Database, "text-yellow-300"], os: [Cpu, "text-slate-300"], ml: [Brain, "text-pink-300"],
};

const CATEGORY_ICONS = { code: Code2, layout: Layout, server: Server, database: Database, cloud: Cloud, gitbranch: GitBranch, brain: Brain };

const SkillIcon = ({ name, className = "w-4 h-4" }) => {
  const entry = ICONS[name];
  if (!entry) return null;
  const [Icon, color] = entry;
  return <Icon className={`${className} ${color}`} aria-hidden="true" />;
};

const SkillCard = ({ category, index }) => {
  const Icon = CATEGORY_ICONS[category.icon] ?? Code2;
  return <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: "easeOut" }} className="h-full">
    <Card className="group relative overflow-hidden bg-gray-900/70 border-gray-700/70 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 h-full">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.06)] to-transparent group-hover:via-[rgba(100,100,255,0.14)] animate-shimmer pointer-events-none" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-5"><div className={`p-3 rounded-xl bg-gray-800/60 ring-1 ring-white/5 ${category.color} group-hover:scale-110 transition-transform duration-300`}><Icon className="w-7 h-7" /></div><h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 leading-tight">{category.title}</h3></div>
        <div className="flex flex-wrap gap-2">{category.skills.map((skill) => <Badge key={skill.name} variant="outline" className="group/badge bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-1.5 px-3 transition-all duration-300 hover:scale-105 hover:border-blue-400/50"><SkillIcon name={skill.icon} /><span className="font-medium">{skill.name}</span></Badge>)}</div>
      </CardContent>
    </Card>
  </motion.div>;
};

const SkillsSection = () => {
  const loopLogos = loopLogoKeys.map((key) => ({ node: <SkillIcon name={key} className="h-7 w-7" />, ariaLabel: key }));
  return <section id="skills" className="scroll-mt-24 text-white bg-transparent relative py-20">
    <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <SectionHeading eyebrow="Tech Stack" title="Skills & Technologies" subtitle="The languages, frameworks and tools I use to design, build and ship full-stack and AI-powered products." />
      <div className="mb-14"><LogoLoop logos={loopLogos} speed={90} gap={24} logoHeight={28} fadeOut fadeOutColor="transparent" className="py-2" renderItem={(item, key) => <div key={key} className="p-2"><ElectricBorder color="#38BDF8" borderRadius={999} speed={1.0} chaos={0.08} className="rounded-full"><div className="rounded-full bg-[#050b1a]/80 border border-white/10 backdrop-blur-xl p-3">{item.node}</div></ElectricBorder></div>} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">{skillCategories.map((category, index) => <SkillCard key={category.title} category={category} index={index} />)}</div>
    </div>
  </section>;
};

export default SkillsSection;
