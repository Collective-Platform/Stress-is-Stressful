import { createClient } from '@/lib/supabase/server'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const submissionId = searchParams.get('submissionId')

  if (!submissionId) {
    return NextResponse.json(
      { error: 'submissionId is required' },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('test_stress_submissions')
    .select('stress, ai_response')
    .eq('id', submissionId)
    .single()

  if (error) {
    console.error('Supabase fetch error:', error)
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  let aiResponse = data.ai_response as null | string

  if (!aiResponse) {
    const response = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `The user has shared the following text about their stress: ${data.stress as string}

      Your task is to generate a single, empathetic, and validating response that acknowledges the user's feelings and invites them to continue the conversation with us.

      So you are the intermediate step between the user and a human listener. You want to make the user feel heard and understood, and encourage them to open up more.

      If the user has not shared any relevant stress, respond with: "Hey, I'm here for you if you want to share more about what's been going on."

      The response should:
      1. Start with a friendly greeting.
      2. Be warm and non-judgmental.
      3. Acknowledge the core feeling (e.g., overwhelmed, exhausted, sad) without analyzing or summarizing their entire message.
      4. End with a simple, open invitation to talk more.
      5. Sound like a genuine, compassionate message from a supportive listener.
      6. The final output should be suitable to appear next to a "I want to talk to someone" button.

      Example Output: "Hey, I'm here for you if you want to share more about what's been going on."`,
    })

    console.log('AI response:', response.text)

    aiResponse = response.text

    const { error: insertError } = await supabase
      .from('test_stress_submissions')
      .update({ ai_response: aiResponse })
      .eq('id', submissionId)

    if (insertError) {
      console.error('Supabase insert error:', insertError)
    }
  }

  return NextResponse.json({ text: aiResponse })
}
