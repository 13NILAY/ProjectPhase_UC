const User=require("../model/user")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const signup=async(req,res)=>{
    try {
        console.log(req.body);
        const user=new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            mobileno:req.body.mobileno
        })
        user.password=await bcrypt.hash(user.password,10)
        const savedUserData=await user.save();
        console.log(savedUserData);
        res.status(200).json({
            success:true
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

const log= async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password

        const user=await User.findOne({email:email})
        console.log(user);
        if(user){
            const validpassword= await bcrypt.compare(password, user.password)
            console.log(validpassword);
            if(validpassword){
                const accessToken=jwt.sign(
                    {email:user.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: "1d"}
                );
                const refreshToken =jwt.sign(
                    {email:user.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: "1y"}
                )
                //Saving refresh Token with current user
                const u1= await User.findByIdAndUpdate(user._id,{refreshToken:refreshToken})
                console.log(u1);
                const u2=await User.findByIdAndUpdate(user._id);
                res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000});
                res.json({accessToken,u2});
                
            }else{
                return res.send("Incorrect")
            }
        }
        else{
            return res.status(404).send("User not found")
        }

    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
}

const getuser=async(req,res)=>{
    try {
        const user=await User.find()
        console.log(user);
        
        res.json(user)
    } catch (error) {
        res.send("Error while fetching users")
    }
}
const deluser=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        const u1=await user.deleteOne()
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send("Error in deleting user")
    }
}
const updateuser=async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(req.user._id,req.body,{ new: true })
        res.send("Update done")
    } catch (error) {
        res.status(500).send("Upadation not done")
    }
}
module.exports={
    signup,
    log,getuser,deluser,updateuser
}