'use client'

import { createClient } from '@/lib/supabase/client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

import { Submission as BaseSubmission } from './types'

interface Submission extends BaseSubmission {
  hasReacted: boolean
}

interface ClientSideContentProps {
  initialSubmissions: BaseSubmission[] | null
}

type ReactedSubmissions = Record<number, boolean>

export default function ClientSideContent({
  initialSubmissions,
}: ClientSideContentProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(() =>
    (initialSubmissions ?? []).map((s) => ({
      ...s,
      hasReacted: false,
    })),
  )

  // Use useRef to store the Supabase client
  const supabaseRef = useRef(createClient())

  useEffect(() => {
    const supabase = supabaseRef.current


    // Load reactions from local storage on initial render
    const storedReactions = localStorage.getItem('reactedSubmissions')
    const reactedSubmissions: ReactedSubmissions = storedReactions
      ? (JSON.parse(storedReactions) as ReactedSubmissions)
      : {}

    setSubmissions((previous) =>
      previous.map((submission) => ({
        ...submission,
        hasReacted: Boolean(reactedSubmissions[submission.id]),
      })),
    )

    const channel = supabase
      .channel('stress_submissions_changes')

      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'stress_submissions' },
        (payload) => {
          const newSubmission = payload.new as Submission
          console.log('New submission received:', newSubmission)
          setSubmissions((currentSubmissions) => [
            newSubmission,
            ...currentSubmissions,
          ])
        },
      )

      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'stress_submissions' },
        (payload) => {
          const updatedSubmission = payload.new as Submission
          console.log('Updated submission received:', updatedSubmission)

          setSubmissions((previous) =>
            previous.map((submission) =>
              submission.id === updatedSubmission.id
                ? { ...submission, prayers: updatedSubmission.prayers }
                : submission,
            ),
          )
        },
      )

      .subscribe((status) => {
        console.log('Realtime subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel).catch((error: unknown) => {
        console.error('Error removing channel:', error)
      })
    }

  }, [])

  const handlePrayerClick = async (submission: Submission) => {
    const isReacted = submission.hasReacted
    const newPrayersCount = isReacted
      ? submission.prayers - 1
      : submission.prayers + 1

    // Update submissions state optimistically
    setSubmissions((previous) =>
      previous.map((s) =>
        s.id === submission.id
          ? { ...s, hasReacted: !isReacted, prayers: newPrayersCount }
          : s,

      ),
    )

    try {
      // Update the database

      const { error } = await supabaseRef.current
        .from('stress_submissions')
        .update({ prayers: newPrayersCount })
        .eq('id', submission.id)

      if (error) throw error

      // Update local storage if database update succeeds
      const storedReactions = localStorage.getItem('reactedSubmissions')
      const reactedSubmissions: ReactedSubmissions = storedReactions
        ? (JSON.parse(storedReactions) as ReactedSubmissions)
        : {}

      if (isReacted) {

        const { [submission.id]: _, ...rest } = reactedSubmissions

        localStorage.setItem('reactedSubmissions', JSON.stringify(rest))
      } else {
        localStorage.setItem(
          'reactedSubmissions',

          JSON.stringify({ ...reactedSubmissions, [submission.id]: true }),

        )
      }
    } catch (error) {
      console.error('Error updating prayer count:', error)

      setSubmissions((previous) =>
        previous.map((s) =>
          s.id === submission.id
            ? {
                ...submission,
                hasReacted: isReacted,
                prayers: submission.prayers,
              }
            : s,

        ),
      )
    }
  }

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
              {submissions.map((submission) => (
                <div
                  className="border-b border-gray-200 pb-2"
                  key={submission.id}
                >
                  <p className="text-xs font-medium">{submission.stress}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="mt-1 text-[8px] text-gray-500">
                      {submission.name}
                    </p>
                    <button

                      className={cn(
                        'flex items-center justify-center rounded-lg border px-2 py-1',
                        submission.hasReacted
                          ? 'border-blue-500'
                          : 'border-gray-200',
                      )}
                      onClick={() => void handlePrayerClick(submission)}

                    >
                      <span className="ml-1 text-xs"></span>
                      <span className="text-sm">🙏</span>
                      <span className="ml-1 text-xs">{submission.prayers}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
