import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

//POST /login
router.post("/login" , async (req, res) => {

    //store what the user passed
    const{email,password} = req.body

    //compare with the env value
    if(
        email === process.env.TEACHER_EMAIL &&
        password === process.env.TEACHER_PASSWORD 
    ){
        //creating a jwt token
        const token = jwt.sign({role:"teacher"}, process.env.JWT_SECRET,{
            expiresIn:'1d',
        })

        //displaying
        return res.json({
            msg: "Login succesfully",
            token,
            role: "teacher",
        })
    }
    
    return res.status(400).json({msg:"Invalid credentials"})
})


export default router