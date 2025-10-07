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

  const [loading, setLoading] = useState<Record<number, boolean>>({})
  const supabaseRef = useRef(createClient())

  useEffect(() => {
    const supabase = supabaseRef.current

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
        { event: 'INSERT', schema: 'public', table: 'test_stress_submissions' },
        (payload) => {
          const newSubmission = payload.new as Submission
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
          setSubmissions((previous) =>
            previous.map((submission) =>
              submission.id === updatedSubmission.id
                ? { ...submission, prayers: updatedSubmission.prayers }
                : submission,
            ),
          )
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel).catch((error: unknown) => {
        console.error('Error removing channel:', error)
      })
    }
  }, [])

  const handlePrayerClick = async (submission: Submission) => {
    if (loading[submission.id]) return

    setLoading((prev) => ({ ...prev, [submission.id]: true }))

    const isReacted = submission.hasReacted
    const newPrayersCount = isReacted
      ? Math.max(submission.prayers - 1, 0) // Prevent negative prayers count
      : submission.prayers + 1

    setSubmissions((previous) =>
      previous.map((s) =>
        s.id === submission.id
          ? { ...s, hasReacted: !isReacted, prayers: newPrayersCount }
          : s,
      ),
    )

    try {
      const { error } = await supabaseRef.current
        .from('stress_submissions')
        .update({ prayers: newPrayersCount })
        .eq('id', submission.id)

      if (error) throw error

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
    } finally {
      // Add a brief delay to handle consecutive clicks on the prayer button smoothly.
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, [submission.id]: false }))
      }, 100)
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
            When you step out, you&apos;ll realize you&apos;re not the only one
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
            <p className="text-center text-gray-500">
              No submissions yet. Share your thoughts to appear here!
            </p>
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
                      disabled={loading[submission.id]}
                      onClick={() => void handlePrayerClick(submission)}
                    >
                      <span className="text-sm">🙏</span>
                      {submission.prayers > 0 && (
                        <span className="ml-1 text-xs">
                          {submission.prayers}
                        </span>
                      )}
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
