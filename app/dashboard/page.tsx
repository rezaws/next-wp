'use client'

import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoutButton from '../components/logoutButton'
//import Ads from '../components/ads'
import AddJobButton from '../components/addJobButton';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
              console.log('USER DATA:', data) // اینو ببین
        if (data.error) {
          router.push('/login')
        } else {
          setUser(data.user)
        }
      })
  }, [])

  if (!user) return <div className="p-4">در حال بارگذاری...</div>

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
        <h2 className="text-xl font-bold mb-6"></h2>
          <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">خوش اومدی، {user.name || user.username} 👋</h1>
          <div className="flex items-center space-x-4">
       <AddJobButton />
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">آمار امروز</h3>
            <p className="text-gray-600">بازدیدها: ۱۲۳</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">کارهای انجام‌شده</h3>
            <p className="text-gray-600">۵ مورد تکمیل شده</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">پیام‌ها</h3>
            <p className="text-gray-600">۳ پیام جدید</p>
          </div>
          <div>
            <section className="p-6">
              <h2 className="text-xl font-bold mb-4">داشبورد شما</h2>
                <AddJobButton />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
      