"use client";

import React, { useMemo, useState, useEffect } from "react";
import { FaBars, FaCode, FaHome, FaBriefcase, FaGraduationCap, FaLaptopCode, FaEnvelope } from "react-icons/fa";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { id: "home", icon: FaHome, text: "Hero" },
      { id: "skills", icon: FaCode, text: "Skills" },
      { id: "experience", icon: FaBriefcase, text: "Experience" },
      { id: "education", icon: FaGraduationCap, text: "Education" },
      { id: "projects", icon: FaLaptopCode, text: "Projects" },
      { id: "contact", icon: FaEnvelope, text: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none">
      <div className="md:fixed md:top-5 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto px-2 sm:px-4 pointer-events-auto">
        <div className="md:rounded-full bg-gray-900/80 border border-gray-700 backdrop-blur-md shadow-xl mt-4 md:mt-0 relative overflow-hidden group">

          {/* Shimmer effect matching the skill cards and about me page */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.05)] to-transparent group-hover:via-[rgba(100,100,255,0.15)] animate-shimmer pointer-events-none rounded-full"></div>

          <nav className="px-4 md:px-6 py-2.5 relative z-10 w-full">
            <div className="flex justify-between items-center md:hidden px-2">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="text-white font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] cursor-pointer"
              >
                Soham Darak
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="text-white/90 p-2 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
            </div>

            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {navLinks.map(({ id, icon: Icon, text }) => (
                  <button
                    key={id}
                    onClick={(e) => scrollToSection(e, id)}
                    className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2 cursor-pointer outline-none border-none bg-transparent
                      hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]
                      ${activeSection === id
                        ? "bg-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        : "text-gray-300"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base transition-transform duration-300 ${activeSection === id ? "scale-110 text-blue-400" : ""
                        }`}
                    />
                    <span className="inline tracking-wide">{text}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </header>
  );
}
