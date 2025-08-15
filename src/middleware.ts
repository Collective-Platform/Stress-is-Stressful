import { geolocation } from '@vercel/functions' // Correct import
import { type NextRequest, NextResponse } from 'next/server'

interface GeoData {
  flag: string | undefined
}

export function middleware(request: NextRequest) {
  const geoFunction = geolocation as (req: NextRequest) => GeoData
  const geo = geoFunction(request)

  const flag = geo.flag ?? ' '

  const response = NextResponse.next()
  response.headers.set('x-user-flag', flag)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
