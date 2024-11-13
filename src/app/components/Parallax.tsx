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

  const parallaxReference = useRef(null)
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
    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          end: '5000 bottom',
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20))
          },
          pin: true,
          scrub: 0.5,
          start: 'top top',
          trigger: parallaxReference.current,
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
      context.revert()
    }
  }, [])

  return (
    <div className="relative z-0 h-screen overflow-hidden bg-oren-4">
      <div className="relative h-[110vh] w-full">
        <Image
          alt={'mountain3'}
          className="absolute bottom-[9%] z-10 w-full"
          ref={mountain3}
          src={m3}
        />
        <Image
          alt={'mountain2'}
          className="absolute bottom-[9%] z-20 w-full"
          ref={mountain2}
          src={m2}
        />
        <Image
          alt={'mountain1'}
          className="absolute bottom-[9%] z-30 w-full"
          ref={mountain1}
          src={m1}
        />
        <Image
          alt={'sun'}
          className="absolute bottom-[18%] left-[50%] z-0 w-[25%] sm:bottom-[20%] sm:w-[20%] md:bottom-[23%] md:left-[53%] lg:bottom-[24%] xl:bottom-[33%] 2xl:bottom-[40%]"
          ref={sun}
          src={sunI}
        />
        <Image
          alt={'cloud1'}
          className="absolute left-[60%] top-[5%] z-0 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          ref={cloud1}
          src={c1}
        />
        <Image
          alt={'cloud2'}
          className="absolute left-[10%] top-[30%] z-0 w-[30%] sm:w-[20%] md:top-[25%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          ref={cloud2}
          src={c2}
        />
        <Image
          alt={'cloud3'}
          className="absolute left-[60%] top-[15%] z-0 w-[30%] sm:w-[20%] md:left-[35%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          ref={cloud3}
          src={c3}
        />
        <Image
          alt={'cloud4'}
          className="absolute left-[80%] top-[30%] z-0 w-[30%] sm:w-[20%] md:top-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[10%]"
          ref={cloud4}
          src={c4}
        />
        <Image
          alt={'clound5'}
          className="absolute bottom-[35%] left-[52%] z-20 w-[20%] sm:left-[80%] sm:w-[15%] md:bottom-[40%] md:left-[90%] md:w-[10%] lg:bottom-[50%] lg:w-[20%] 2xl:bottom-[60%] 2xl:w-[8%]"
          ref={cloud5}
          src={c5}
        />
        <Image
          alt={'cloud6'}
          className="absolute top-20 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[20%] 2xl:w-[8%]"
          ref={cloud6}
          src={c6}
        />
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center md:top-[45%] 2xl:z-20"
          ref={copy}
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
