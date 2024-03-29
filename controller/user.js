const User=require("../model/user")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const signup=async(req,res)=>{
    try {
        const user=new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            mobileno:req.body.mobileno,
        })
        user.password=await bcrypt.hash(user.password,10)
        const user1=await user.save()
        res.send("Signup Successful");
    } catch (error) {
        res.status(500).send(error)
    }
}

const log= async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password

        const user=await User.findOne({email:email})
        if(user){
            const validpassword= await bcrypt.compare(password, user.password)
            if(validpassword){
                const token=jwt.sign({_id:user._id},process.env.TOKEN_KEY,{expiresIn: "1h"})
                res.json({token,user});
                
            }else{
                return res.send("Incorrect")
            }
        }
        else{
            return res.status(201).send("User not found")
        }

    }
    catch(error){
        res.status(500).send(error)
    }
}
module.exports={
    signup,
    log
}