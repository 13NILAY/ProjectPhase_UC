const Tailor=require("../model/tailor"); 
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup=async(req,res)=>{
    try {
        console.log(req.body);
        const tailor=new Tailor({
            username:req.body.username,
            password:req.body.password, 
            email:req.body.email,
            mobileno:req.body.mobileno,
            serviceTypes:req.body.serviceTypes,
            experienceYears:req.body.experienceYears,
            portfolioUrl:req.body.portfolioUrl,
            shopName:req.body.shopName,
            location:req.body.location,
            // portfolioPhotos:req.body.portfolioPhotos,
            productPriceRange:req.body.productPriceRange,
            skills:req.body.skills
        } );

    
         tailor.password=await bcrypt.hash(tailor.password, 10);

        console.log(tailor);
        const savedData=await tailor.save();
            console.log(savedData);
  
        res.status(200).json({
            success:true
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};
const getTailorByEmail = async (req, res) => {
    try {
        console.log(req.body.email);
        const tailor = await Tailor.findOne({email:req.body.email});
        if (tailor === null) {
            return res.status(404).json({ message: 'Tailor not found' });
        }
        res.json(tailor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const tailor = await Tailor.findOne({email: email});
        console.log(tailor);
        if (tailor) {
            
            const validPassword = await bcrypt.compare(password, tailor.password);
            if (validPassword) {
                const accessToken=jwt.sign(
                    {email:tailor.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:"1d"}
                );
                const refreshToken =jwt.sign(
                    {email:tailor.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: "1y"}
                )
                //Saving refresh Token with current tailor

                const t1=await Tailor.findByIdAndUpdate(tailor._id,{refreshToken:refreshToken})
                console.log(t1);
                const t2 =await Tailor.findById(tailor._id);
                res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000});
                res.json({accessToken,t2});

            } else {
                return res.status(400).send("Incorrect Password");
            }
        } else {
            return res.status(404).send("Tailor not found");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


module.exports={
    signup,
    login,
    getTailorByEmail
};

