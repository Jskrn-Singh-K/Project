const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"A name should be assigned to product"]
        },
        price:{
            type:Number,
            required:[true,"A price should be assigned to product"]
        },
        salePrice:{
            type:Number,
            required:[true,"A sale Price must be defined"]
        },
        size:{
            type:[String],
            required:[true,"A size must be assign"]
        },
        brand:{
            type:String,
            required:[true,"A brand should be assigned to product"]
        },
        careGuide:{
            type:String,
            required:[true,"A care Guide should be assigned to product"]
        },
        color:{
            type:String,
            required:[true,"A color should be assigned to product"]
        },
        description:{
            type:String,
            required:[true,"A description should be assigned to product"]
        } ,
        material:{
            type:[String],
            required:[true,"a material should be defined"]
        },
        category: {  type:String,
            required:[true,"A category should be assigned to product"]},
        image: {  type:[String], 
            required:[true,"A image should be assigned to product"]},
        rating: {
            
            rate: {type:Number,
                min:[1,"Rate atleast be 1"],
                max:[5,"Rate atmost be 5"],
                required:[true,"A rating should be assigned to product"],
            },
            count:{type:Number,
                max:[3]
            }
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        display:{
            type:String,
            enum:["homeDisplay,isFeatued"],
        },
        salesCount:{
            type:Number
        },
        stock: { type: Number, default: 0 },
        viewsCount: { type: Number, default: 0 },
        IsFeatured:Boolean
        }
)

const Product=mongoose.model('Product',productSchema);

module.exports=Product;