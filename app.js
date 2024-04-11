const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config();

const port=process.env.PORT
const app=express()
app.use(express.json());
const url=process.env.URL

const dbconnect= async()=>{
    await mongoose.connect(url,{}).then(()=>{
        console.log('connected')
      }).catch((err)=>{
        console.log(err)
      })
}

const userRouter=require('./routes/user')
app.use('/user',userRouter)

const tailorRouter=require('./routes/tailor')
app.use('/tailor',tailorRouter)

const OrderRouter =require('./routes/order')
app.use('./order',OrderRouter)

const ClientRouter =require('./routes/client')
app.use('./client',ClientRouter)

app.listen(port,()=>{
    console.log("Running on port")
    dbconnect();
})


