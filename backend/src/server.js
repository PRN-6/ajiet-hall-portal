import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import auth from './routes/auth.js'
import book from './routes/book.js'
import cors from 'cors'

//lets us use env in all our servers
dotenv.config({
    path: './.env'
});

//use the express
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//middleware
app.use(express.json())

//use the auth api in routes
// /api/auth is common
app.use("/api/auth",auth)
app.use("/api/book",book)

//To start the server
const startServer = async () => {
    try{
        //wait for the database connection
        await connectDB()

        //on the app
        app.on("error", (error) => {
            console.log("ERROR", error)
            throw error;
        })

        //listening to port
        app.listen(process.env.PORT || 6000, () => {
            console.log(`server is running on port: ${process.env.PORT}`)
        })

    }catch(error){
        console.log("MongoDB connection failed",error)
    }
}

//start the server arrow function which is function call
startServer()