'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'خانه', href: '/dashboard', icon: HomeIcon },
  { label: 'پروفایل', href: '/dashboard/profile', icon: UserCircleIcon },
  { label: 'تنظیمات', href: '/dashboard/settings', icon: Cog6ToothIcon },
  { label: 'خروج', href: '/logout', icon: ArrowRightOnRectangleIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col justify-between p-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8">داشبورد</h2>
        <nav className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`group flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <footer className="text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Gholly Inc.
      </footer>
    </aside>
  );
}
