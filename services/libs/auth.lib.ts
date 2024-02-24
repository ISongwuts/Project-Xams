import { users } from "@prisma/client"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server"

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)
const algorithm: string = process.env.PROTECT_ALG || 'HS256'

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
                 .setProtectedHeader({ alg: algorithm})
                 .setIssuedAt()
                 .setExpirationTime('12 hours from now')
                 .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, { algorithms: [algorithm]})
    return payload
}

export async function login(formData: users | any) {
    const expires = new Date(Date.now() + 43200 * 1000)
    const session = await encrypt
    
    (formData) 
    console.log(expires.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))
    cookies().set('session', session, { expires, httpOnly: true})
}

export function logout() {
    cookies().set('session', '', { expires: new Date(0)})
}

export async function getSession(): Promise<any> {
    const session = cookies().get('session')?.value
    if(!session) return null
    else return await decrypt(session)
}

export async function updateSession(req: NextRequest) {
    const session = cookies().get('session')?.value
    if(!session) return
    else {
        const decryptSession = await decrypt(session)
        const response = NextResponse.next()
        response.cookies.set({
            name: 'session',
            value: await encrypt(decrypt),
            expires: decryptSession.expires,
            httpOnly: true
        })
        return response
    }
}