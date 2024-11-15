'use client'

import stresswall from '@/images/stresswall.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const navigateToStresswall = () => {
    router.push('/stresswall')
  }

  return (
    <main>
      <div className="relative h-[30vh] w-full">
        <div className="absolute inset-0">
          <Image
            alt="a brick wall"
            className="object-cover object-top"
            fill
            quality={100}
            sizes="100vw"
            src={stresswall}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <button
            className="w-full max-w-md rounded-2xl border-b-4 border-r-4 border-oren-600 bg-gradient-to-b from-oren-2 to-oren-3 py-4 text-lg font-bold uppercase text-dark-blue shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:scale-105 hover:shadow-lg active:translate-x-[4px] active:translate-y-[4px] active:border-b-0 active:border-r-0 active:shadow-none xl:text-xl"
            onClick={navigateToStresswall}
          >
            Go to stresswall
          </button>
        </div>
      </div>
    </main>
  )
}
