import FeatureCard from "@/components/feature-card";
import {
  BookMarked,
  Brain,
  CircleDashed,
  UserCheck,
  FileAudio,
  Chrome,
  FolderOutput,
  Footprints,
  Library,
  GitPullRequestIcon,
} from "lucide-react";
import { FaAndroid, FaApple } from "react-icons/fa6";

export const FEATURES: {
  title: string;
  slug:
  | "overview"
  | "getting-started"
  | "powerful-lookup"
  | "link-management"
  | "custom-domains"
  | "custom-progress"
  | "migrating"
  | "api"
  | "saml-sso";
  description: string;
  icon: JSX.Element;
  planned: boolean;
}[] = [
    {
      title: "Seamless Flashcards",
      slug: "custom-domains",
      description:
        "Add your unknown words as a flashcard and review them based on scientifically approved algorithms.",
      icon: <Brain className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />,
      planned: true,
    },
    {
      title: "Track your progress",
      slug: "custom-progress",
      description:
        "Get into the habit of language learning by integrating learning into your daily routine",
      icon: (
        <CircleDashed className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Web importer",
      slug: "getting-started",
      description:
        "Import any web page and save the text in your bucket to read it later accross all your devices using lingsquare",
      icon: (
        <BookMarked className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Listen to your text",
      slug: "migrating",
      description:
        "You could request your text to be read by a native speaker or you could listen to a natural sounding, native AI speaker.",
      icon: (
        <FileAudio className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Learn Socially",
      slug: "saml-sso",
      description:
        "Get audio for your desired text by native speakers and help others learn your language.",
      icon: (
        <UserCheck className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Learn on the go",
      slug: "saml-sso",
      description:
        "Premium users get access to private bucket to save their ebooks and AI generated audio.",
      icon: (
        <Footprints className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Easy backup and export",
      slug: "saml-sso",
      description:
        "Your content is yours. We provide easy exports so that you are not locked in our system",
      icon: (
        <FolderOutput className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
    {
      title: "Chrome extension",
      slug: "saml-sso",
      description:
        "Save to read later or use all the LingSquare features on every web page you visit by using our dedicated extension",
      icon: <Chrome className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />,
      planned: true,
    },
    {
      title: "Large Library",
      slug: "saml-sso",
      description:
        "You could explore the vast library provided to you for free and import whichever content you like the most to start learning",
      icon: (
        <Library className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: true,
    },
  ];

export const FEATURESLast: {
  title: string;
  slug:
  | "overview"
  | "getting-started"
  | "link-management"
  | "custom-domains"
  | "migrating"
  | "api"
  | "request-features";
  description: string;
  icon: JSX.Element;
  planned: boolean;
}[] = [
    {
      title: "Mobile Apps",
      slug: "overview",
      description:
        "With you support Android and iOS apps will be made possible. By using our apps all your language learning content have a place to live. All content would be automatically synchronised to make learning as easy as possible.",
      icon: (
        <div className="flex item-center justify-start">
          <FaAndroid className="h-6 w-6 text-gray-500 mt-0.5 group-hover:text-sky-700" />
          <FaApple className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
        </div>
      ),
      planned: true,
    },
    {
      title: "Request Features",
      slug: "request-features",
      description:
        "We are dedicated to make LingSquare a complete language learning solution. If you have any features in mind you could request them using the following link. You could also keep track of our roadmap using the same link.",
      icon: (
        <GitPullRequestIcon className="h-6 w-6 text-gray-500 group-hover:text-sky-700" />
      ),
      planned: false,
    },
  ];

const LandingFeatures = () => {
  return (
    <section id="features">
      <div className="bg-white py-24 ">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center px-4">
            <h2 className="text-base font-semibold leading-7 text-sky-600">
              Roadmap
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Every tool you need for efficient language immersion
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are constantly working on new features to provide you with the
              best language learning tool
            </p>
          </div>

          <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-10">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {FEATURES.map((category, index) => (
                <FeatureCard
                  planned={category.planned}
                  key={`${category.slug}-${index}`}
                  href={`/help/category/${category.slug}`}
                  name={category.title}
                  description={category.description}
                  icon={category.icon}
                  pattern={{
                    y: 16,
                    squares: [
                      [0, 1],
                      [1, 3],
                    ],
                  }}
                />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {FEATURESLast.map((category, index) => (
                <FeatureCard
                  planned={category.planned}
                  key={`${category.slug}-${index}-2`}
                  href={`/help/category/${category.slug}`}
                  name={category.title}
                  description={category.description}
                  icon={category.icon}
                  pattern={{
                    y: 16,
                    squares: [
                      [0, 1],
                      [1, 3],
                    ],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
