// app/api/register/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.json()

  const { username, email, password } = formData

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'همه‌ی فیلدها الزامی هستن' }, { status: 400 })
  }

  try {
    const res = await fetch('http://localhost:10010/wp-json/gholly/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'خطا در ثبت‌نام' }, { status: res.status })
    }

    return NextResponse.json({
      message: 'ثبت‌نام موفق!',
      user_id: data.user_id,
      username: data.username,
      email: data.email
    })

  } catch (error) {
    console.error('خطا در اتصال به وردپرس:', error)
    return NextResponse.json({ error: 'خطای سرور یا اتصال ناموفق' }, { status: 500 })
  }
}
