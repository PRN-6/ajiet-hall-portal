import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className='flex items-center justify-between p-5'>
      <div>
        <h1 className='font-bold text-2xl'>Hall Booking Portal</h1>  {/* Made title bigger too */}
      </div>
      <div className='bg-blue-700 text-white rounded-3xl px-8 py-4 shadow-lg hover:bg-blue-800 '>  {/* Big button with hover effect */}
        <Link to="/login"> 
          <h3 className='text-xl font-semibold m-0'>Login</h3>  {/* Larger text, no margin */}
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
