<div align="center">

# Soham Darak | Portfolio

**Full-Stack & AI Developer building AI-powered products, from multi-agent code review to ML-driven railway analytics.**

[![Live Site](https://img.shields.io/badge/Live-sohamdarak.vercel.app-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://sohamdarak.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Motion](https://img.shields.io/badge/Motion-12-FF0050?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[View Live Site](https://sohamdarak.vercel.app) · [Resume](./public/Soham_Darak_Resume.pdf) · [LinkedIn](https://www.linkedin.com/in/soham-darak) · [Email](mailto:daraksoham@gmail.com)

</div>

<!-- Add a screenshot: save it as public/screenshots/home.png, then uncomment the next line
<p align="center"><img src="./public/screenshots/home.png" alt="Portfolio preview" width="90%" /></p>
-->

---

## About

This is my personal portfolio: a fast, responsive, single-page site that shows who I am, what I build and how to reach me. It has a space theme with a WebGL starfield, smooth scroll animations and a clean dark UI. Every piece of content (skills, projects, achievements) lives in **one data file**, so updating the site takes minutes.

## Highlights

- **Animated loading screen** that splits open to reveal the site
- **WebGL galaxy background** (OGL) behind every section
- **Hero** with animated roles, a live code card and one-click resume download
- **Projects** with category filters, cursor-follow spotlight cards and GitHub / live-demo links
- **Skills** grouped into 7 categories, with an auto-scrolling tech logo strip
- **Achievements & leadership** timeline with animated counters
- **Education & certifications** section
- **Working contact form** that uses Web3Forms, or opens the visitor's email app as a fallback
- **Navigation** with a floating pill navbar that highlights the section you're in, plus a scroll-progress bar
- **SEO ready** with Open Graph, Twitter metadata and JSON-LD structured data
- **Responsive and accessible** on mobile, tablet and desktop, with `prefers-reduced-motion` support

## Sections

| # | Section | What it shows |
|---|---------|---------------|
| 1 | **Home** | Intro, rotating roles, resume and social links |
| 2 | **About** | Bio, education, key numbers, profile card |
| 3 | **Skills** | Languages, frontend, backend, databases, cloud, DevOps, CS and ML |
| 4 | **Projects** | CodeGrowth AI, OPTI-PRAVAH, RailQuick, Agrimed, TRAFFICQ |
| 5 | **Journey** | Hackathons, leadership roles and community work |
| 6 | **Education** | B.Tech CSE at RCOEM, plus certifications |
| 7 | **Contact** | Email, location, social links and a message form |

## Tech Stack

| Area | Tools |
|------|-------|
| **Framework** | Next.js 16 (App Router, Turbopack), React 19 |
| **Styling** | Tailwind CSS 4, tw-animate-css, shadcn-style UI primitives |
| **Animation** | GSAP (ScrollTrigger), Motion (Framer Motion) |
| **Graphics** | OGL (WebGL galaxy background) |
| **Icons** | Lucide React, React Icons |
| **Tooling** | npm, ESLint |
| **Hosting** | Vercel |

## Project Structure

```text
sohamdarak-portfolio/
├── public/                     # Static files (profile photo, resume PDF)
└── src/
    ├── app/
    │   ├── layout.js           # Root layout, fonts, SEO metadata
    │   ├── page.js             # Assembles all sections + footer
    │   ├── globals.css         # Theme, Tailwind and global styles
    │   └── pages/              # One folder per section
    │       ├── Header/  Hero/  aboutme/  Skills/
    │       └── projects/  experience/  education/  contact/
    ├── components/
    │   ├── animation/          # Reusable motion components (FadeInUp, cards, forms)
    │   ├── sections/           # Profile card, typing text
    │   ├── ui/                 # Card, Badge, SectionHeading, ElectricBorder
    │   └── utilities/          # Galaxy background, loading screen, scroll progress
    ├── data/
    │   └── portfolio.js        # All your content lives here
    └── lib/utils.js
```

## Getting Started

**Requirements:** [Node.js](https://nodejs.org) 20 or newer and npm.

```bash
# 1. Clone the repo
git clone https://github.com/Soham-Darak/sohamdarak.git
cd sohamdarak

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Customising the Content

Everything is controlled from **`src/data/portfolio.js`**:

| Want to change... | Edit this export |
|-------------------|------------------|
| Name, tagline, bio, email, site URL | `profile` |
| GitHub / LinkedIn / Codolio links | `socials` |
| Skills and icons | `skillCategories`, `loopLogoKeys` |
| Projects (add, remove, reorder) | `projects` |
| Hackathons and leadership | `journey` |
| Degree and coursework | `education` |
| Certifications | `certifications` |

Replace `public/Soham_Darak_Resume.pdf` to update the downloadable resume, and `public/soham.png` to change the profile photo.

## Contact Form (optional setup)

By default, **Send Message** opens the visitor's email app. To receive messages straight in your inbox:

1. Get a free access key at [web3forms.com](https://web3forms.com).
2. Create a `.env.local` file in the project root:
```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```
3. On Vercel, add the same variable under **Project → Settings → Environment Variables**, then redeploy.

## Deployment

The site is deployed on **Vercel**, and every push to `main` triggers a new production build.

1. Import the repo on [vercel.com](https://vercel.com/new).
2. Keep the defaults (Next.js is detected automatically).
3. Deploy.

> **Tip:** Vercel builds on Linux, which is **case-sensitive**, while Windows is not. Import paths in this project use lowercase filenames so local and production builds resolve the same files.

## Featured Projects

| Project | What it is | Stack |
|---------|------------|-------|
| [**CodeGrowth AI**](https://github.com/Soham-Darak/codegrowth-ai) | Multi-agent AI platform that reviews student GitHub repositories for quality, security and authenticity | Python, FastAPI, Next.js, Spring Boot, PostgreSQL, Redis |
| [**OPTI-PRAVAH**](https://github.com/Soham-Darak/Opti-Pravah) | Railway delay prediction and auto-rerouting dashboard with live map visualisation | FastAPI, XGBoost, PyTorch, NetworkX, Next.js, MapLibre |
| **RailQuick** | End-to-end ML pipeline for real-time train delay prediction | Python, Scikit-learn, Flask |
| [**Agrimed**](https://agrimed.vercel.app/) | Crop-disease detection app for farmers, 20+ crops and 100+ disease scenarios | React, Tailwind CSS, Google Sheets API |
| **TRAFFICQ** | Multi-agent traffic system built for the Capgemini Deep Dive Hackathon 2026 | GPT-4, FastAPI, Redis, XGBoost |

## Connect With Me

**Soham Darak**, B.Tech CSE (2023 – 2027), RCOEM Nagpur

- Portfolio: [sohamdarak.vercel.app](https://sohamdarak.vercel.app)
- GitHub: [@Soham-Darak](https://github.com/Soham-Darak)
- LinkedIn: [soham-darak](https://www.linkedin.com/in/soham-darak)
- Codolio: [SohamDarak](https://codolio.com/profile/SohamDarak)
- Email: [daraksoham@gmail.com](mailto:daraksoham@gmail.com)

## License

This is a personal portfolio project. You are welcome to take inspiration from the design and code. Please don't republish it as your own, and replace all personal content (text, photo, resume) with yours.

---

<div align="center">

If you like this project, a star on the repo is much appreciated.

</div>