import LandingHero from "./_components/hero";
import LandingFeatures from "./_components/features";
import LandingPricing from "./_components/pricing";
import LanguageBar from "./_components/language-bar";
import LLMAnimation from "./_components/llm-demo";
import LandingProgress from "./_components/progress";
import BentoFeaturesGrid from "./_components/features-bento";
import NlpFeatures from "./_components/nlp-features";
// import Flashcards from "./_components/flashcards";
import GlobeBar from "./_components/globe-bar";

const LandingPage = () => {
  return (
    <div className="select-none">
      <LandingHero />
      <LLMAnimation />
      <BentoFeaturesGrid />
      <NlpFeatures />
      {/* <Flashcards /> */}
      <LandingFeatures />
      <LandingProgress />
      <LanguageBar />
      <LandingPricing />
      <GlobeBar />
    </div>
  );
};

export default LandingPage;
