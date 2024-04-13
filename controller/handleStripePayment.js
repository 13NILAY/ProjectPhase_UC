const asyncHandler = require('express-async-handler');
const { calculateNextBillingDate } = require('../utils/calculateNextBillingDate');
const Payment = require('../models/Payment');
const User = require('../model/user');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);

const handleStripePayment = asyncHandler(async (req, res) => {
    const {amount,subscriptionPlan}=req.body;
 
    const user = req?.user;
    try {
       
        const paymentIntent = await stripe.paymentIntents.create({
            amount : Number(amount)*100,
            currency:'usd', 
            metadata:{
                userId:user?._id?.toString(),
                userEmail:user?.email,
                subscriptionPlan,
            },
        });

    res.json({
        clientSecret:paymentIntent?.client_secret,
        paymentIntentId:paymentIntent?.id,
        metadata:paymentIntent?.metadata,
    
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
})

const verifyPayment = asyncHandler(async (req, res) => {
    const {paymentIntentId}=req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log(paymentIntent);
        if(paymentIntent?.status==="succeeded")
        {
       
           const metadata = paymentIntent?.metadata;
           const subscriptionPlan = metadata?.subscriptionPlan;
           const userEmail = metadata?.userEmail;
           const userId = metadata?.userId;
         
           const userFound= await User.findById(userId);
           if(!userFound)
           {
               return res.status(404).json({message:"User not found"});
           }
          
           const amount = paymentIntent?.amount/100;
           const currency = paymentIntent?.currency;
           const paymentIntentId = paymentIntent?.id;
    
           const newPayment = await Payment.create({
            user:userId,
            email:userEmail,
            subscriptionPlan,
            amount,
            currency,
            status:paymentIntent?.status,
            reference:paymentIntentId,
           })
        
           if(subscriptionPlan==='Basic')
           {
                const updatedUser = await User.findByIdAndUpdate(userId,{ 
                    subscriptionPlan,
                    monthlyRequestCount:50,
                    apiRequestCount:0,
                    nextBillingDate:calculateNextBillingDate(),
                    trialPeriod:0,
                    $addToSet:{payments:newPayment?._id},
                    subscriptionPlan:'Basic'
                });
                res.json({status:true,message:"Payment has been verified successfully",updatedUser});
           }
           if(subscriptionPlan==='Premium')
           {
                const updatedUser = await User.findByIdAndUpdate(userId,{ 
                    subscriptionPlan,
                    monthlyRequestCount:100,
                    apiRequestCount:0,
                    nextBillingDate:calculateNextBillingDate(),
                    trialPeriod:0,
                    $addToSet:{payments:newPayment?._id},
                    subscriptionPlan:'Premium'
                });
                res.json({status:true,message:"Payment has been verified successfully",updatedUser});
           }
        //  res.json({status:true,message:"Payment has been verified successfully",updatedUser});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
})




module.exports = { handleStripePayment,verifyPayment };