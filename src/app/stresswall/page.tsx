import { createClient } from '@/lib/supabase/server'
import ClientSideContent from './ClientSideContent'

interface Submission {
  id: number
  stress: string
  name: string
  prayers: number
  hasReacted?: boolean
}

export const dynamic = 'force-dynamic'

async function getSubmissions() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stress_submissions')
    .select('id, stress, name, prayers')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching submissions:', error)
    return null
  }

  return data as Submission[]
}

export default async function ContentPage() {
  const initialSubmissions = await getSubmissions()

  return <ClientSideContent initialSubmissions={initialSubmissions} />
}
