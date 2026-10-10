# apply_portfolio_update.ps1
# Run from the PROJECT ROOT (the folder containing package.json):
#   PS C:\Users\soham\OneDrive\Desktop\Codes\Portfolio\sohamdarak-portfolio> .\apply_portfolio_update.ps1
$ErrorActionPreference = "Stop"

if (-not (Test-Path ".\package.json") -or -not (Test-Path ".\src\app")) {
  Write-Host "Run this from the project root (the folder with package.json and src\app)." -ForegroundColor Red
  exit 1
}

$utf8 = New-Object System.Text.UTF8Encoding $false
$backup = ".\_backup_before_update_" + (Get-Date -Format "yyyyMMdd_HHmmss")

function Write-ProjectFile([string]$rel, [string]$content) {
  if (Test-Path $rel) {
    $dest = Join-Path $backup $rel
    New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
    Copy-Item $rel $dest -Force
  }
  $dir = Split-Path $rel -Parent
  if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  [System.IO.File]::WriteAllText((Join-Path $PWD $rel), $content, $utf8)
  Write-Host "  wrote $rel" -ForegroundColor Green
}

Write-ProjectFile 'src/data/portfolio.js' @'
// ─────────────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH for the whole portfolio.
//  Edit text, links, skills and projects HERE — every section reads from this file.
//  (Content below is taken from the resume + GitHub READMEs.)
// ─────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Soham Darak",
  handle: "Soham-Darak",
  siteUrl: "https://sohamdarak-portfolio.vercel.app",
  title: "Full-Stack & AI Developer",
  location: "Nagpur, Maharashtra, India",
  email: "daraksoham@gmail.com",
  resume: "/Soham_Darak_Resume.pdf",
  tagline:
    "B.Tech CSE '27 at RCOEM. I build AI-powered full-stack products, from multi-agent code review to ML-driven railway analytics.",
  roles: [
    "Full-Stack Developer",
    "AI & ML Enthusiast",
    "HackByte 2026 Runner-Up",
    "DevOps & Cloud Learner",
  ],
  bio: "Hi, I'm Soham! I'm a Computer Science undergraduate who loves turning messy real-world problems into fast, clean products. I build with FastAPI and Node.js on the back end, React and Next.js on the front end, and ship with Docker and CI/CD. Recent work includes a multi-agent AI code-review platform and an ML-powered railway delay-prediction system. I'm a HackByte 2026 runner-up with 300+ DSA problems solved, and I'm always up for a new challenge.",
};

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/Soham-Darak" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/soham-darak" },
  { id: "codolio", label: "Codolio", href: "https://codolio.com/profile/SohamDarak" },
  { id: "mail", label: "Email", href: `mailto:${profile.email}` },
];

export const stats = [
  { value: 300, suffix: "+", label: "DSA problems solved" },
  { value: 3, suffix: "", label: "Hackathons" },
  { value: 5, suffix: "", label: "Featured projects" },
  { value: 4, suffix: "", label: "Certifications" },
];

