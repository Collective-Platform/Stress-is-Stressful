'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitStress(stress: string, name: string) {
  if (!stress.trim() || !name.trim()) {
    throw new Error('Stress and name are required')
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stress_submissions')
    .insert([{ name, stress }])
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert failed:', error)
    throw new Error('Failed to submit stress')
  }

  return data.id as number
}
