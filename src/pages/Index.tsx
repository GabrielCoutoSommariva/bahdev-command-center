import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Solution from "@/components/sections/Solution";
import Products from "@/components/sections/Products";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import CaseStudy from "@/components/sections/CaseStudy";
import RegionMap from "@/components/sections/RegionMap";
import ForWho from "@/components/sections/ForWho";
import Plans from "@/components/sections/Plans";
import MissionVisionValues from "@/components/sections/MissionVisionValues";
import LeadCapture from "@/components/sections/LeadCapture";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";
import SolutionsPopup from "@/components/SolutionsPopup";

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <RegionMap />
      <PainPoints />
      <Solution />
      <Products />
      <HowItWorks />
      <Benefits />
      <ForWho />
      <CaseStudy />
      <Plans />
      <LeadCapture />
      <FAQ />
      <MissionVisionValues />
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileStickyBar />
    <SolutionsPopup />
  </>
);

export default Index;
