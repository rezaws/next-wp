'use client'

import Header from '../components/header'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { httpErrorMessages, wpErrorMessages } from '../lib/errors'

export default function LoginForm() {
  const [formdata, setFormdata] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormdata(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formdata.username || !formdata.password) {
      setError('همه‌ی فیلدها الزامی هستند 👑')
      setLoading(false)
      return
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    })

    const data = await res.json()

if (!res.ok) {
  const statusMessage = httpErrorMessages[res.status]
  const wpMessage = wpErrorMessages[data.code]

  setError(wpMessage || statusMessage || 'خطای ناشناس رخ داده 🤔')
  setLoading(false)
  return
}
    router.push('/dashboard')
  }

  return (
    <div className='font-irsans'>
      <Header />
       <div className='pt-40 '>
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-800 p-6 rounded-xl max-w-md mx-auto shadow-xl space-y-5 text-white">
      <h2 className="text-3xl font-bold text-center">ورود به قلعه‌ی پادشاهی 👑</h2>

      <div>
        <label htmlFor="username" className="block mb-1">نام کاربری</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          value={formdata.username}
          className="w-full p-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="سلطان عزیز..."
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1">رمز عبور</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formdata.password}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="رمز سلطنتی"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-2 text-gray-700 text-sm"
          >
            
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-300 text-sm font-medium text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
      >
        {loading ? 'در حال ورود به دربار...' : 'ورود'}
      </button>

      <div className="text-center mt-4 space-y-2">
        <p>
      <Link href="/forgot-password" className="text-sm text-blue-200 hover:underline mt-2 block">
        رمزتو فراموش کردی؟
      </Link>        </p>
        <p>
          هنوز عضو نیستی؟  
          <a href="/signup" className="underline text-yellow-300 hover:text-yellow-400">  ثبت‌نام کن</a>
        </p>
      </div>
    </form>
    </div>
    </div>
  )
}
