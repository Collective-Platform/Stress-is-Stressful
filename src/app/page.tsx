'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { ReactNode, useEffect, useRef } from 'react'
import Parallax from './components/Parallax'
import Trashcan from './components/Trashcan'

interface AnimatedBlockProps {
  children: ReactNode
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({ children }) => {
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blockRef.current) {
      gsap.fromTo(
        blockRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top bottom-=10%',
            end: 'top center',
            scrub: true,
            markers: false,
          },
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
    <div ref={blockRef} className="opacity-0">
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
            You&apos;re trying to keep up with trends, but you&apos;re always
            one step behind.
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            <br />
            You scroll and scroll, but you&apos;re not sure why.
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            <br />
            You are tired, but you keep looking.
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
            Ever feel like there&apos;s more to life?
            <br />
            <br />
          </h1>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            There&apos;s a lot going on inside you that you don&apos;t always
            show others.
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            Life can get messy, but you are not alone.
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            Don&apos;t use your problems as an excuse to shut others out.
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-xs leading-6 text-oren-1 lg:w-[70%]">
            We are all just one breath away from feeling as if we&apos;re on our
            own.
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-3 lg:w-[70%]">
            &quot;When hard pressed, I cried to the Lord; he brought me into a
            spacious place. The Lord is with me; I will not be afraid...&quot;
            <br />
            <br />
          </p>
        </AnimatedBlock>
        <AnimatedBlock>
          <p className="m-auto text-left text-xs leading-6 text-oren-1 lg:w-[70%]">
            Give all your worries to God. He cares about you. Make room for God
            to work in your life.
            <br />
            <br />
          </p>
        </AnimatedBlock>
      </div>

      <Trashcan />
    </main>
  )
}
