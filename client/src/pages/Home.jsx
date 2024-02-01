import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='scrolling-sign overflow-y-hidden'>
    
      <div className='flex gap-6 max-w-8xl max-auto'>
        <div className='flex flex-col gap-6 py-28 px-[150px] '>
          <h1 className='text-black text-3xl font-bold lg: text-5xl'>
            Find your next <span className='text-[#161A76]'>perfect</span><br/>
            place with ease
          </h1>
          <div className='text-black text-xs sm:text-sm'>
            Urban Homes will help you find your next perfect place to live, 
            <br/>easy and comfortable.
          <br/> Our expert support are always available

          </div>

          <Link to="/search" className='text-xs sm:text-sm text-[#161A76] font-bold hover:underline'>
            let's get started...
          </Link>
        </div>
        

        <div>
          <img className='' src='https://urban-homes.s3.ap-south-1.amazonaws.com/Smart+home+system+in+the+room.png'></img>
        </div>
      </div>

      <img className='w-full h-[800px]' src='https://urban-homes.s3.ap-south-1.amazonaws.com/full-image.png'></img>
    </div>
  )
}
