import Link from "next/link";
import Footer from "@/components/footer";
import LandingNavbar from "@/components/ladingNavbar";
import ExpandingArrow from "@/components/expanding-arrow";
import { Layout, MessageCircle, Text } from "lucide-react";

const links = [
  { title: 'Dashboard', description: 'Your user dashboard', icon: Layout, href: 'https://app.lingsquare.com' },
  { title: 'Blog', description: 'Read our latest news and articles', icon: Text, href: '/blog' },
  { title: 'Contact Us', description: 'We are always happy to help you', icon: MessageCircle, href: '/contact-us' },
]

export default function NotFound() {
  return (
    <>
      <LandingNavbar />
      <div className="flex justify-around min-h-full select-none">
        <div className="flex flex-col items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
            <p className="text-base font-semibold leading-8 text-sky-700">404</p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 group">
              <Link
                href="/"
                className="text-sm font-semibold leading-7 text-sky-600 flex gap-2 group hover:text-sky-700"
              >
                <ExpandingArrow className="-ml-4 h-4 w-4 text-sky-600 group-hover:text-sky-700" direction="left" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
        <div className="justify-center items-center flex-col hidden md:flex select-none">
          <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Are you Looking for</h2>
          <ul role="list" className="mt-4 border-t border-gray-200 divide-y divide-gray-200">
            {links.map((link, linkIdx) => (
              <Link href={link.href} className="group" key={linkIdx}>
                <li className="relative py-6 flex items-start space-x-4 w-96 group-hover:bg-sky-50/95 pr-10 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-lg">
                      <link.icon className="h-6 w-6 text-sky-600 group-hover:text-sky-700" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-gray-800 group-hover:text-gray-950">
                      <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {link.title}
                      </span>
                    </h3>
                    <p className="text-base text-gray-500 group-hover:text-gray-700">{link.description}</p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <ExpandingArrow className="mr-4 h-4 w-4 text-sky-600 group-hover:text-sky-700" />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
