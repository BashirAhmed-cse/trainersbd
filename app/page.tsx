import CoursesSection from "@/components/CoursesSection";
import HeroSection from "@/components/HeroSection";
import MembershipApplication from "@/components/MembershipApplication";
import MembersTrainersSection from "@/components/MembersTrainersSection";
import MultiTabSection from "@/components/MultiTabSection";
import PartnerSection from "@/components/PartnerSection";
import ResourceLibrary from "@/components/ResourceLibrary";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection/>
      <section id="founders-bod">
      <MultiTabSection/>
      </section>
      <section id="members-directory">
      <MembersTrainersSection/>
      </section>
      <CoursesSection/>
      <section id="resource-library">
      <ResourceLibrary/>
      </section>
      <PartnerSection/>
      <MembershipApplication/>
    </div>
  );
}