import React from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleBookClick = () => {
    if(token){
      navigate('/book')
    }else{
      localStorage.setItem('redirectAfterLogin', '/book')
      navigate('/login')
    }
  }
  return (
    <div>
        <NavBar/>
        <div className='flex items-center pl-10  h-100  '>
            <h1 className='flex flex-col text-6xl font-black'>
              <span>COLLAGE</span> 
              <span className='text-gray-700'>Hall Booking Portal</span>
            </h1>
        </div>
            <div className=" m-8">
              <button 
                onClick={handleBookClick}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-4xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Book the Hall
              </button> 
            </div>
    </div>
  )
}

export default Home