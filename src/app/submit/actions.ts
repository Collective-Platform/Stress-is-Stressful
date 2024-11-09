'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function submitStress(stress: string, name: string) {
  if (!stress.trim() || !name.trim()) {
    throw new Error('Stress and name are required')
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('stress_submissions')
    .insert([{ stress, name }])

  if (error) {
    throw new Error('Failed to submit stress')
  }

  redirect('/stresswall')
}
