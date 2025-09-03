// app/api/search/route.ts

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''

  try {
    const res = await fetch(`http://localhost:10004/wp-json/wp/v2/search?search=${encodeURIComponent(query)}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('خطا در اتصال به وردپرس:', err)
    return NextResponse.json({ error: 'مشکل در دریافت اطلاعات' }, { status: 500 })
  }
}
