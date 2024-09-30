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
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 text-black shadow-lg">
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            <h1 className="mb-4 text-2xl font-bold">Stress Submissions</h1>
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border-b border-gray-200 pb-2"
              >
                <p className="text-sm font-medium">{submission.stress}</p>
                <p className="mt-1 text-xs text-gray-500">{submission.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
