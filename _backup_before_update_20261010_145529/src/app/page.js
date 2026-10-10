import Hero from "@/app/pages/Hero/Hero";
import AboutMe from "@/app/pages/aboutme/aboutme";
import SkillsPage from "@/app/pages/skills/page";
import ExperiencePage from "@/app/pages/experience/experience";
import ProjectsPage from "@/app/pages/projects/projects";
import ContactPage from "@/app/pages/contact/contact";
import EducationLoader from "@/components/loaders/EducationLoader";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="about" className="scroll-mt-24">
        <AboutMe />
      </div>

      <div id="skills-wrapper" className="scroll-mt-24">
        <SkillsPage />
      </div>

      <div id="experience" className="scroll-mt-24">
        <ExperiencePage />
      </div>

      <section id="education" className="scroll-mt-24 min-h-screen">
        <EducationLoader />
      </section>

      <div id="projects" className="scroll-mt-24">
        <ProjectsPage />
      </div>

      <div id="contact" className="scroll-mt-24">
        <ContactPage />
      </div>
    </>
  );
}