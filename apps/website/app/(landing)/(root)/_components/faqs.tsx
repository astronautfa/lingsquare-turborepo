import Link from 'next/link'


const faqs = [
  [
    {
      question: 'What content could be added to my Lingsquare library',
      answer:
        'We support a wide range of content types. Youtube videos, podcasts, text and your digital ebook library could be imported to your Lingsquare library.',
    },
    {
      question: 'Are my imported texts private and only available to me?',
      answer:
        'The content you upload can be saved to your private space if it contains copyrighted material. Private space is only available to paid users.',
    },
    {
      question: 'How much space does my private space have?',
      answer:
        'Every paid account comes with 200mb private space. We are working hard to expand Lingsquare and because this website is bootstrapped we need more active users to be able to give out more space',
    },
    {
      question: 'With my free account could I use the context aware translation feature?',
      answer:
        'We use large language models under the hood of the context aware translation feature, and these models are charging us on a request basis, for now we are unfortunately limiting free users to 10 context aware translation per month. With more users we could dedicate more resources to free and paid users.',
    },
  ],
  [
    {
      question: 'What new features can we expect from Lingsquare?',
      answer:
        'We are a dedicated group of developers frustrated with language learning software and apps. We release features on a monthly basis and out development roadmap could be seen at /roadmap',
    },
    {
      question: 'Can I import web pages into Lingsquare?',
      answer:
        'We want users to be able to import whatever type of content they may want to learn from. All webpages could be imported into Lingsquare',
    },
    {
      question: 'Can I export my flashcards to review them in Anki or any other software?',
      answer:
        'We intend to make Lingsquare a service which the user owns their data. We never want to lock you in our system by not giving you the freedom of using the softwares of your choice',
    },
    {
      question: 'Does Lingsquare offer any referral programs?',
      answer:
        'For now we have not figured out the referral program we may want to have. If you are a mentor or influencer in the field of language learning, please contact us.',
    },
  ],
  [
    {
      question: 'Can I request a feature?',
      answer:
        'We are always happy to hear from our users. If you have any feedback or feature suggestion please reach out to us from our contact us page',
    },
    {
      question: 'Will my private space be available if I dont renew my subscription?',
      answer:
        'Lingsquare is completely bootstrapped with very limited resources from the launch. We intend to serve active users as best as we could.For now, your private files remain on our servers for two months without an active subscription',
    },
    {
      question: 'Can I request audio or scripts from community without a paid account?',
      answer:
        'Absolutely. At Lingsquare you could request as many audio or scripts from the community as long as you fulfill other community members request in your native language.',
    },
    {
      question: 'What does built in public mean?',
      answer:
        'We are trying to be as transparent as possible as a business with our users and everyone else on the internet. We want Lingsquare to be an example of a bootstrapped business built out of frustration with existing solutions.',
    },
  ],
]

const LandingFaqs = () => {
  return (
    <section
      id="faq"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <div className='md:mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mx-10'>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-black"
            >
              contact us
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


export default LandingFaqs