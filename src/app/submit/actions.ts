'use server'

import { supabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'

export async function submitStress(stress: string, name: string) {
  const { error } = await supabase
    .from('stress_submissions')
    .insert([{ stress, name }])

  if (error) {
    throw new Error('Failed to submit stress')
  }

  redirect('/content')
}
