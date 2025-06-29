import { Analytics } from '@vercel/analytics/react';
import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
// import { Levitate } from './components/levitating'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arjun Aditya',
    template: '%s | Arjun Aditya',
  },
  description: "I'm Arjun Aditya who codes and designs.",
  openGraph: {
    title: 'Arjun Aditya',
    description: "I'm Arjun Aditya who codes and designs.",
    url: baseUrl,
    siteName: 'Arjun Aditya',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://arjunaditya.xyz/og.png',
        width: 1200,
        height: 630,
        alt: 'Arjun Aditya',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111111]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased">
        <div className="max-w-4xl mx-4 mt-8 lg:mx-auto dark:bg-[#111111]">
          <main>
            {children}
            {/* <Levitate /> */}
            <Analytics />
            <SpeedInsights />
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
