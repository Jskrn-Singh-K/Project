const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'product',
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    comment:{
        type:String,
        maxlength:1000
    },
    image:String,   
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const reveiw=mongoose.model('Reveiw',reviewSchema);
module.exports=reveiw;

