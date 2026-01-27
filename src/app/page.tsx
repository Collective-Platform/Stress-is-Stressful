'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { ReactNode, useEffect, useRef } from 'react'

import Parallax from './components/Parallax'
import Trashcan from './components/Trashcan'

interface AnimatedBlockProperties {
  children: ReactNode
}

const AnimatedBlock: React.FC<AnimatedBlockProperties> = ({ children }) => {
  const blockReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blockReference.current) {
      gsap.fromTo(
        blockReference.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          scrollTrigger: {
            end: 'top center',
            markers: false,
            scrub: true,
            start: 'top bottom-=10%',
            trigger: blockReference.current,
          },
          y: 0,
        },
      )
    }

    return () => {
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill()
      }
    }
  }, [])

  return (
    <div className="opacity-0" ref={blockReference}>
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main className="bg-dark-blue">
      <Parallax />

      <div className="p-[10%] text-left">
        <AnimatedBlock>
          <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
            School work.
          </h1>
        </AnimatedBlock>
        <AnimatedBlock>
          <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
            Family stuff.
          </h1>
        </AnimatedBlock>
        <AnimatedBlock>
          <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
            Friend drama.
          </h1>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            <br />
            There&apos;s a lot going on inside you that you don&apos;t always
            show others.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            It&apos;s tiring to keep pretending you&apos;re okay when
            you&apos;re really not.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            You can try to numb the pain or fix the problems, but life feels
            like it&apos;s constantly fighting back.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            You fix one leak, and another bursts.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            But in the quiet moments, you feel it.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            A nagging sense that you were made for more than just surviving the
            week.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            That feeling? That is your soul waking up.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            Saint Augustine said: “Our hearts are restless until they find their
            rest in God.”
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
            Ever feel like there&apos;s more to life?
            <br />
            <br />
            <br />
          </h1>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            You&apos;re not weird. You&apos;re human. And you&apos;re not alone.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            We are all looking for a way to live that actually works.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            The world keeps us busy, but it leaves us hungry.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            Jesus explained why: &quot;...Small is the gate and narrow the road
            that leads to life, and only a few find it. &quot; (Matthew 7:14)
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            God didn&apos;t wait for us to figure things out. He knew we were
            lost, so Jesus came for us.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            He stepped into our mess to show us the life we were always meant to
            live.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            He died for our brokenness and rose to give us a life that cannot be
            taken away.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            He took on the weight of the world — and your weight — so that you
            could be free.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-3 lg:w-[70%]">
            He said: “I am the way and the truth and the life.” (John 14:6)
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-1 lg:w-[70%]">
            You&apos;ve carried this long enough. The first step to walking with
            Him is letting go of what you&apos;re holding onto.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-1 lg:w-[70%]">
            A relationship with God starts when you stop trying to be the one in
            control.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-1 lg:w-[70%]">
            Surrender isn&apos;t about giving up. It&apos;s about giving in to
            the only One strong enough to hold you together.
            <br />
            <br />
            <br />
          </p>
        </AnimatedBlock>
      </div>

      <Trashcan />
    </main>
  )
}
