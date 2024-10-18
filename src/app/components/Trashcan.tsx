'use client'

import arrow from '@/images/Arrow 1.png'
import bin from '@/images/bin.png'
import lid from '@/images/lid.png'
import paper from '@/images/paper.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'

const Trashcan: React.FC = () => {
  const router = useRouter()
  const binRef = useRef<HTMLDivElement>(null)
  const paperRef = React.useRef<HTMLDivElement>(null)
  const [lidOffset, setLidOffset] = useState(0)

  const handleDrag = () => {
    const paperRect = paperRef.current?.getBoundingClientRect()
    const binRect = binRef.current?.getBoundingClientRect()

    if (paperRect && binRect) {
      const distance = Math.sqrt(
        Math.pow(
          paperRect.left +
            paperRect.width / 2 -
            (binRect.left + binRect.width / 2),
          2,
        ) +
          Math.pow(
            paperRect.top +
              paperRect.height / 2 -
              (binRect.top + binRect.height / 2),
            2,
          ),
      )

      const maxDistance = 100
      const maxOffset = 20

      if (distance < maxDistance) {
        const newOffset = maxOffset * (1 - distance / maxDistance)
        setLidOffset(newOffset)
      } else {
        setLidOffset(0)
      }
    }
  }

  const handleStop = () => {
    const paperRect = paperRef.current?.getBoundingClientRect()
    const binRect = binRef.current?.getBoundingClientRect()

    if (paperRect && binRect) {
      const isColliding =
        paperRect.right > binRect.left &&
        paperRect.left < binRect.right &&
        paperRect.bottom > binRect.top &&
        paperRect.top < binRect.bottom

      if (isColliding) {
        router.push('/submit')
      }
    }
    setLidOffset(0)
  }

  return (
    <div className="lg:items-top w-full overflow-x-clip pl-[10%] pr-[10%] align-middle">
      <div className="m-auto text-center lg:text-center">
        <h1 className="font-pressstart2p decoration-20 text-stroke block bg-gradient-to-b from-oren-1 to-oren-3 bg-clip-text text-2xl text-transparent decoration-solid drop-shadow-3xlo md:text-2xl xl:text-4xl xl:leading-snug">
          ARE YOU READY
        </h1>
        <h1 className="font-pressstart2p decoration-20 text-stroke mt-1 block bg-gradient-to-b from-oren-1 to-oren-3 bg-clip-text text-2xl leading-8 text-transparent decoration-solid drop-shadow-3xlo md:text-2xl xl:text-4xl xl:leading-snug">
          TO TOSS YOUR STRESS AWAY?
        </h1>
      </div>

      <div className="relative m-auto mt-[60px] h-[50vh] sm:mt-20 lg:w-1/2">
        <div className="flex align-top">
          <h1 className="inline-block text-[8px] text-white">Drag the paper</h1>
          <Image
            className="-ml-[5%] mt-[5%] inline-block h-10 w-auto md:-ml-[2%] md:mt-[3%]"
            src={arrow}
            alt="arrow"
          />
        </div>

        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          scale={1}
          onDrag={handleDrag}
          onStop={handleStop}
          nodeRef={paperRef}
        >
          <div ref={paperRef} className="handle absolute z-10 -mt-5 ml-5">
            <Image
              className="h-12 w-12 md:h-16 md:w-16"
              src={paper}
              alt="paper"
              draggable={false}
            />
          </div>
        </Draggable>

        <div
          ref={binRef}
          className="absolute bottom-10 right-0 h-auto flex-row content-end pr-0"
        >
          <h1 className="mb-3 text-[8px] text-white">Into the bin</h1>
          <div
            style={{
              transform: `translateY(-${lidOffset.toString()}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Image className="m-auto h-full w-16 xl:w-20" src={lid} alt="lid" />
          </div>
          <Image className="m-auto h-full w-16 xl:w-20" src={bin} alt="bin" />
        </div>
      </div>
    </div>
  )
}

export default Trashcan
