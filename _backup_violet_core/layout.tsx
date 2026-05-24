import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nookala Tejdeep | BTech CSE | Portfolio",
  description:
    "Portfolio of Nookala Tejdeep — 3rd Year BTech CSE Student at Manipal Institute of Technology. Developer, Problem Solver & Tech Enthusiast.",
  keywords: [
    "Nookala Tejdeep",
    "BTech CSE",
    "Software Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Full Stack Developer",
    "Manipal Institute of Technology",
  ],
  authors: [{ name: "Nookala Tejdeep" }],
  openGraph: {
    type: "website",
    title: "Nookala Tejdeep | Developer Portfolio",
    description:
      "Developer, Problem Solver & Tech Enthusiast. Explore my projects, skills, and experience.",
    siteName: "Tejdeep Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nookala Tejdeep | Developer Portfolio",
    description:
      "Developer, Problem Solver & Tech Enthusiast. Explore my projects, skills, and experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#121415] text-[#e2e2e3]">
        {children}
      </body>
    </html>
  );
}
