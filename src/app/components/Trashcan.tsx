'use client'

import arrow from '@/images/Arrow 1.png'
import bin from '@/images/bin.png' // For page navigation in Next.js
import paper from '@/images/paper.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import Draggable from 'react-draggable'

const Trashcan: React.FC = () => {
  const router = useRouter() // Next.js router
  const binRef = useRef<HTMLDivElement>(null) // Reference to the bin
  const paperRef = useRef<HTMLDivElement>(null) // Reference to the paper
  // const [dragged, setDragged] = useState(false)

  const handleStop = () => {
    // Get bounding boxes for paper and bin
    const paperRect = paperRef.current?.getBoundingClientRect()
    const binRect = binRef.current?.getBoundingClientRect()

    if (paperRect && binRect) {
      // Check for collision
      const isColliding =
        paperRect.right > binRect.left &&
        paperRect.left < binRect.right &&
        paperRect.bottom > binRect.top &&
        paperRect.top < binRect.bottom

      if (isColliding) {
        // Redirect to /submit if paper is dropped in the bin
        router.push('/submit')
      }
    }
  }

  return (
    <div className="lg:items-top z-50 w-full pl-[10%] pr-[10%] align-middle">
      <div className="z-0 m-auto text-center lg:text-center">
        <h1 className="font-pressstart2p decoration-20 text-stroke z-10 block bg-gradient-to-b from-oren-1 to-oren-3 bg-clip-text text-lg text-transparent decoration-solid drop-shadow-3xlo md:text-2xl xl:text-4xl xl:leading-snug">
          ARE YOU READY TO
        </h1>
        <h1 className="font-pressstart2p decoration-20 text-stroke z-10 mt-1 block bg-gradient-to-b from-oren-1 to-oren-3 bg-clip-text text-lg leading-8 text-transparent decoration-solid drop-shadow-3xlo md:text-2xl xl:text-4xl xl:leading-snug">
          TOSS YOUR STRESS AWAY?
        </h1>
      </div>

      <div className="relative m-auto mt-10 h-[50vh] sm:mt-20 lg:w-1/2">
        <div className="flex align-top">
          <h1 className="inline-block text-[8px] text-white">Drag the paper</h1>
          <Image
            className="-ml-[5%] mt-[5%] inline-block h-10 w-auto md:-ml-[2%] md:mt-[3%]"
            src={arrow}
            alt="arrow"
          />
        </div>
        <div>
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            scale={1}
            onStop={handleStop} // Call handleStop when dragging stops
          >
            <div ref={paperRef} className="handle z-50 -mt-5 ml-5">
              <Image
                className="z-50 h-12 w-12 md:h-16 md:w-16"
                src={paper}
                alt="paper"
                draggable={false}
              />
            </div>
          </Draggable>
        </div>

        {/* Bin image */}
        <div
          ref={binRef}
          className="absolute bottom-10 right-0 z-0 h-auto flex-row content-end pr-0"
        >
          <h1 className="mb-3 text-[8px] text-white">Into the bin</h1>
          <Image
            className="z-0 m-auto h-full w-16 xl:w-20"
            src={bin}
            alt="bin"
          />
        </div>
      </div>
    </div>
  )
}

export default Trashcan
