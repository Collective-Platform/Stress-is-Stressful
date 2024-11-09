'use client'

import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import room from '@/images/room.gif'
import truck from '@/images/truck.gif'
import { cn } from '@/lib/utils'
import * as Form from '@radix-ui/react-form'
import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { submitStress } from './actions'

export default function SubmitYourStress() {
  const [formData, setFormData] = useState({
    isAnonymous: false,
    nameInput: '',
    stressInput: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const textareaReference = useRef<HTMLTextAreaElement>(null)
  const nameInputReference = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((previousState) => ({
        ...previousState,
        [name]: value,
      }))
      setIsInvalid(false)
    },
    [],
  )

  const handleSwitchChange = useCallback((checked: boolean) => {
    setFormData((previousState) => ({
      ...previousState,
      isAnonymous: checked,
      nameInput: checked ? 'Anonymous' : '',
    }))
  }, [])

  useEffect(() => {
    if (textareaReference.current) {
      textareaReference.current.style.height = 'auto'
      textareaReference.current.style.height = `${textareaReference.current.scrollHeight.toString()}px`
    }
  }, [formData.stressInput])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if ((event.target as HTMLFormElement).checkValidity()) {
      setIsLoading(true)
      Promise.all([
        submitStress(
          formData.stressInput,
          formData.isAnonymous ? 'Anonymous' : formData.nameInput,
        ),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ])
        .then(() => {
          setIsLoading(false)
          setIsInvalid(false)

          setFormData({
            isAnonymous: false,
            nameInput: '',
            stressInput: '',
          })
        })
        .catch((error: unknown) => {
          console.error('Error submitting stress:', error)
          setIsLoading(false)
          setIsInvalid(false)
        })
    } else {
      setIsInvalid(true)

      if (textareaReference.current) {
        textareaReference.current.blur()
      }
      if (nameInputReference.current) {
        nameInputReference.current.blur()
      }
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  }

  if (isLoading) {
    return (
      <main className="h-screen bg-gradient-to-br from-dark-blue to-light-blue">
        <div className="flex flex-col items-center py-[40vh] align-middle">
          <div className="align-middle">
            <Image
              alt={'truck'}
              className="w-[200px] lg:w-[300px] 2xl:w-[20vw]"
              src={truck}
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
          alt={'a gif of a room'}
          className="w-full content-center"
          src={room}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center pb-10 pl-6 pr-6 md:w-1/2 lg:p-[5%]">
        <Form.Root
          className="flex w-full flex-col"
          noValidate
          onSubmit={handleSubmit}
        >
          <Form.Field name="stressInput">
            <Form.Control asChild>
              <textarea
                className={cn(
                  'block max-h-[256px] min-h-[128px] w-full resize-none overflow-y-auto text-wrap rounded-2xl bg-light-blue p-5 font-mono text-xs',
                  isInvalid &&
                    'invalid:animate-shake invalid:border-[1px] invalid:border-oren-3 invalid:placeholder-oren-3',
                  'text-oren-1',
                )}
                id="stressInput"
                name="stressInput"
                onChange={handleChange}
                placeholder="Things that's stressing me out..."
                ref={textareaReference}
                required
                value={formData.stressInput}
              />
            </Form.Control>
          </Form.Field>

          {!formData.isAnonymous && (
            <Form.Field name="nameInput">
              <Form.Control asChild>
                <input
                  className={cn(
                    `mt-2 h-5 w-full rounded-2xl bg-light-blue p-5 font-mono text-xs`,
                    isInvalid &&
                      'invalid:animate-shake invalid:border-[1px] invalid:border-oren-3 invalid:placeholder-oren-3',
                    'text-oren-1',
                  )}
                  disabled={formData.isAnonymous}
                  id="nameInput"
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  value={formData.nameInput}
                />
              </Form.Control>
            </Form.Field>
          )}

          <Form.Field name="anonymousSwitch">
            <div className="mt-5 flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help p-1">
                      <HelpCircle className="text-oren-1" size={24} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-[8px]">
                    <p>Your name won&apos;t be recorded in our book.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Form.Label
                className="ml-2 text-xs text-oren-1"
                htmlFor="anonymousSwitch"
              >
                Anonymous
              </Form.Label>
              <Switch
                checked={formData.isAnonymous}
                className="ml-2"
                id="anonymousSwitch"
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <button
              className="mt-5 w-full content-center justify-center rounded-2xl bg-light-blue p-4 text-xs text-oren-1 hover:bg-dark-blue"
              type="submit"
            >
              TOSS IT IN THE TRASH
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  )
}
