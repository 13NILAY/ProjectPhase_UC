const jwt=require('jsonwebtoken')
const user = require('../model/user')

const authenticatetoken=(req,res,next)=>{
    try {
        const authHeader= req.headers['authorization']
        const token= authHeader && authHeader.split(' ')[1]
        console.log(token);
        if(token== null){
            return res.status(401)
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);
        req.user = decodedToken.email;
        next();
        
        
    } catch (error) {
        return res.status(400).send(error)
        
    }
}
module.exports=authenticatetoken