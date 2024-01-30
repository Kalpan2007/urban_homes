import React, { useState } from 'react';
import {Link} from "react-router-dom"
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const changeHandler = (event) =>{
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  };


  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
  
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        console.log(data);
        return;
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={changeHandler}/>

        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={changeHandler}/>

        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={changeHandler}/>

        <button disabled={loading} className='bg-black font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700 font-medium'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error} </p>}
    </div>
  )
}
