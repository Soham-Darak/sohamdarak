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