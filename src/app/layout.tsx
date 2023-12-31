import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font'

import Page from '@/components/ui/design/page'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const DEFAULT_TITLE = 'stream zone'

export const metadata = {
  title: DEFAULT_TITLE,
  description: 'Generated by create-t3-app',
  icons: [
    { rel: 'icon', url: '/favicon.png' },
    { rel: 'shortcut icon', url: '/favicon.png' },
    { rel: 'apple-touch-icon', url: '/icon.png', sizes: '57x57' },
    { rel: 'apple-touch-icon', url: '/icon.png', sizes: '72x72' },
    { rel: 'apple-touch-icon', url: '/icon.png', sizes: '114x114' },
    { rel: 'apple-touch-icon', url: '/icon.png', sizes: '144x144' },
  ],
}

// export const viewport = {
//   themeColor: '#15232d',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <link rel='manifest' href='/manifest.json' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='msapplication-starturl' content='/' />
      {/* <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      /> */}
      <meta name='theme-color' content='#15232d' />
      <link
        href='splash.png'
        media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
        rel='apple-touch-startup-image'
      />
      <body className={`font-sans ${GeistSans.className} ${inter.variable}`}>
        <Page>{children}</Page>
      </body>
    </html>
  )
}
