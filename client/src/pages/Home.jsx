import React from 'react'

export default function Home() {
  return (
    <div className='max-w-6xl mx-auto flex'>
      <div className='flex flex-col justify-center'>
        <h2 className='font-bold text-wrap text-xxl'>Find your next <span>perfect</span><br></br>
            place with ease
        </h2>
        <p>
        Urban Homes will help you find your home fast, easy and comfortable.<br/>
        Our expert support are always available,
        </p>
        <button>Let's Start now...</button>
      </div>

      <div>
        <img src='https://urban-homes.s3.ap-south-1.amazonaws.com/Smart+home+system+in+the+room.png'></img>
      </div>
    </div>
  )
}