// ── Skills (matches the resume exactly) ──────────────────────────────
// `icon` keys are mapped to real icons in src/app/pages/skills/skills.js
export const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    color: "text-blue-400",
    skills: [
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "C", icon: "c" },
      { name: "SQL", icon: "sql" },
      { name: "PL/SQL", icon: "sql" },
    ],
  },
  {
    title: "Frontend Development",
    icon: "layout",
    color: "text-cyan-400",
    skills: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Streamlit", icon: "streamlit" },
    ],
  },
  {
    title: "Backend Development",
    icon: "server",
    color: "text-green-400",
    skills: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "JWT Authentication", icon: "jwt" },
      { name: "OAuth 2.0 (Google/GitHub)", icon: "oauth" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    color: "text-yellow-400",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "Oracle SQL", icon: "sql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "APIs, System Design & Cloud",
    icon: "cloud",
    color: "text-orange-400",
    skills: [
      { name: "REST APIs", icon: "rest" },
      { name: "GitHub API", icon: "github" },
      { name: "Role-Based Access Control", icon: "rbac" },
      { name: "AWS (EC2, ECR, ALB)", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "gitbranch",
    color: "text-purple-400",
    skills: [
      { name: "Jenkins", icon: "jenkins" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    title: "CS Fundamentals & ML",
    icon: "brain",
    color: "text-pink-400",
    skills: [
      { name: "OOP", icon: "oop" },
      { name: "Data Structures & Algorithms", icon: "dsa" },
      { name: "DBMS", icon: "dbms" },
      { name: "Operating Systems", icon: "os" },
      { name: "Machine Learning", icon: "ml" },
    ],
  },
];

// Icons shown in the scrolling logo strip (keys from the map above)
export const loopLogoKeys = [
  "java", "python", "javascript", "react", "nextjs", "tailwind", "fastapi",
  "nodejs", "postgresql", "mysql", "mongodb", "redis", "docker", "aws",
  "jenkins", "githubactions", "git", "linux",
];

// ── Projects ─────────────────────────────────────────────────────────
// Add screenshots later: put an image in /public/projects/ and set image: "/projects/name.png"
export const projectFilters = ["All", "AI / ML", "Full-Stack", "Hackathon"];

export const projects = [
  {
    title: "CodeGrowth AI",
    subtitle: "AI-Powered Code Review & Developer Intelligence Platform",
    date: "Sep 2026",
    featured: true,
    categories: ["AI / ML", "Full-Stack"],
    icon: "brain",
    accent: "from-blue-500 to-purple-500",
    summary:
      "A full-stack academic platform where teachers create courses and assignments, students connect GitHub repositories, and a multi-agent AI engine evaluates every submission across six dimensions: correctness, quality, complexity, security, testing and documentation.",
    highlights: [
      "Specialized AI agents (repository, code analysis, evaluation) coordinated by an orchestrator that picks the right agent per request.",
      "Hybrid analysis: rule-based checks plus LLM reasoning flag hardcoded credentials and unsafe SQL, with file-level fix suggestions.",
      "Commit-level authenticity scoring to spot AI-generated or plagiarized code, plus growth tracking across assignments.",
      "Local LLM inference via Ollama, so student code never leaves the platform.",
    ],
    tech: ["Python", "FastAPI", "Next.js", "Spring Boot", "PostgreSQL", "Redis", "LLMs", "GitHub API", "Docker"],
    github: "https://github.com/Soham-Darak/codegrowth-ai",
    live: "",
  },
  {
    title: "OPTI-PRAVAH",
    subtitle: "Railway Intelligence & Auto-Rerouting Dashboard",
    date: "Apr 2026",
    categories: ["AI / ML", "Full-Stack"],
    icon: "train",
    accent: "from-cyan-500 to-blue-500",
    summary:
      "A geospatial railway simulation that predicts delays and automatically reroutes trains across a 12-node Indian rail network, visualized live on a 60-FPS map.",
    highlights: [
      "XGBoost + PyTorch LSTM ensemble predicts block-level delays from weather, speed limits and congestion.",
      "Segmented Dijkstra routing (NetworkX) with track-level collision avoidance and reroute impact analytics.",
      "Scenario stress-tests (Normal day, Monsoon storm, Rush hour) that feed back into the ML constraints.",
    ],
    tech: ["Python", "FastAPI", "XGBoost", "PyTorch", "NetworkX", "Next.js", "MapLibre GL", "Tailwind CSS"],
    github: "https://github.com/Soham-Darak/Opti-Pravah",
    live: "",
  },
  {
    title: "RailQuick",
    subtitle: "AI-Powered Train Delay Prediction System",
    date: "Feb 2026",
    categories: ["AI / ML"],
    icon: "gauge",
    accent: "from-purple-500 to-pink-500",
    summary:
      "An end-to-end ML pipeline for real-time train delay prediction using historical schedules and live weather data.",
    highlights: [
      "Automated preprocessing and feature pipelines that improved model generalization across routes.",
      "Predictions served through Flask REST APIs for scheduling and passenger-information systems.",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "Flask", "NLP", "REST APIs"],
    github: "",
    live: "",
  },
  {
    title: "Agrimed",
    subtitle: "Farmer-Centric Crop Health Monitoring Platform",
    date: "May 2025",
    categories: ["Full-Stack"],
    icon: "sprout",
    accent: "from-green-500 to-emerald-500",
    summary:
      "A responsive crop-disease detection app covering 20+ crops and 100+ disease scenarios with instant diagnosis.",
    highlights: [
      "Google Sheets API used as a serverless backend for authentication and content management.",
      "Mobile-first design built for reliable use in low-bandwidth rural environments.",
    ],
    tech: ["React.js", "Tailwind CSS", "Google Sheets API", "REST APIs"],
    github: "",
    live: "https://agrimed.vercel.app/",
  },
  {
    title: "TRAFFICQ",
    subtitle: "Multi-Agent Traffic System",
    date: "2025",
    categories: ["AI / ML", "Hackathon"],
    icon: "traffic",
    accent: "from-orange-500 to-red-500",
    summary:
      "Built for the Capgemini Deep Dive Hackathon 2025, where it was selected: a multi-agent system for smarter traffic management.",
    highlights: [
      "GPT-4 agents coordinated through FastAPI and Redis.",
      "XGBoost model for traffic prediction.",
    ],
    tech: ["GPT-4", "FastAPI", "Redis", "XGBoost"],
    github: "",
    live: "",
  },
];

// ── Achievements & leadership (timeline) ─────────────────────────────
export const journeyStats = [
  { value: 300, suffix: "+", label: "DSA problems solved" },
  { value: 200, suffix: "+", label: "Teams competed against" },
  { value: 8, suffix: "+", label: "Tech events promoted" },
  { value: 30, suffix: "+", label: "Volunteers coordinated" },
];

export const journey = [
  {
    type: "achievement",
    title: "Runner-Up, HackByte Hackathon 2026",
    org: "IIIT Jabalpur",
    period: "2026",
    description:
      "Finished second among 200+ competing teams with an AI-driven solution.",
    tags: ["AI", "Hackathon", "Teamwork"],
  },
  {
    type: "leadership",
    title: "Public Relations Coordinator",
    org: "Compusys, Cultural Society CSE, RCOEM",
    period: "2025 – 2026",
    description:
      "Spearheaded promotions for 8+ technical events, boosting student participation and inter-department visibility through effective communication and stakeholder coordination.",
    tags: ["Communication", "Event Promotion"],
  },
  {
    type: "leadership",
    title: "Community Outreach Head",
    org: "NSS RCOEM",
    period: "2025 – 2026",
    description:
      "Planned and executed 5+ volunteer campaigns, coordinating 30+ student volunteers across community programs.",
    tags: ["Volunteering", "Community"],
  },
  {
    type: "achievement",
    title: "Participant, YCCE Inter-College Hackathon 2026",
    org: "YCCE",
    period: "2026",
    description: "Competed against teams from across colleges in a time-boxed build.",
    tags: ["Hackathon"],
  },
  {
    type: "achievement",
    title: "Selected, Capgemini Deep Dive Hackathon 2025",
    org: "Capgemini",
    period: "2025",
    description:
      "Built TRAFFICQ, a multi-agent traffic system using GPT-4, FastAPI, Redis and XGBoost.",
    tags: ["GPT-4", "FastAPI", "Redis", "XGBoost"],
  },
];

// ── Education & certifications ───────────────────────────────────────
export const education = {
  school: "Ramdeobaba College of Engineering and Management (RCOEM)",
  location: "Nagpur",
  degree: "B.Tech in Computer Science Engineering",
  honours: "Honours: Web Development",
  period: "2023 – 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Operating Systems",
    "Machine Learning",
    "Web Development",
  ],
};

export const certifications = [
  { title: "Google AI Essentials", issuer: "Google & Coursera" },
  { title: "AWS Academy Machine Learning Foundations", issuer: "AWS Academy" },
  { title: "AI-ML Virtual Internship", issuer: "AWS Academy" },
  { title: "Web Development Virtual Internship", issuer: "EduSkills Academy" },
];
'@

Write-ProjectFile 'src/app/globals.css' @'
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ── Portfolio additions ───────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}

::selection {
  background: rgba(99, 102, 241, 0.45);
  color: #fff;
}

/* Slim dark scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #334155 #020617;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* Global shimmer + grid helpers (used by header, about and skills cards) */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 3s infinite;
}
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, rgba(100, 100, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 100, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Respect users who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-shimmer {
    animation: none;
  }
}
'@

