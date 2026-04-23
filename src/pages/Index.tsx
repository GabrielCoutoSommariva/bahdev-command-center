import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Solution from "@/components/sections/Solution";
import Omnichannel from "@/components/sections/Omnichannel";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import CaseStudy from "@/components/sections/CaseStudy";
import ForWho from "@/components/sections/ForWho";
import Plans from "@/components/sections/Plans";
import LeadCapture from "@/components/sections/LeadCapture";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <PainPoints />
      <Solution />
      <Omnichannel />
      <HowItWorks />
      <Benefits />
      <CaseStudy />
      <ForWho />
      <Plans />
      <LeadCapture />
      <FAQ />
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileStickyBar />
  </>
);

export default Index;
