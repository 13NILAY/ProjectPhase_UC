const Tailor=require("../model/tailor"); 
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup=async(req,res)=>{
    try {
     
        const {
            username,
            password, 
            email,
            mobileno,
            serviceTypes,
            experienceYears,
            portfolioUrl,
            shopName,
            location,
            productPriceRange,
            portfolioPhotos,
            skills
        } = req.body;

    
        const hashedPassword = await bcrypt.hash(password, 10);

        const tailor = new Tailor({
            username,
            password: hashedPassword, 
            email,
            mobileno,
            serviceTypes,
            experienceYears,
            portfolioUrl,
            shopName,
            location,
            productPriceRange,
            portfolioPhotos,
            skills
        });

        await tailor.save();

  
        res.send("Signup Successful");
    } catch (error) {
      
        res.status(500).send(error);
    }
};
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        
        const tailor = await Tailor.findOne({email: email});
        if (tailor) {
            
            const validPassword = await bcrypt.compare(password, tailor.password);
            if (validPassword) {
                const token = jwt.sign({_id: tailor._id}, process.env.TOKEN_KEY, {expiresIn: "1h"});
                
                
                const tailorResponse = {...tailor._doc, password: undefined}; 
                
                res.json({token, tailor: tailorResponse});

            
                
            } else {
                return res.status(400).send("Incorrect Password");
            }
        } else {
            return res.status(404).send("Tailor not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports={
    signup,
    login
};

