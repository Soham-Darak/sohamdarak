import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp, Mail } from "lucide-react";

import Hero from "@/app/pages/Hero/Hero";
import AboutMe from "@/app/pages/aboutme/aboutme";
import SkillsPage from "@/app/pages/Skills/Skills";
import ProjectsPage from "@/app/pages/projects/projects";
import ExperiencePage from "@/app/pages/experience/experience";
import EducationPage from "@/app/pages/education/education";
import ContactPage from "@/app/pages/contact/contact";
import ScrollProgress from "@/components/utilities/ScrollProgress";
import { profile, socials } from "@/data/portfolio";

const github = socials.find((s) => s.id === "github")?.href;
const linkedin = socials.find((s) => s.id === "linkedin")?.href;

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <AboutMe />
      <SkillsPage />
      <ProjectsPage />
      <ExperiencePage />
      <EducationPage />
      <ContactPage />

      <footer className="border-t border-slate-800/80 bg-[#020617]/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS &amp; GSAP.
          </p>
          <div className="flex items-center gap-4">
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors"><FaGithub className="w-5 h-5" /></a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><FaLinkedin className="w-5 h-5" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            <a href="#home" className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-700 hover:border-blue-500/50 hover:text-white transition-colors">
              Top <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}