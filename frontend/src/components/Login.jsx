import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()

    const {
      register,
      handleSubmit,
      formState: {errors},
    } =  useForm()

  const onSubmit = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://collage-hall-backend-production.up.railway.app/api';
    try{
        const res = await axios.post(`${API_URL}/auth/login`,
          data,
          {
        withCredentials: true, // Important for sending cookies
        headers: {
          'Content-Type': 'application/json',
        }
      }
        )
        console.log(res.data)
        alert("login succesfull") 

        navigate('/book')

      }catch(error){
        console.log(error)
      }
  
  }



  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-8 rounded-lg w-80'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
          {...register("email",{required:"Email is required"})}
            className='border rounded-lg w-full py-2 px-3'
            id="email"
            type="email"
            placeholder='Email'
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            {...register("password", {required:"Password is required"})}
            className='border rounded-lg w-full py-2 px-3'
            id="password"
            type="password"
            placeholder='***********'
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-4xl w-full'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login