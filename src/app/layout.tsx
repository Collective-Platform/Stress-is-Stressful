import type { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Press_Start_2P } from 'next/font/google'

import './globals.css'
import Script from 'next/script'

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
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.chatwootSettings = {
            position: "right",
            type: "expanded_bubble",
            launcherTitle: "Chat with us",
          };

          window.addEventListener('chatwoot:ready', function() {
            if (window.location.pathname === "/stresswall") {
              setTimeout(() => {
                window.$chatwoot.toggle('open');
              }, 3000)
            }
          });

          (function(d,t) {
            var BASE_URL="https://collective-chat.up.railway.app";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'Aqpb1DYTEGTbSkvCfwvY4HCn',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `,
        }}
        id="chatwoot"
        strategy="afterInteractive"
      />
      <GoogleTagManager gtmId="GTM-MW9M4Z3F" />
      <body className={cn(pressstart2p.className, 'flex min-h-full flex-col')}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
