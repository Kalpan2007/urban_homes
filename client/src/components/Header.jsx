import "./Header.css"
import React, { useEffect, useState } from 'react';
import {FaSearch} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'
import { BiMessageSquareAdd } from "react-icons/bi";
export default function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const {currentUser} = useSelector( state => state.user);


    const submitHandler = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);
      
  return (
    <header className='bg-white shadow-md'>
        <div className=''>

        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <div className=''>
                    <img src='https://urban-homes.s3.ap-south-1.amazonaws.com/logo+3.png'
                    className='h-[30px] w-[120px]'></img>
                </div>
            </Link>

            <form onSubmit={submitHandler} 
            className='bg-slate-100 p-2 rounded-lg flex items-center  w-40 sm:w-64'>
                <input type='text' placeholder='search...' 
                 onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent focus:outline-none'></input>
                <button type='submit'>
                <FaSearch className='text-slate-600' />
                </button>
            </form>

            <ul className='flex gap-4 mt-3 flex-wrap'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                
                <Link to='/profile'>
                    {
                        currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'></img>
                        ) : (
                            <li className=' text-slate-700 hover:underline'>Sign in</li>
                        )
                    }
                </Link>


                {/* <div className="ml-10 h-10 w-10 mt-1">
                <BiMessageSquareAdd />
            </div> */}
            </ul>
        </div>
        </div>
    </header>
  )
}
