'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function search() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return
    // هدایت به صفحه نتایج
    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="absolute inset-0 flex items-center justify-center pt-60 z-40">
        <div className="relative w-[300px] md:w-[800px]">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="دنبال چی میگردی ...."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-gray-200 placeholder-white-500 shadow-lg focus:outline-none focus:ring-1 focus:ring-blue-800 transition"
            />
            <button type='submit'>
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </button>
        </div>
    </form>
  )
}
