'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import PopUp from '../components/PopUp'

export default function PopUpTrigger() {
  const searchParams = useSearchParams()
  const submissionId = [...searchParams.keys()][0]

  const [aiResponse, setAiResponse] = useState<null | string>(null)
  const [loadingAI, setLoadingAI] = useState(true)

  useEffect(() => {
    if (!submissionId) return

    const fetchAI = async () => {
      try {
        setLoadingAI(true)

        const res = await fetch(`/api/ai-response?submissionId=${submissionId}`)
        if (!res.ok) throw new Error('AI request failed')

        const data = (await res.json()) as { error?: string; text: string }

        setAiResponse(data.text)
      } catch (error) {
        console.error(error)
        setAiResponse('Sorry, we couldn’t prepare your letter.')
      } finally {
        setLoadingAI(false)
      }
    }

    void fetchAI()
  }, [submissionId])

  return <>{loadingAI ? <></> : <PopUp aiResponse={aiResponse} />}</>
}
