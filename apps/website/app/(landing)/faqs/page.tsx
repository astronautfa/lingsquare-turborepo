import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "ui/components/ui/accordion";

const faqs = [
  [
    {
      question: "What content could be added to my Lingsquare library",
      answer:
        "We support a wide range of content types. Youtube videos, podcasts, text and your digital ebook library could be imported to your Lingsquare library.",
    },
    {
      question: "Are my imported texts private and only available to me?",
      answer:
        "The content you upload can be saved to your private space if it contains copyrighted material. Private space is only available to paid users.",
    },
    {
      question: "How much space does my private space have?",
      answer:
        "Every paid account comes with 200mb private space. We are working hard to expand Lingsquare and because this website is bootstrapped we need more active users to be able to give out more space",
    },
    {
      question:
        "With my free account could I use the context aware translation feature?",
      answer:
        "We use large language models under the hood of the context aware translation feature, and these models are charging us on a request basis, for now we are unfortunately limiting free users to 10 context aware translation per month. With more users we could dedicate more resources to free and paid users.",
    },
  ],
  [
    {
      question: "What new features can we expect from Lingsquare?",
      answer:
        "We are a dedicated group of developers frustrated with language learning software and apps. We release features on a monthly basis and out development roadmap could be seen at /roadmap",
    },
    {
      question: "Can I import web pages into Lingsquare?",
      answer:
        "We want users to be able to import whatever type of content they may want to learn from. All webpages could be imported into Lingsquare",
    },
    {
      question:
        "Can I export my flashcards to review them in Anki or any other software?",
      answer:
        "We intend to make Lingsquare a service which the user owns their data. We never want to lock you in our system by not giving you the freedom of using the softwares of your choice",
    },
    {
      question: "Does Lingsquare offer any referral programs?",
      answer:
        "For now we have not figured out the referral program we may want to have. If you are a mentor or influencer in the field of language learning, please contact us.",
    },
  ],
  [
    {
      question: "Can I request a feature?",
      answer:
        "We are always happy to hear from our users. If you have any feedback or feature suggestion please reach out to us from our contact us page",
    },
    {
      question:
        "Will my private space be available if I dont renew my subscription?",
      answer:
        "Lingsquare is completely bootstrapped with very limited resources from the launch. We intend to serve active users as best as we could.For now, your private files remain on our servers for two months without an active subscription",
    },
    {
      question:
        "Can I request audio or scripts from community without a paid account?",
      answer:
        "Absolutely. At Lingsquare you could request as many audio or scripts from the community as long as you fulfill other community members request in your native language.",
    },
    {
      question: "What does built in public mean?",
      answer:
        "We are trying to be as transparent as possible as a business with our users and everyone else on the internet. We want Lingsquare to be an example of a bootstrapped business built out of frustration with existing solutions.",
    },
  ],
];

export default function ContactUsPage() {
  return (
    <div className="isolate bg-white px-6 py-28 sm:py-52 lg:px-8 w-full justify-center flex items-center">
      <div className="container grid max-w-6xl gap-8 md:gap-16">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1973ce] to-[#646698] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            For more question contact us
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:gap-8">
          {faqs.map((item, itemIndex) => (
            <>
              {item.map((faq, faqIndex) => (
                <Accordion type="single" collapsible key={faqIndex}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="w-lg">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
