import LandingHero from "./_components/hero";
import LandingFeatures from "./_components/features";
import LandingPricing from "./_components/pricing";
import LanguageBar from "./_components/language-bar";
import LLMAnimation from "./_components/llm-demo";
import LandingProgress from "./_components/progress";
import { BentoFeaturesGrid } from "./_components/features-bento";
import NlpFeatures from "./_components/nlp-features";
import Flashcards from "./_components/flashcards";
import LandingBlog from "./_components/blog";

const LandingPage = () => {
  return (
    <div className="select-none">
      <LandingHero />
      <LLMAnimation />
      <BentoFeaturesGrid />
      <NlpFeatures />
      <Flashcards />
      <LandingFeatures />
      <LandingProgress />
      <LandingPricing />
      <LandingBlog />
      <LanguageBar />
    </div>
  );
};

export default LandingPage;
