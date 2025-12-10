import express from "express"

const router = express.Router()


router.post("/login" , async (req, res) => {
    res.status(200).send("for login auth")
})


export default router