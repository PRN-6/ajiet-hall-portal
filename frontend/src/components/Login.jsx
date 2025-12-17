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
    // Using direct API URL to avoid any environment variable issues
    const API_URL = 'https://collage-hall-backend-production.up.railway.app/api';
    
    try {
      console.log('Attempting login with data:', data);
      console.log('API URL:', `${API_URL}/auth/login`);
      
      const res = await axios.post(
        `${API_URL}/auth/login`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('Login response:', res.data);
      
      if (res.data && res.data.success) {
        alert("Login successful!");
        navigate('/book');
      } else {
        alert(res.data?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data?.message || `Error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        alert('Error: ' + error.message);
      }
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