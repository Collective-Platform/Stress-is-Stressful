import type { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Press_Start_2P } from 'next/font/google'

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
      <body className={cn(pressstart2p.className, 'flex min-h-full flex-col')}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
