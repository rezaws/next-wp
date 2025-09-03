import React from 'react'
import Link from 'next/link'

export default function header() {
  return (
    <header className='fixed bg-fuchsia-950 top-0 left-0 w-full z-50 text-white p-4'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <h1 className='font-bold text-sm sm:text-2xl flex-wrap'>
            <Link href={'/'}>
              <span className='text-rose-500'>Lavasan</span>
              <span className='text-rose-700'>Line</span>
            </Link>
          </h1>
        <ul className='flex gap-4'>
            <Link href={'/'}>
              <li className='hidden sm:inline text-pink-200 hover:underline'>Home</li>
            </Link>
            <Link href={'/login'}>
              <li className='hidden sm:inline text-pink-200 hover:underline'>Login</li>
            </Link>
            <Link href={'/signup'}>
              <li className=' text-pink-200 hover:underline'> Sign in</li>
            </Link>
        </ul>
      </div>
    </header>
  )
}
