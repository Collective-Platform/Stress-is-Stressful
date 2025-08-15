import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface GeoIPData {
  city: null | string
  countryCode: null | string
  region: null | string
}

interface SupabaseLocation {
  city?: string
  country?: string
  region?: string
}

serve((req: Request) => {
  const locationHeader = req.headers.get('x-supabase-edge-location')

  let parsedLocation: SupabaseLocation = {}

  try {
    if (locationHeader) {
      parsedLocation = JSON.parse(locationHeader) as SupabaseLocation
    }
  } catch (error) {
    console.error('Failed to parse location header:', error)
  }

  const data: GeoIPData = {
    city: parsedLocation.city ?? null,
    countryCode: parsedLocation.country ?? null,
    region: parsedLocation.region ?? null,
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
})
