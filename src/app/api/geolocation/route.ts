import { geolocation } from '@vercel/functions'
import { NextRequest } from 'next/server'

interface GeoData {
  flag: string | undefined
}

export function GET(request: NextRequest) {
  const geoFunction = geolocation as (req: NextRequest) => GeoData
  const details = geoFunction(request)
  return Response.json(details.flag)
}
