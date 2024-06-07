const mongoose = require('mongoose');
const validator = require('validator');
const Schema=mongoose.Schema 

const tailorSchema = new Schema({
    Dress:{
        type:Number
    },
    Skirt:{
        type:Number
    },
    Blouse:{
        type:Number
    },
    Pants:{
        type:Number
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v); 
            },
            message: "Please enter a valid email"
        },
    },
    mobileno: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: "{VALUE} is not a valid phone number!"
        },
    },
    serviceTypes: {
        type: [String],
        required: true,
    },
    experienceYears: {
        type: Number,
        required: true,
    },
    portfolioUrl: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /^(http|https):\/\/[^ "]+$/.test(v);
        //     },
        //     message: "Please enter a valid URL"
        // },
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    // outfitType:[
    //         {
    //             name:{
    //                 type:String
    //             },
    //             price:{
    //                 type:Number
    //             }
                
    //         }
    // ],

    location: {
        type: String,
        required: true,
        trim: true,
    },
    productPriceRange: {
        type: String, 
        required: true,
    },
    portfolioPhotos: [{
        type: String, 
        required: false, 
    }],
    skills: {
        fabric: [String],
        clothingType: [String],
    },
    refreshToken:{
        type:String,
    },
    averageRating:{
        type:Number,
    }
}, {
    timestamps: true,
});

module.exports= mongoose.model('Tailor', tailorSchema);
