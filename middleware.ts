import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Client-side auth handles protection for now.
    // We can re-introduce server-side protection later with Firebase Admin if needed.
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'],
}
