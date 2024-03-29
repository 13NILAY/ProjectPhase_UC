const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config();

const port=process.env.PORT
const app=express()
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

app.listen(port,()=>{
    console.log("Running on port")
    dbconnect();
})


