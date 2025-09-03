'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('خطا در خروج:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-80 transition-all"
    >
      خروج از قلمرو 👋
    </button>
  )
}
