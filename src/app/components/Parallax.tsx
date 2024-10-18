'use client'

import c1 from '@/images/sunset/cloud-1.png'
import c2 from '@/images/sunset/cloud-2.png'
import c3 from '@/images/sunset/cloud-3.png'
import c4 from '@/images/sunset/cloud-4.png'
import c5 from '@/images/sunset/cloud-5.png'
import c6 from '@/images/sunset/cloud-6.png'
import m1 from '@/images/sunset/mountain-1.png'
import m2 from '@/images/sunset/mountain-2.png'
import m3 from '@/images/sunset/mountain-3.png'
import sunI from '@/images/sunset/sun.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

function Parallax() {
  const [, setBackground] = useState(20)

  const parallaxRef = useRef(null)
  const mountain3 = useRef(null)
  const mountain2 = useRef(null)
  const mountain1 = useRef(null)
  const cloud1 = useRef(null)
  const cloud2 = useRef(null)
  const cloud3 = useRef(null)
  const cloud4 = useRef(null)
  const cloud5 = useRef(null)
  const cloud6 = useRef(null)
  const sun = useRef(null)
  const copy = useRef(null)
  // const btn = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: '5000 bottom',
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20))
          },
        },
      })
      tl.to(
        mountain3.current,
        {
          y: '+=1200',
        },
        0,
      )
      tl.to(
        mountain2.current,
        {
          y: '+=700',
        },
        0,
      )
      tl.to(
        mountain1.current,
        {
          y: '-=0',
        },
        0,
      )

      tl.to(
        cloud1.current,
        {
          x: '-=500',
          y: '-=500',
        },
        0,
      )
      tl.to(
        cloud2.current,
        {
          x: '+=500',
        },
        0,
      )
      tl.to(
        cloud3.current,
        {
          x: '+=500',
        },
        0,
      )
      tl.to(
        cloud4.current,
        {
          x: '-=500',
          y: '+=500',
        },
        0,
      )
      tl.to(
        cloud5.current,
        {
          x: '+=500',
          y: '+=500',
        },
        0,
      )
      tl.to(
        cloud6.current,
        {
          x: '-=500',
          y: '+=500',
        },
        0,
      )
      tl.to(
        sun.current,
        {
          y: '+=2000',
        },
        0,
      )
      tl.to(
        copy.current,
        {
          y: '+=1600',
        },
        0,
      )
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="relative z-0 h-screen overflow-hidden bg-oren-4">
      <div className="relative h-[110vh] w-full">
        <Image
          ref={mountain3}
          className="absolute bottom-[9%] z-10 w-full"
          src={m3}
          alt={'mountain3'}
        />
        <Image
          ref={mountain2}
          className="absolute bottom-[9%] z-20 w-full"
          src={m2}
          alt={'mountain2'}
        />
        <Image
          ref={mountain1}
          className="absolute bottom-[9%] z-30 w-full"
          src={m1}
          alt={'mountain1'}
        />
        <Image
          ref={sun}
          className="absolute bottom-[18%] left-[50%] z-0 w-[25%] sm:bottom-[20%] sm:w-[20%] md:bottom-[23%] md:left-[53%] lg:bottom-[24%] xl:bottom-[33%] 2xl:bottom-[40%]"
          src={sunI}
          alt={'sun'}
        />
        <Image
          ref={cloud1}
          className="absolute left-[60%] top-[5%] z-0 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          src={c1}
          alt={'cloud1'}
        />
        <Image
          ref={cloud2}
          className="absolute left-[10%] top-[30%] z-0 w-[30%] sm:w-[20%] md:top-[25%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          src={c2}
          alt={'cloud2'}
        />
        <Image
          ref={cloud3}
          className="absolute left-[60%] top-[15%] z-0 w-[30%] sm:w-[20%] md:left-[35%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          src={c3}
          alt={'cloud3'}
        />
        <Image
          ref={cloud4}
          className="absolute left-[80%] top-[30%] z-0 w-[30%] sm:w-[20%] md:top-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          src={c4}
          alt={'cloud4'}
        />
        <Image
          ref={cloud5}
          className="absolute bottom-[35%] left-[52%] z-20 w-[20%] sm:left-[80%] sm:w-[15%] md:bottom-[40%] md:left-[90%] md:w-[10%] lg:bottom-[50%] lg:w-[20%] 2xl:bottom-[60%] 2xl:w-[8%]"
          src={c5}
          alt={'clound5'}
        />
        <Image
          ref={cloud6}
          className="absolute top-20 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[8%]"
          src={c6}
          alt={'cloud6'}
        />
        <div
          ref={copy}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center md:top-[45%] 2xl:z-20"
        >
          <h1 className="font-pressstart2p text-stroke z-10 inline-block bg-gradient-to-b from-orange-200 to-orange-600 bg-clip-text text-4xl text-transparent drop-shadow-3xlb sm:text-6xl sm:drop-shadow-4xlb md:text-7xl 2xl:text-9xl 2xl:drop-shadow-5xlb">
            STRESS IS
          </h1>
          <h1 className="font-pressstart2p text-stroke z-10 mt-2 inline-block bg-gradient-to-b from-orange-200 to-orange-600 bg-clip-text text-4xl text-transparent drop-shadow-3xlb sm:text-6xl sm:drop-shadow-4xlb md:text-7xl 2xl:text-9xl 2xl:drop-shadow-5xlb">
            STRESSFUL
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Parallax
