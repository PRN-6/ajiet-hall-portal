import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { format } from 'date-fns';

const Book = () => {
  const [date, setDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      bookedBy: "AJIET Teacher"
    }
  });

  // Update form's date field when calendar date changes
  React.useEffect(() => {
    if (date) {
      setValue('date', format(date, 'yyyy-MM-dd'));
    }
  }, [date, setValue]);

  const onSubmit = async (formData) => {
    if (!date) {
      alert('Please select a date');
      return;
    }

    const bookingData = {
      ...formData,
      date: format(date, 'yyyy-MM-dd'),
    };

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/book",
        bookingData,
        {
          withCredentials: true,
          headers:{
            'Content-Type' : 'application/json'
          }
        }
      );
      console.log(res.data)
      alert('Booking successful!');
      // Reset form or redirect
    } catch (error) {
      console.error('Booking failed:', error);
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-200">
      <div className='w-1/2 flex flex-col items-center'>
        <div className="mb-8">
          <h2 className='text-2xl font-bold mb-4 text-center'>Select a Date</h2>
          <Calendar 
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-4xl border shadow-lg mt-12 [--cell-size:--spacing(20)] "
            disabled={(date) => {
              // Disable past dates
              return date < new Date(new Date().setHours(0, 0, 0, 0));
            }}
          />
        </div>
      </div>
      
      <div className='w-1/2 bg-white rounded-2xl shadow-lg p-8 ml-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Book the Hall</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title *
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Enter event title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Describe your event"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* Selected Date Display */}
          <div>
            <p className="text-sm font-medium text-gray-700">Selected Date</p>
            <div className="mt-1 p-2 bg-gray-100 rounded-md">
              {date ? format(date, 'PPPP') : 'No date selected'}
            </div>
            <input type="hidden" {...register('date', { required: true })} />
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time *
              </label>
              <input
                {...register('startTime', { required: 'Start time is required' })}
                type="time"
                id="startTime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>}
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                End Time *
              </label>
              <input
                {...register('endTime', { 
                  required: 'End time is required',
                  validate: (value) => {
                    const startTime = watch('startTime');
                    if (startTime && value <= startTime) {
                      return 'End time must be after start time';
                    }
                    return true;
                  }
                })}
                type="time"
                id="endTime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>}
            </div>
          </div>

          {/* Booked By */}
          <div>
            <label htmlFor="bookedBy" className="block text-sm font-medium text-gray-700">
              Booked By
            </label>
            <input
              {...register('bookedBy')}
              type="text"
              id="bookedBy"
              defaultValue="AJIET Teacher"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
      {/* <div className='w-1/2'>
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
      </div> */}
    </div>
  );
};

export default Book;
