'use client'

import truck from '@/images/truck.gif'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Loading() {
  const router = useRouter()

  useEffect(() => {
    // Function to reset zoom and scroll position
    const resetViewport = () => {
      // Reset zoom level
      document.body.style.zoom = '100%'
      // For browsers that don't support zoom
      document.body.style.transform = 'scale(1)'
      document.body.style.transformOrigin = '0 0'

      // Scroll to top
      window.scrollTo(0, 0)

      // Attempt to fit content to viewport
      document.documentElement.style.height = '100%'
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    }

    // Call resetViewport when component mounts
    resetViewport()

    // Set up the redirect timer
    const timer = setTimeout(() => {
      router.push('/content') // Redirect to the content page after 3 seconds
    }, 3000)

    // Cleanup function
    return () => {
      clearTimeout(timer)
      // Reset body styles when component unmounts
      document.body.style.height = ''
      document.body.style.overflow = ''
    }
  }, [router])

  return (
    <main className="h-screen bg-gradient-to-br from-dark-blue to-light-blue">
      <div className="flex flex-col items-center py-[40vh] align-middle">
        <div className="align-middle">
          <Image
            src={truck}
            alt={'truck'}
            className="w-[200px] lg:w-[300px] 2xl:w-[20vw]"
          />
        </div>

        <h3 className="m-5 text-center text-xs text-orange-200 lg:text-sm 2xl:text-2xl">
          We&apos;re tossing the stress out for you...
        </h3>
      </div>
    </main>
  )
}
