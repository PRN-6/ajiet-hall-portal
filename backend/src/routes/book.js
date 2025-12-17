import express from 'express'
import Booking from '../models/booking.js'
const router = express.Router()

//POST /book
router.post('/book', async(req,res) => {
    try{
        const{title,description,date,startTime,endTime,bookedBy} = req.body;

        //validating what user has sent the data
        if(!title || !description || !date || !startTime || !endTime){
            return res.status(400).json({message: 'Please fill in all required fields'})
        }

        //check for existing booking on the same date
        const existingBooking = await Booking.findOne({
            date : date,
        })
        if(existingBooking){
            return res.status(400).json({
                message: `The hall is already booked on ${existingBooking.date}`
            })
        }

        //create new booking
        const newBooking = new Booking ({
            title,
            description,
            date,
            startTime,
            endTime,
            bookedBy: bookedBy || 'AJIET Teacher'
        })

        //saving to the database
        const savedBooking = await newBooking.save();

        //send the success response
        res.status(201).json({
            message: 'Booking successfully',
            booking: savedBooking
        })
    }catch(error){
        console.error('Error creating booking:',error)
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message
        })
    }
})



export default router