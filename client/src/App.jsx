import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import SocialProof from "./components/sections/SocialProof";
import ServicesTabs from "./components/sections/ServicesTabs";
import PromptBox from "./components/sections/PromptBox";
import PillarStack from "./components/sections/PillarStack";
import StrategySection from "./components/sections/StrategySection";
import BrandsCarousel from "./components/sections/BrandsCarousel";
import AboutBento from "./components/sections/AboutBento";
import FinalCta from "./components/sections/FinalCta";

const App = () => {
  // Rolagem suave (desligada para quem prefere menos movimento).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -96 } });
    return () => lenis.destroy();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ServicesTabs />
        <PromptBox />
        <PillarStack />
        <StrategySection />
        <BrandsCarousel />
        <AboutBento />
      </main>
      <FinalCta />
    </MotionConfig>
  );
};

export default App;