Write-ProjectFile 'src/app/layout.js' @'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./pages/Header/Header";
import GlobalGalaxy from "@/components/utilities/GlobalGalaxy";
import RootLayoutWrapper from "@/components/utilities/RootLayoutWrapper";
import { profile, socials } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Portfolio of Soham Darak, a Computer Science undergraduate and Full-Stack & AI developer. Explore projects like CodeGrowth AI and OPTI-PRAVAH, skills in Python, FastAPI, Next.js, React and Docker, and HackByte 2026 runner-up achievements.";

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "Soham Darak | Full-Stack & AI Developer",
    template: "%s | Soham Darak",
  },
  description,
  keywords: [
    "Soham Darak", "Full-Stack Developer", "AI Developer", "Next.js", "React",
    "FastAPI", "Python", "Portfolio", "RCOEM", "HackByte 2026",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    title: "Soham Darak | Full-Stack & AI Developer",
    description,
    url: profile.siteUrl,
    siteName: "Soham Darak",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Soham Darak | Full-Stack & AI Developer",
    description,
  },
};

export const viewport = {
  themeColor: "#020617",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  alumniOf: "Ramdeobaba College of Engineering and Management",
  sameAs: socials.filter((s) => s.id !== "mail").map((s) => s.href),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlobalGalaxy />
        <RootLayoutWrapper>
          <div className="relative z-10">
            <Header />
            <main className="pt-20 md:pt-24">{children}</main>
          </div>
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
'@

Write-ProjectFile 'src/app/page.js' @'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp, Mail } from "lucide-react";

import Hero from "@/app/pages/Hero/Hero";
import AboutMe from "@/app/pages/aboutme/aboutme";
import SkillsPage from "@/app/pages/skills/skills";
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
'@

Write-ProjectFile 'src/app/pages/Header/Header.js' @'
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
'@

Write-ProjectFile 'src/app/pages/Hero/Hero.js' @'
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
'@

Write-ProjectFile 'src/app/pages/aboutme/aboutme.js' @'
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
'@

Write-ProjectFile 'src/app/pages/skills/skills.js' @'
"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  GitBranch,
  Brain,
  ShieldCheck,
  Webhook,
  Workflow,
  Boxes,
  Network,
  Cpu,
} from "lucide-react";
import {
  FaJava,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaGithub,
} from "react-icons/fa";
import {
  SiJavascript,
  SiC,
  SiNextdotjs,
  SiTailwindcss,
  SiStreamlit,
  SiFastapi,
  SiJsonwebtokens,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiJenkins,
  SiGithubactions,
} from "react-icons/si";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LogoLoop from "@/components/animation/LogoLoop";
import ElectricBorder from "@/components/ui/ElectricBorder";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, loopLogoKeys } from "@/data/portfolio";

