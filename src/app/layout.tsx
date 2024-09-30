import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pressstart2p = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Strictly Students',
  description: 'For the lost',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(pressstart2p.className, 'flex min-h-full flex-col')}>
        {children}
      </body>
    </html>
  )
}
