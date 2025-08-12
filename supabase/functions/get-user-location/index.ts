import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface GeoIPData {
  city: null | string
  countryCode: null | string
  region: null | string
}

Deno.serve((req: Request) => {
  const locationHeader = req.headers.get('x-supabase-edge-location')

  let location: Partial<GeoIPData> = {}

  try {
    location = locationHeader
      ? (JSON.parse(locationHeader) as Partial<GeoIPData>)
      : {}
  } catch (error) {
    console.error('Failed to parse location header:', error)
  }

  const data: GeoIPData = {
    city: location.city ?? null,
    countryCode: location.countryCode ?? null,
    region: location.region ?? null,
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
})
