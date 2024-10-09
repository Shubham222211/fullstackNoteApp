const express=require('express')
const jwt=require('jsonwebtoken')
const userModel = require('./userModel')
const userRouter=express.Router()
const bcrypt=require('bcrypt')

userRouter.post('/register',async(req,res)=>{

    try {
        
        bcrypt.hash(req.body.password, 3, async function(err, hash) {
            
            if(err){
                return res.status(400).json({msg:'error'})
            }

            req.body.password=hash
            
            const signData=await userModel.create(req.body)

            res.status(200).json({msg:"user register success"})

        });
    } catch (error) {
        res.status(400).json({msg:'error in register'})
        console.log(error)
    }
})



userRouter.post("/login",async(req,res)=>{

    try {
        const loginData=await userModel.findOne({email:req.body.email})

        if(!loginData){
            return res.status(400).json({msg:'user NOT FOUND'})
        }

        const isChceck=await bcrypt.compare(req.body.password, loginData.password)

        if(!isChceck){
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId:loginData._id }, process.env.SECRET_KEY);

        res.status(200).json({msg:'Login success',token})
    } catch (error) {
        console.log("Login error:", error);
    res.status(500).json({ msg: 'Error in login' });
    }
})










module.exports=userRouter