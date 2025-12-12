import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { useForm } from 'react-hook-form';

const Book = () => {
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
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
      </div>
      <div className='w-1/2'>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='m-12 border-4 rounded-4xl h-160 p-10 bg-white shadow-lg' >
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
            <div className='pt-6 flex flex-col space-y-2'>
              <label htmlFor='email'>Email</label>
              <input
                {...register("email", {required:"Email is required"})}
                className="border rounded-2xl p-2 shadow-sm"
                type="email"
                id="fullName"
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className='pt-6 flex flex-col space-y-2'>
                <label htmlFor="eventType">Event Type</label>
                <select
                  {...register("eventType", {requied:"Event type is required"})}
                  className="border rounded-2xl p-2 shadow-sm"
                  id="eventType"
                  defaultValue=""
                >
                <option value="" disabled>Select Event Type</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshow</option>
                <option value="meeting">Meeting</option>
                <option value="seminar">Seminar</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="startTime">Start Time</label>
                <input
                  {...register("startTime", { 
                    required: "Start time is required",
                    validate: {
                      futureTime: (value) => {
                        const selectedTime = new Date(`2000-01-01T${value}`);
                        const now = new Date();
                        const currentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
                        return selectedTime > currentTime || "Start time must be in the future";
                      }
                    }
                  })}
                  className="border rounded-2xl p-2 shadow-sm"
                  type="time"
                  id="startTime"
                />
                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="endTime">End Time</label>
                <input
                  {...register("endTime", { 
                    required: "End time is required",
                    validate: {
                      afterStart: (value, { startTime }) => {
                        if (!startTime) return true; // Let required handle empty case
                        return value > startTime || "End time must be after start time";
                      }
                    }
                  })}
                  className="border rounded-2xl p-2 shadow-sm"
                  type="time"
                  id="endTime"
                />
                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
              </div>
            </div>
            <div className='pt-8'>
                <button
                type="submit"
                className='bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600'
                >
                  Book Slot
                </button>
            </div>
          </div> 
      </form>
      </div>
    </div>
  );
};

export default Book;
