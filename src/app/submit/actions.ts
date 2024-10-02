'use server'

import { supabase } from '@/lib/supabaseClient'

export async function submitStress(stress: string, name: string) {
  const { error } = await supabase
    .from('stress_submissions')
    .insert([{ stress, name }])

  if (error) {
    throw new Error('Failed to submit stress')
  }
}
