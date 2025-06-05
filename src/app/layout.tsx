import type { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Press_Start_2P } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

const pressstart2p = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  description: 'For the lost',
  title: 'Strictly Students',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full" lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MW9M4Z3F');
          `}
        </Script>
      </head>
      <body className={cn(pressstart2p.className, 'flex min-h-full flex-col')}>
        <noscript>
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-MW9M4Z3F"
            style={{ display: 'none', visibility: 'hidden' }}
            width="0"
          />
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
