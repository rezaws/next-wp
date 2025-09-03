import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()

  if (!res.ok || !data.token) {
    return NextResponse.json({ error: 'ورود ناموفق' }, { status: 401 })
  }

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/wp/v2/users/me`, {
    headers: { Authorization: `Bearer ${data.token}` },
  })
  
  const user = await userRes.json()

  const payload = {
    id: user.id,
    name: user.name,
    slug: user.slug,
    email: data.user_email
  }

  const customToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });

  (await cookies()).set({
    name: 'wp-token',
    value: customToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  })

  return NextResponse.json({ success: true })
}