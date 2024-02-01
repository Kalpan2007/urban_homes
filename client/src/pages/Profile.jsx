import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>  
         Profile  
      </h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar}
        className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 mb-6'></img>

        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'></input>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'></input>
        <input type='text' placeholder='password' id='password' className='border p-3 rounded-lg'></input>

        <button className='text-white bg-black rounded-lg uppercase p-3 hover:opacity-95 font-bold disabled:opacity-80' >update</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 font-medium cursor-pointer'>Delete account</span>
        <span className='text-red-700 font-medium cursor-pointer'>Sign out</span>
      </div>

    </div>
  )
}
