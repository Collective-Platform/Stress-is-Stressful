'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import room from '@/images/room.gif'
import truck from '@/images/truck.gif'
import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { submitStress } from './actions'

export default function SubmitYourStress() {
  const [stressInput, setStressInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isAnonymous) {
      setNameInput('Anonymous')
    } else {
      setNameInput('')
    }
  }, [isAnonymous])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight.toString()}px`
    }
  }, [stressInput])

  const submitStressAsync = useCallback(async () => {
    const submittedName = isAnonymous ? 'Anonymous' : nameInput
    try {
      await Promise.all([
        submitStress(stressInput, submittedName),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ])
    } catch (error) {
      console.error('Error submitting stress:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isAnonymous, nameInput, stressInput])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setIsLoading(true)
    void submitStressAsync()
  }

  if (isLoading) {
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

  return (
    <main className="flex flex-shrink-0 flex-grow flex-col bg-gradient-to-br from-light-blue to-dark-blue md:flex-row">
      <div className="flex w-full flex-col items-center p-6 pb-0 md:w-1/2 md:items-start md:justify-center lg:p-[5%]">
        <h1 className="font-pressstart2p text-stroke z-10 mt-7 inline-block bg-gradient-to-b from-oren-1 to-oren-3 bg-clip-text text-4xl leading-tight text-transparent drop-shadow-3xlo sm:text-6xl sm:drop-shadow-3xlo md:text-4xl lg:text-5xl lg:leading-tight lg:drop-shadow-4xlo 2xl:text-7xl 2xl:drop-shadow-5xlo">
          What&apos;s Stressing You Out?
        </h1>
        <Image
          className="w-full content-center"
          src={room}
          alt={'a gif of a room'}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center pb-10 pl-6 pr-6 md:w-1/2 lg:p-[5%]">
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <textarea
            ref={textareaRef}
            className="block max-h-[256px] min-h-[128px] w-full resize-none overflow-y-auto text-wrap rounded-2xl bg-light-blue p-5 font-mono text-xs text-oren-1"
            placeholder="Things that's stressing me out..."
            value={stressInput}
            onChange={(e) => {
              setStressInput(e.target.value)
            }}
          />
          <input
            className={
              isAnonymous
                ? 'hidden'
                : 'mt-2 h-5 w-full rounded-2xl bg-light-blue p-5 font-mono text-xs text-oren-1'
            }
            placeholder="Name"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value)
            }}
            disabled={isAnonymous}
          />
          <div className="mt-5 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help p-1">
                    <HelpCircle size={24} className="text-oren-1" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-[8px]">
                  <p>Your name won&apos;t be recorded in our book.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Label htmlFor="Anonymous" className="ml-2 text-xs text-oren-1">
              Anonymous
            </Label>
            <Switch
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
              className="ml-2"
            />
          </div>
          <button
            type="submit"
            className="mt-5 w-full content-center justify-center rounded-2xl bg-light-blue p-4 text-xs text-oren-1 hover:bg-dark-blue"
          >
            TOSS IT IN THE TRASH
          </button>
        </form>
      </div>
    </main>
  )
}
