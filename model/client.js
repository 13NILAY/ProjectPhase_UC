const mongoose=require('mongoose');
const Schema=mongoose.Schema

const clientSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    phoneno:{
        type:Number,
        unique:true,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    pic:{
        type:[String]
    }
});

module.exports=mongoose.model('Client',clientSchema)