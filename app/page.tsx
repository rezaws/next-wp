import Image from 'next/image'
import React from 'react'
import Header from './components/header'
import Search from './components/search'
import CategoryGrid from './components/JobCategoryGrid'
import Packages from './packages/page'
import LatestPosts from './components/latestPosts'
import AdsComp from './components/ads'

export default function home() {
  return (
    <>
    <Header />
    <div className='relative w-screen h-screen'>
      <Image src={'/img/purple.jpg'} 
            alt={'cat'}
            fill
            className='object-cover'      
            priority
            />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
          <Search />
    </div>

    <div>
      <CategoryGrid />
    </div>
    <div>
      <LatestPosts />
    </div>
    <div>
      <Packages />
    </div>
    <div>
      <AdsComp />
    </div>
    </>
  )
}
