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