// Maps the `icon` keys in src/data/portfolio.js to real icons.
const ICONS = {
  java: [FaJava, "text-[#f89820]"],
  python: [FaPython, "text-[#3776AB]"],
  javascript: [SiJavascript, "text-[#F7DF1E]"],
  c: [SiC, "text-[#A8B9CC]"],
  sql: [Database, "text-sky-300"],
  react: [FaReact, "text-[#61DAFB]"],
  nextjs: [SiNextdotjs, "text-white"],
  html5: [FaHtml5, "text-[#E34F26]"],
  css3: [FaCss3Alt, "text-[#1572B6]"],
  tailwind: [SiTailwindcss, "text-[#38B2AC]"],
  streamlit: [SiStreamlit, "text-[#FF4B4B]"],
  fastapi: [SiFastapi, "text-[#009688]"],
  nodejs: [FaNodeJs, "text-[#339933]"],
  jwt: [SiJsonwebtokens, "text-[#d63aff]"],
  oauth: [ShieldCheck, "text-emerald-400"],
  postgresql: [SiPostgresql, "text-[#4a90c2]"],
  mysql: [SiMysql, "text-[#4479A1]"],
  mongodb: [SiMongodb, "text-[#47A248]"],
  rest: [Webhook, "text-orange-400"],
  github: [FaGithub, "text-white"],
  rbac: [ShieldCheck, "text-amber-400"],
  aws: [FaAws, "text-[#FF9900]"],
  docker: [FaDocker, "text-[#2496ED]"],
  redis: [SiRedis, "text-[#DC382D]"],
  jenkins: [SiJenkins, "text-[#D24939]"],
  githubactions: [SiGithubactions, "text-[#2088FF]"],
  cicd: [Workflow, "text-violet-400"],
  git: [FaGitAlt, "text-[#F05032]"],
  linux: [FaLinux, "text-[#FCC624]"],
  oop: [Boxes, "text-pink-400"],
  dsa: [Network, "text-fuchsia-400"],
  dbms: [Database, "text-yellow-300"],
  os: [Cpu, "text-slate-300"],
  ml: [Brain, "text-pink-300"],
};

