'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

interface Submission {
  id: number
  stress: string
  name: string
}

export default function ClientSideContent({
  initialSubmissions,
}: {
  initialSubmissions: Submission[] | null
}) {
  const [submissions, setSubmissions] = useState<Submission[]>(
    initialSubmissions || [],
  )
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel('stress_submissions_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'stress_submissions' },
        (payload) => {
          console.log('New submission received:', payload.new)
          setSubmissions((currentSubmissions) => [
            payload.new as Submission,
            ...currentSubmissions,
          ])
        },
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel).catch((error: unknown) => {
        console.error(error)
      })
    }
  }, [supabase])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-dark-blue to-light-blue p-8">
      <div className="md:flex md:rounded-3xl md:bg-oren-1 lg:w-[80%]">
        <div className="self-center rounded-t-3xl bg-oren-1 p-6 md:w-[50%]">
          <h1 className="mb-4 text-[24px] font-bold text-dark-blue mb:text-[32px] lg:text-[44px]">
            You Are Not Alone
          </h1>
          <p className="m-auto text-xs leading-5 text-dark-blue">
            When you step out, you&apos;ll realise you&apos;re not the only one
            struggling. We&apos;re meant to walk with each other in this life.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <a href="https://ig.me/m/strictlystudents" target="_blank">
              <button className="rounded-xl border-2 border-solid border-dark-blue bg-oren-3 p-2 text-center text-dark-blue">
                Talk to Someone
              </button>
            </a>
          </div>
        </div>
        <div className="rounded-b-3xl bg-white p-6 text-dark-blue shadow-lg md:m-2 md:h-[90vh] md:w-[50%] md:overflow-y-auto md:rounded-3xl md:bg-white md:p-5 md:text-dark-blue">
          {submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <div className="space-y-4">
              {/* <h1>What's Stressing Others Out?</h1> */}
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border-b border-gray-200 pb-2"
                >
                  <p className="text-xs font-medium">{submission.stress}</p>
                  <p className="mt-1 text-[8px] text-gray-500">
                    {submission.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
