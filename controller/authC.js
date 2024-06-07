const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User = require("../model/user")
const Tailor=require("../model/tailor");
require('dotenv').config();

const handleRefreshTokenUser = async (req, res) => {
    const cookies = req.cookies;
  
    if (!req.cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    
    const foundUser = await User.findOne({ refreshToken });

 
    
      // evaluate jwt
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    
           const accessToken = jwt.sign(
            {
              UserInfo: {
                email: decoded.email,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60s" } //1h
          );
    
          const newRefreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1y" } //30d
          );
          // Saving refreshToken with current user
          foundUser.refreshToken =  newRefreshToken;
          const result = await foundUser.save();
    
          // Creates Secure Cookie with refresh token
          res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
          });
    
          res.json({ accessToken, success: true });
        }
      );
}

const handleRefreshTokenTailor = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    
    try {
        const foundTailor = await Tailor.findOne({ refreshToken: refreshToken });
        if (!foundTailor) {
            return res.sendStatus(403); // Forbidden
        }
        // Evaluate JWT
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
            if (err || foundTailor._id.toHexString() !== decoded._id){
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                { _id: decoded._id },
                process.env.ACCESS_TOKEN_KEY,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Error finding user with refresh token', error);
        res.sendStatus(500); // Server error
    }
}


module.exports = { handleRefreshTokenUser ,handleRefreshTokenTailor};