const CATEGORY_ICONS = {
  code: Code2,
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  gitbranch: GitBranch,
  brain: Brain,
};

const SkillIcon = ({ name, className = "w-4 h-4" }) => {
  const entry = ICONS[name];
  if (!entry) return null;
  const [Icon, color] = entry;
  return <Icon className={`${className} ${color}`} aria-hidden="true" />;
};

const SkillCard = ({ category, index }) => {
  const Icon = CATEGORY_ICONS[category.icon] ?? Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden bg-gray-900/70 border-gray-700/70 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 h-full">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(100,100,255,0.06)] to-transparent group-hover:via-[rgba(100,100,255,0.14)] animate-shimmer pointer-events-none" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div
              className={`p-3 rounded-xl bg-gray-800/60 ring-1 ring-white/5 ${category.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 leading-tight">
              {category.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="outline"
                className="group/badge bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-1.5 px-3 transition-all duration-300 hover:scale-105 hover:border-blue-400/50"
              >
                <SkillIcon name={skill.icon} />
                <span className="font-medium">{skill.name}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SkillsSection = () => {
  const loopLogos = loopLogoKeys.map((key) => ({
    node: <SkillIcon name={key} className="h-7 w-7" />,
    ariaLabel: key,
  }));

  return (
    <section id="skills" className="scroll-mt-24 text-white bg-transparent relative py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills & Technologies"
          subtitle="The languages, frameworks and tools I use to design, build and ship full-stack and AI-powered products."
        />

        <div className="mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
'@

Write-ProjectFile 'src/app/pages/projects/projects.js' @'
'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';

import AnimatedProjectCard from '@/components/animation/AnimatedProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects, projectFilters, socials } from '@/data/portfolio';

const githubUrl = socials.find((s) => s.id === 'github')?.href;

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="scroll-mt-24 relative px-4 sm:px-6 py-20 text-white">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects I've Built"
          subtitle="AI platforms, ML pipelines and full-stack apps, built for real problems in code review, railways, agriculture and traffic."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10" role="tablist" aria-label="Filter projects">
          {projectFilters.map((name) => {
            const active = filter === name;
            return (
              <button
                key={name}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(name)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  active ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-purple-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <AnimatedProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <div className="mt-12 flex justify-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 bg-slate-900/60 text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition-all"
          >
            <FaGithub /> See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
'@

Write-ProjectFile 'src/app/pages/experience/experience.js' @'
'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'motion/react';

import ExperienceCard from '@/components/animation/ExperienceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { journey, journeyStats } from '@/data/portfolio';

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export default function ExperiencePage() {
  return (
    <section id="experience" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="Achievements & Leadership"
          subtitle="Hackathons, community work and the things I've led, because good engineering also needs good teamwork."
        />

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {journeyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 sm:left-[22px] top-2 bottom-2 w-px bg-linear-to-b from-blue-500 via-purple-500 to-transparent" />
          <div className="relative">
            {journey.map((item, idx) => (
              <ExperienceCard key={item.title} experience={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'@

Write-ProjectFile 'src/app/pages/education/education.js' @'
'use client';

import { motion } from 'motion/react';
import { Award, BadgeCheck, GraduationCap, MapPin } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { certifications, education } from '@/data/portfolio';

export default function EducationPage() {
  return (
    <section id="education" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Learning"
          title="Education & Certifications"
          subtitle="Formal foundations in computer science, plus industry certifications in AI, ML and web development."
        />

        {/* Degree card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 mb-10"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 grid place-items-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-900/40">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">{education.degree}</h3>
                  <p className="text-blue-400 font-medium mt-1">{education.school}</p>
                  <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1">
                    <MapPin className="w-4 h-4" /> {education.location}
                  </p>
                </div>
                <span className="self-start px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
                  {education.period}
                </span>
              </div>

              <span className="inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30">
                {education.honours}
              </span>

              <div className="mt-5 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-200 border border-blue-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-200 mb-5">
          <Award className="w-5 h-5 text-purple-400" /> Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="shrink-0 grid place-items-center w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white leading-snug">{cert.title}</p>
                <p className="text-sm text-slate-400">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

Write-ProjectFile 'src/app/pages/contact/contact.js' @'
'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Trophy } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import AnimatedContactForm from '@/components/animation/AnimatedContactForm';
import SectionHeading from '@/components/ui/SectionHeading';
import { profile, socials } from '@/data/portfolio';

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  codolio: Trophy,
  mail: Mail,
};

export default function ContactPage() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 sm:px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something"
          subtitle="Have a project, internship or collaboration in mind? Send a message and I'll reply as soon as I can."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4 transition-all hover:border-blue-500/40 hover:-translate-y-0.5"
            >
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300">
                <Mail className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">Email</span>
                <span className="block text-sm sm:text-base text-white truncate">{profile.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-4">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">Based in</span>
                <span className="block text-sm sm:text-base text-white">{profile.location}</span>
              </span>
            </div>

            <div className="pt-2 space-y-3">
              {socials
                .filter((s) => s.id !== 'mail')
                .map((s) => {
                  const Icon = SOCIAL_ICONS[s.id] ?? ArrowUpRight;
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md px-4 py-3 text-slate-300 transition-all hover:text-white hover:border-blue-500/40 hover:bg-slate-800/70"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" /> {s.label}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </a>
                  );
                })}
            </div>
          </motion.div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <AnimatedContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
'@

Write-ProjectFile 'src/components/animation/AnimatedProjectCard.jsx' @'
'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ArrowUpRight, BrainCircuit, CheckCircle2, Gauge, Sprout, TrafficCone, TrainFront } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ICONS = {
  brain: BrainCircuit,
  train: TrainFront,
  gauge: Gauge,
  sprout: Sprout,
  traffic: TrafficCone,
};

export default function AnimatedProjectCard({ project }) {
  const Icon = ICONS[project.icon] ?? BrainCircuit;
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.16), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const hasLinks = project.github || project.live;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-6 sm:p-7 transition-colors duration-300 hover:border-blue-500/40 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* cursor-follow spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />
      {/* accent glow strip */}
      <div className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${project.accent} opacity-80`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className={`shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-linear-to-br ${project.accent} shadow-lg shadow-blue-900/30`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
              {project.date}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30">
                ★ Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">{project.summary}</p>

        <ul className={`grid gap-2.5 mb-6 ${project.featured ? 'md:grid-cols-2' : ''}`}>
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-200 border border-blue-500/20"
              >
                {t}
              </span>
            ))}
          </div>

          {hasLinks ? (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm font-medium text-white hover:bg-slate-700 hover:border-slate-500 transition-colors"
                >
                  <FaGithub /> Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:brightness-110 transition"
                >
                  Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500">Source available on request</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
'@

Write-ProjectFile 'src/components/animation/ExperienceCard.jsx' @'
'use client';

import { motion } from 'motion/react';
import { Megaphone, Trophy, Users } from 'lucide-react';

const TYPE_STYLES = {
  achievement: { icon: Trophy, ring: 'from-amber-400 to-orange-500', label: 'Achievement' },
  leadership: { icon: Users, ring: 'from-blue-500 to-purple-500', label: 'Leadership' },
  outreach: { icon: Megaphone, ring: 'from-pink-500 to-purple-500', label: 'Outreach' },
};

export default function ExperienceCard({ experience, index }) {
  const style = TYPE_STYLES[experience.type] ?? TYPE_STYLES.leadership;
  const Icon = style.icon;
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative pl-14 sm:pl-16 pb-10 last:pb-0"
    >
      {/* timeline node */}
      <div
        className={`absolute left-0 top-1 grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-br ${style.ring} shadow-lg shadow-blue-900/40 ring-4 ring-[#020617]`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{experience.title}</h3>
            <p className="text-blue-400 font-medium text-sm sm:text-base">{experience.org}</p>
          </div>
          <span className="shrink-0 self-start px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
            {experience.period}
          </span>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{experience.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            {style.label}
          </span>
          {experience.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
'@

Write-ProjectFile 'src/components/animation/AnimatedContactForm.jsx' @'
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';

import { profile } from '@/data/portfolio';

// Optional: add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local (free key from web3forms.com)
// to receive messages straight in your inbox. Without it, the form opens the visitor's email app.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function AnimatedContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | opened | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (!WEB3FORMS_KEY) {
      const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus('opened');
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...formData }),
      });
      const data = await res.json();
      if (!data.success) throw new Error('Request failed');
      setFormData(EMPTY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
          <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required rows={5} className={`${inputClass} resize-none`} />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
        >
          {status === 'sending' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
          ) : (
            <><Send className="w-4 h-4" /> Send Message</>
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-green-600/15 border border-green-500/40 text-green-300 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Message sent! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === 'opened' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-blue-600/15 border border-blue-500/40 text-blue-200 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Your email app should open with the message ready to send. If not, write to {profile.email}.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-red-600/15 border border-red-500/40 text-red-300 text-sm">
              <TriangleAlert className="w-4 h-4 shrink-0" /> Something went wrong. Please email me directly at {profile.email}.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
'@

Write-ProjectFile 'src/components/animation/FadeInUp.jsx' @'
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeInUp({ children, delay = 0, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
      }
    );

    // Only clean up THIS element's animation (the old code killed every trigger on the page)
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
'@

Write-ProjectFile 'src/components/animation/RevealText.jsx' @'
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reveals text character by character. Pass a plain string as children.
export default function RevealText({ children, className = '' }) {
  const ref = useRef(null);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('[data-char]');

    const tween = gsap.fromTo(
      chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.03,
        stagger: 0.03,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      }
    );

    // Clean up only this element's animation
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={ref} className={`whitespace-nowrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          data-char
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
'@

Write-ProjectFile 'src/components/ui/SectionHeading.jsx' @'
'use client';

import { motion } from 'motion/react';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-purple-300 pb-1">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">{subtitle}</p>}
      <div className="mt-5 h-1 w-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
    </motion.div>
  );
}
'@

Write-ProjectFile 'src/components/utilities/ScrollProgress.jsx' @'
'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
    />
  );
}
'@

# Resume PDF (embedded)
New-Item -ItemType Directory -Force -Path ".\public" | Out-Null
$pdfB64 = "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"
[System.IO.File]::WriteAllBytes((Join-Path $PWD "public\Soham_Darak_Resume.pdf"), [Convert]::FromBase64String($pdfB64))
Write-Host "  wrote public/Soham_Darak_Resume.pdf" -ForegroundColor Green

# Remove duplicate route stubs (they created /pages/skills, /pages/projects ... as separate pages)
foreach ($s in "skills","projects","experience","education","contact") {
  $stub = "src\app\pages\$s\page.js"
  if (Test-Path $stub) {
    $dest = Join-Path $backup $stub
    New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
    Move-Item $stub $dest -Force
    Write-Host "  removed $stub (backed up)" -ForegroundColor Yellow
  }
}

# Clear Next.js cache
if (Test-Path ".\.next") { Remove-Item ".\.next" -Recurse -Force; Write-Host "  cleared .next cache" -ForegroundColor Yellow }

Write-Host ""
Write-Host "Done. Old versions are saved in $backup" -ForegroundColor Cyan
Write-Host "Now run:  pnpm dev" -ForegroundColor Cyan
