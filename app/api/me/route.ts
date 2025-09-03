import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET() {
  const token = (await cookies()).get('wp-token')?.value

  if (!token) return NextResponse.json({ error: 'توکن پیدا نشد' }, { status: 401 })
console.log(token)

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'توکن نامعتبره' }, { status: 401 })
  }
}