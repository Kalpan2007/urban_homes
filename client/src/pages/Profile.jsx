import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector(state => state.user);
  const [file,setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [FormData,setFormData] = useState({});
  console.log(FormData);

  console.log(file);

  // firebase Storage
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  function handleFileUpload(file){
    const storage = getStorage(app);
    const fileName =new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        setFilePercentage(Math.round(progress));
        console.log("file progess is"+ progress + "% done");
      },
      (error) =>{
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadUrl) => {
            setFormData({...FormData, avatar: downloadUrl});
          }
        )
      }
    )
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>  
         Profile  
      </h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(event)=> setFile(event.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'>

        </input>
        <img onClick={() => fileRef.current.click()} src={FormData.avatar ||currentUser.avatar}
        className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 mb-6'></img>

          <p className='self-center text-sm font-medium'>
            { 
              fileUploadError ? <span className='text-red-500'>Error Image upload (image must be less then 2 MB)</span> :
              filePercentage>0 && filePercentage < 100 ?
              <span className='text-slate-700'> {`Image uploading ${filePercentage} %`}</span> :
              filePercentage ===100 ? <span className='text-green-700'>
                Image successfully uploaded !
              </span> :
              ""         
            }
          </p>

        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'></input>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'></input>
        <input type='text' placeholder='password' id='password' className='border p-3 rounded-lg'></input>

        <button className='text-white bg-black rounded-lg uppercase p-3 hover:opacity-95 font-bold disabled:opacity-80' >update</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-600 font-medium cursor-pointer'>Delete account</span>
        <span className='text-red-600 font-medium cursor-pointer'>Sign out</span>
      </div>

    </div>
  )
}
