// app/search/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    }

    fetchResults()
  }, [query])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">نتایج برای: {query}</h1>
      <ul className="space-y-4">
        {results.map((item: any, i: number) => (
          <li key={i}>
            <a href={item.url} className="text-blue-600 underline">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
