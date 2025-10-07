'use client'

import { gsap } from 'gsap'
import { SendHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function PopUp({ aiResponse }: { aiResponse: null | string }) {
  const [popup, setPopup] = useState(true) // overlay visible
  const [opened, setOpened] = useState(false) // letter open inside overlay

  const largeEnvelopeRef = useRef<HTMLImageElement | null>(null)
  const smallEnvelopeRef = useRef<HTMLImageElement | null>(null)
  const letterWrapperRef = useRef<HTMLDivElement | null>(null)

  const bounceTl = useRef<gsap.core.Timeline | null>(null)

  const killBounceAndReset = (ref?: HTMLElement | null) => {
    bounceTl.current?.kill()
    bounceTl.current = null
    if (ref) gsap.set(ref, { clearProps: 'all' })
  }

  const startBounce = useCallback((el: HTMLElement, height = -10) => {
    killBounceAndReset(el)
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    tl.to(el, { duration: 0.4, ease: 'power2.out', y: height })
      .to(el, { duration: 0.4, ease: 'bounce.out', y: 0 })
      .to(el, { duration: 0.2, ease: 'power1.inOut', scale: 0.98 })
      .to(el, { duration: 0.2, ease: 'power1.inOut', scale: 1 })
    bounceTl.current = tl
  }, [])

  useEffect(() => {
    killBounceAndReset(largeEnvelopeRef.current)
    killBounceAndReset(smallEnvelopeRef.current)

    if (popup && !opened) {
      const el = largeEnvelopeRef.current
      if (!el) return

      gsap.set(el, { clearProps: 'all' })
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1, x: '100vw', y: 0 },
        {
          duration: 1,
          ease: 'power3.out',
          onComplete() {
            startBounce(el, -15)
          },
          opacity: 1,
          x: 0,
        },
      )
      return
    }

    if (!popup) {
      const el = smallEnvelopeRef.current
      if (!el) return
      gsap.set(el, { clearProps: 'all' })
      startBounce(el, -10)
      return
    }
  }, [popup, opened, startBounce])

  useEffect(() => {
    if (!opened) return
    killBounceAndReset(largeEnvelopeRef.current)

    if (letterWrapperRef.current) {
      gsap.fromTo(
        letterWrapperRef.current,
        { opacity: 0, scale: 0.8 },
        { duration: 0.6, ease: 'back.out(1.7)', opacity: 1, scale: 1 },
      )
    }
  }, [opened])

  const handleEnvelopeMouseEnter = () => {
    bounceTl.current?.pause()
  }
  const handleEnvelopeMouseLeave = () => {
    bounceTl.current?.resume()
  }

  return (
    <>
      {popup ? (
        <div
          className="absolute flex h-full w-full items-center justify-center backdrop-blur-sm backdrop-brightness-50"
          onClick={() => {
            setPopup(false)
            setOpened(false)
          }}
        >
          <div
            className="cursor-pointer absolute flex h-auto w-auto items-center justify-center text-sm text-black"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex h-screen items-center justify-center bg-gradient-to-br px-6">
              {opened ? (
                <div
                  className="items-left relative flex h-[600px] w-[450px] flex-col justify-center"
                  ref={letterWrapperRef}
                >
                  <Image
                    alt="Letter"
                    className="h-full w-full object-contain"
                    fill={true}
                    priority
                    src="/images/letter.png"
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-between gap-10 overflow-y-auto text-left mb:mx-10 mb:my-[120px] ip:mx-14 ip:my-20 sm:mx-16 sm:my-14">
                    <p className="max-h-min text-sm text-gray-800">
                      &quot;
                      {aiResponse ?? "There's no message to display right now."}
                      &quot;
                    </p>
                    <div className="flex w-full flex-col items-center">
                      <a
                        className="hover:bg-dark-e flex w-full content-center items-center justify-center gap-2 rounded-xl border-2 border-solid border-dark-blue bg-oren-3 p-2 text-center text-xs text-dark-blue hover:text-oren-1"
                        href="https://ig.me/m/strictlystudents?text=Hey%20can%20i%20know%20who%20u%20are"
                      >
                        I want to talk to someone <SendHorizontal />
                      </a>
                      <button
                        className="cursor-pointer w-full content-center justify-center rounded-2xl p-4 text-center text-xs text-oren-3 hover:text-dark-blue"
                        onClick={() => {
                          setPopup(false)
                          setOpened(false)
                        }}
                      >
                        See what others are going through
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hover:cursor-pointer flex flex-col items-center justify-center space-y-6">
                  <Image
                    alt="Picture of envelope"
                    className="h-auto w-60"
                    height={600}
                    onClick={() => {
                      setOpened(true)
                    }}
                    onMouseEnter={handleEnvelopeMouseEnter}
                    onMouseLeave={handleEnvelopeMouseLeave}
                    ref={largeEnvelopeRef}
                    src="/images/envelope.png"
                    width={600}
                  />
                  <h2 className="text-xs text-oren-2">Click Me!</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="hover:cursor-pointer fixed bottom-4 right-4 z-40 flex flex-col items-center justify-center space-y-2"
            onClick={() => {
              setPopup(true)
              setOpened(true)
            }}
          >
            <Image
              alt="Picture of an envelope"
              className="h-auto w-16"
              height={600}
              onMouseEnter={handleEnvelopeMouseEnter}
              onMouseLeave={handleEnvelopeMouseLeave}
              ref={smallEnvelopeRef}
              src="/images/envelope.png"
              width={600}
            />
            <h2 className="text-[10px] text-oren-2">Click Me!</h2>
          </div>
        </>
      )}
    </>
  )
}
