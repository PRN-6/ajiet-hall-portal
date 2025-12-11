import React from 'react'
import {useForm} from 'react-hook-form'

const Login = () => {
    const {
      register,
      handleSubmit,
      formState: {errors},
    } =  useForm()

  const onSubmit = (data) => {
    console.log("Login Data",data)
    //need to add the feature to send the data to my backend using axios
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