const mongoose=require('mongoose');
const Schema=mongoose.Schema

const orderSchema=new Schema({
    outfit_type:{
        type:String,
        enum:["Dress","Blouse","Skirt","Pants","Other"],
        required:true,
    },
    type:{
        type:String,
        enum:["Stitchng","Alteration"],
        required:true
    },
    height:{
        type:Number
    },
    width:{
        type:Number
    },
    instructions:{
        type:String
    },
    urgent:{
        type:Boolean
    },
    delivery_date:{
        type:Date
    },
    trial_date:{
        type:Date
    },
    cloth_images:{
        type:[String]
    },
    tailor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tailor'
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    // },
    user_name:{
        type:String
    },
    address:{
        type:String
    },
    total_amount: {
        type: Number,
        required: true
    },
    advance_amount: {
        type: Number,
        required: true
    },
    balance_due: {
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('Order',orderSchema)