
import type { NextRequest } from 'next/server'
import { getSession } from './services/libs/auth.lib'
import { setUser, useUserStore } from './services/stores/user.store'

export async function middleware(request: NextRequest) {
    const session = await getSession()
    setUser(session)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}