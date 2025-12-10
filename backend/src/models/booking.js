import mongoose from  'mongoose'

const bookingSchema = mongoose.Schema(
    {
        title:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        date:{
            type: String,
            require: true
        },
        startTime:{
            type: String,
            require: true
        },
        endTime:{
            type: String,
            require: true
        },
        bookedBy:{
            type: String,
            default: "AJIET Teacher"
        }
    },
        {timestamp: true}
)

const Booking = mongoose.model("Booking",bookingSchema)
export default Booking