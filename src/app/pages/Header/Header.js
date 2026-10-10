"use client";

import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHome,
  FaLaptopCode,
  FaTimes,
  FaUser,
} from "react-icons/fa";

// Order MUST match the order of sections on the page
const NAV_LINKS = [
  { id: "home", icon: FaHome, text: "Home" },
  { id: "about", icon: FaUser, text: "About" },
  { id: "skills", icon: FaCode, text: "Skills" },
  { id: "projects", icon: FaLaptopCode, text: "Projects" },
  { id: "experience", icon: FaBriefcase, text: "Journey" },
  { id: "education", icon: FaGraduationCap, text: "Education" },
  { id: "contact", icon: FaEnvelope, text: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Highlight the section currently in the middle of the screen
  useEffect(() => {
    const elements = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none">
      <div className="md:fixed md:top-5 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto px-2 sm:px-4 pointer-events-auto">
        <div className="md:rounded-full bg-gray-900/80 border border-gray-700 backdrop-blur-md shadow-xl mt-4 md:mt-0 relative overflow-hidden group rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.05)] to-transparent group-hover:via-[rgba(100,100,255,0.15)] animate-shimmer pointer-events-none" />

          <nav className="px-4 md:px-4 py-2.5 relative z-10 w-full" aria-label="Main navigation">
            {/* Mobile bar */}
            <div className="flex justify-between items-center md:hidden px-2">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="text-white font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              >
                Soham Darak
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="text-white/90 p-2 hover:text-white transition-colors cursor-pointer"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-1 py-3 md:py-0">
                {NAV_LINKS.map(({ id, icon: Icon, text }) => {
                  const active = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => scrollToSection(e, id)}
                      aria-current={active ? "true" : undefined}
                      className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer
                        hover:bg-white/10 hover:text-white
                        ${active ? "bg-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "text-gray-300"}`}
                    >
                      <Icon className={`text-sm transition-transform duration-300 md:hidden xl:inline ${active ? "scale-110 text-blue-400" : ""}`} />
                      <span className="tracking-wide">{text}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}