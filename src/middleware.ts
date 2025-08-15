import { geolocation } from '@vercel/functions' // Correct import
import { type NextRequest, NextResponse } from 'next/server'

interface GeoData {
  country?: string
  flag?: string
}

export function middleware(request: NextRequest) {
  const geoFunction = geolocation as (req: NextRequest) => GeoData
  const geo = geoFunction(request)

  const country =
    geo.country ?? (process.env.NODE_ENV === 'development' ? 'unknown' : ' ')
  console.log('Geo data:', geo)

  const response = NextResponse.next()

  if (country) {
    response.headers.set('x-user-flag', country)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
