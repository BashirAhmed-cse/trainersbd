import CoursesSection from "@/components/CoursesSection";
import HeroSection from "@/components/HeroSection";
import MembersTrainersSection from "@/components/MembersTrainersSection";
import MultiTabSection from "@/components/MultiTabSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection/>
      <MultiTabSection/>
      <MembersTrainersSection/>
      <CoursesSection/>
    </div>
  );
}