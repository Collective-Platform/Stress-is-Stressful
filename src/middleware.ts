import { geolocation } from '@vercel/functions' // Correct import
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
   
  const geo = geolocation(request)

   
  const flag = geo.flag ?? ''

  const response = NextResponse.next()
   
  response.headers.set('x-user-flag', flag)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
