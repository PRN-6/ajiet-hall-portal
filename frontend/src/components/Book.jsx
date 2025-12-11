import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { useForm } from 'react-hook-form';

const Book = () => {
  const [date, setDate] = useState(new Date());

  const {
    register,
    handlesubmit,
    formState: {errors},
  } = useForm()

  const onSubmit = async(data) => {
    //need to add the feature to send the data to backend using axios
    try{
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      )
      //save token
      localStroage.setItem("token",res.data.token)

      alert("login succesfull") 
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className=" flex min-h-screen p-8 bg-gray-200">
      <div className='w-1/2 flex flex-col items-center'>
        <div className="">
          <Calendar 
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-4xl border shadow-lg mt-12 [--cell-size:--spacing(20)] "
          />
        </div>
        <div className=''>
          <h1>
            Book the hall
          </h1>
        </div>
      </div>
      <div className='w-1/2'>
      <form>
          <div className='m-12 border-4 rounded-4xl h-150 p-10 bg-white shadow-lg' >
            <h3 className="text-2xl font-bold ">
              Book Your Slot
            </h3>
            <div className='pt-6 flex flex-col space-y-2'>
              <label  htmlFor='fullName '>Full Name</label>
              <input 
              {...register("fullName",{required:"Full name is required"})}
              className='border rounded-2xl p-2 shadow-sm'
              type="text" 
              id="fullName"
              placeholder='Full Name'
              />
              {errors.fullName && <p>{errors.fullName.message}</p>}
            </div>
          </div> 
      </form>
      </div>
    </div>
  );
};

export default Book;