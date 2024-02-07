import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserListing = () => {
  const { currentUser } = useSelector(state => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data); // Update userListings state with fetched data
      } catch (error) {
        console.error(error);
        setShowListingsError(true);
      }
    };

    if (currentUser?._id) {
      fetchData();
    }
  }, [currentUser._id]);

  const deleteListingHandler = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings(prevListings =>
        prevListings.filter(listing => listing._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold mb-7'>
            Your Listings
          </h1>

        <div className=" flex gap-4 max-w-">

          {userListings.map(listing => (
            <div
              key={listing._id}
              className=' bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />
              </Link>
              <Link
                className='truncate text-xl font-semibold text-slate-700'
                to={`/listing/${listing._id}`}
              >
                <p className='mt-4 ml-4 '>{listing.name}</p>
              </Link>

              {/* <div className='ml-3 flex items-center gap-1'>
                <MdLocationOn className='h-5 w-5 text-green-700' />
                <p className='mr-3 mt-2 truncate text-lg w-full'>{listing.address}</p>
              </div> */}

            <div className=' mx-3 mt-1 flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-lg text-gray-600 truncate w-full'>
              {listing.address}
            </p>

          </div>
            <p className='text-sm mx-4 text-gray-600 line-clamp-2'>
                <span className='font-medium'>Description -</span> 
            {listing.description}
          </p>

          <p className=' mx-4 text-slate-800 mt-2 font-semibold '>
            Rs{' '}
            { listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
            {listing.type === 'sale' && ' / month'}
          </p>

              <div className=' mx-7 my-4 flex gap-7 justify-between item-center flex-wrap'>
              <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase font-semibold hover:text-green-600'>Edit</button>
                </Link>

                <button
                  onClick={() => deleteListingHandler(listing._id)}
                  className='text-red-700 uppercase font-semibold hover:text-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default UserListing;
