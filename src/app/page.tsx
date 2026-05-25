import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="scroll-smooth relative">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      
      <HeroSection />
      
      <Marquee
        items={["DESIGNER", "DEVELOPER", "PROBLEM SOLVER", "TECH ENTHUSIAST", "BTECH CSE MIT"]}
        direction="left"
        className="-rotate-1 relative z-20 shadow-md"
      />
      
      <AboutSection />
      
      <Marquee
        items={["REACT", "PYTHON", "SQL", "FLASK", "DOCKER", "SCIKIT-LEARN", "PANDAS", "MONGODB", "LINUX"]}
        direction="right"
        className="rotate-1 relative z-20 shadow-md"
      />
      
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}

