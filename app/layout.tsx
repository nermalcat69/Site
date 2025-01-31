import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import WindowSize from './components/WindowSize'

const hexFont = localFont({
  src: [
    {
      path: '../app/fonts/HEX-Franklin-v02-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/HEX-Franklin-v02-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/HEX-Franklin-v02-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../app/fonts/HEX-Franklin-v02-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/fonts/HEX-Franklin-v02-Extrabold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-hex',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arjun Aditya',
    template: '%s | Arjun Aditya',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'Arjun Aditya',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'Arjun Aditya',
    locale: 'en_US',
    type: 'website',
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
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
        hexFont.variable
      )}
    >
      <body className="antialiased  mx-12 pt-12 ">
        <WindowSize />
        <main className="flex min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
