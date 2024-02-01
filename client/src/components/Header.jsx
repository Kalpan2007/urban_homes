import React from 'react';
import {FaSearch} from "react-icons/fa"
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector( state => state.user);
  return (
    <header className='bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <div className=''>
                    <img src='https://urban-homes.s3.ap-south-1.amazonaws.com/logo+3.png'
                    className='h-[30px] w-[120px]'></img>
                </div>
            </Link>

            <form className='bg-slate-100 p-3 rounded-lg flex items-center w-30 sm:w-64'>
                <input type='text' placeholder='search...' className='bg-transparent focus:outline-none'></input>
                <FaSearch className='text-slate-600' />
            </form>

            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/sign-in'>
                    {
                        currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'></img>
                        ) : (
                            <li className=' text-slate-700 hover:underline'>Sign in</li>
                        )
                    }
                </Link>
            </ul>
        </div>
    </header>
  )
}
