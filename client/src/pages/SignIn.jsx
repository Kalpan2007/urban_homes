import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice"
import OAuth from '../components/OAuth';

const SignIn = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);

  const changeHandler = (event) =>{
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  };


  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      dispatch(signInStart());
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        console.log(data);
        return;
      }
      navigate('/');
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  
  return (
    <div className='text-white bg-[#F1F5F1] fixed h-screen overflow-hidden w-screen flex justify-center  bg-cover bg-no-repeat py-20'>
      
      <div className="bg-s1ate-800 border border-s1ate-400 rounded-md px-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 relative py-2 h-[450px]">

      <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl text-black text-center font-semibold my-9'>Sign In</h1>

      <form onSubmit={submitHandler} className='flex flex-col gap-4 w-[450px]'>

        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={changeHandler}/>

        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={changeHandler}/>

        <button disabled={loading} className='bg-black font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p className='text-black'>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700 font-bold'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error} </p>}
    </div>

      </div>
    </div>
  )
}

export default SignIn
