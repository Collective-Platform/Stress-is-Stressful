'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

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
  const supabase = createClient()

  useEffect(() => {
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
  }, [supabase])

  const handlePrayerClick = async (submissionId: number) => {
    const currentSubmission = submissions.find(
      (submission) => submission.id === submissionId,
    )
    if (!currentSubmission) return

    const isReacted = currentSubmission.hasReacted
    const newPrayersCount = isReacted
      ? currentSubmission.prayers - 1
      : currentSubmission.prayers + 1

    setSubmissions((previous) =>
      previous.map((submission) =>
        submission.id === submissionId
          ? { ...submission, hasReacted: !isReacted, prayers: newPrayersCount }
          : submission,
      ),
    )

    try {
      // Update the database
      const { error } = await supabase
        .from('stress_submissions')
        .update({ prayers: newPrayersCount })
        .eq('id', submissionId)

      if (error) throw error

      // Update local storage if database update succeeds
      const storedReactions = localStorage.getItem('reactedSubmissions')
      const reactedSubmissions: ReactedSubmissions = storedReactions
        ? (JSON.parse(storedReactions) as ReactedSubmissions)
        : {}

      if (isReacted) {
        //type assertion added here
        const { [submissionId]: _, ...rest } = reactedSubmissions as Record<
          number,
          boolean
        >
        localStorage.setItem('reactedSubmissions', JSON.stringify(rest))
      } else {
        localStorage.setItem(
          'reactedSubmissions',
          JSON.stringify({ ...reactedSubmissions, [submissionId]: true }),
        )
      }
    } catch (error) {
      console.error('Error updating prayer count:', error)

      //Revert optimistic update on error
      setSubmissions((previous) =>
        previous.map((submission) =>
          submission.id === submissionId
            ? {
                ...submission,
                hasReacted: isReacted,
                prayers: currentSubmission.prayers,
              }
            : submission,
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
                      className={`flex items-center justify-center rounded-lg border px-2 py-1 ${
                        submission.hasReacted
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                      onClick={() => void handlePrayerClick(submission.id)}
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
