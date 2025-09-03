'use client'

import Header from '../components/header'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const [formdata, setFormdata] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormdata(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    })

    const data = await res.json()

    if (res.status === 409) {
      setError('این ایمیل قبلاً وارد سلطنت شده! ... برو به ورود')
      setLoading(false)
      return
    }

    if (!res.ok) {
      setError(data.error || 'ثبت‌نام ناموفق بود 😔')
      setLoading(false)
      return
    }

    // ورود خودکار
    const loginRes = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    })

    if (loginRes.ok) {
      router.push('/dashboard')
    } else {
      setError('ثبت‌نام موفق بود، اما ورود شکست خورد!')
    }

    setLoading(false)
  }

  return (
    <div className="pt-40">
    <Header />
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-green-800 via-emerald-700 to-teal-700 p-6 rounded-xl max-w-md mx-auto shadow-xl space-y-5 text-white">
      <h2 className="text-3xl font-bold text-center">ثبت‌لقب سلطنتی 👑</h2>

      <div>
        <label htmlFor="username" className="block mb-1">نام کاربری</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          value={formdata.username}
          className="w-full p-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="لقب سلطنتی‌ات..."
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">ایمیل سلطنتی</label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          value={formdata.email}
          className="w-full p-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="ایمیل معتبر..."
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1">رمز ورود به قلعه</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formdata.password}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="رمز سلطنتی‌ات..."
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
        {loading ? 'در حال صدور لقب...' : 'ثبت‌نام'}
      </button>

      <div className="text-center mt-4 space-y-2">
        <p>
          از قبل سلطنت داری؟  
          <a href="/login" className="underline text-yellow-300 hover:text-yellow-400">ورود به قلعه</a>
        </p>
      </div>
    </form>
</div>
  )
}
