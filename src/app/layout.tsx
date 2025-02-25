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
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RPPB460CM1"
          strategy="afterInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RPPB460CM1'); `,
          }}
          id="google-analytics"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn(pressstart2p.className, 'flex min-h-full flex-col')}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
