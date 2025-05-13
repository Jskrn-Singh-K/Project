const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const validator=require("validator");
const userSchema=new mongoose.Schema(
    {
        name: {
                firstname: String,
                lastname:String
              },
              email:{
                type:String,
                required:[true,"please provide the email address"],
                unique:true,
                lowercase:true,
                validate: {
                    validator: function (val) {
                      return validator.isEmail(val);
                    },
                    message: "Please provide a valid email"
                  }
              },
              password:{
                type:String,
                required:[true,"please provide the password"],
                minlength:8
              },
              confirmPassword:{
                type:String,
                required:[true,"Please confirm your password"]
              },
        role:{
            type:String,
            enum:["admin","user"]
        },
        shippingAddress:{
            type:String
        },
        phoneNumber:Number,
        wishlist:{
            products:[{
                    product:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Product"
                    },
                }]
        },
        orderHistory:{
            orders:[{
                    order:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Order"
                    },
                }]
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        passwordChangedAt:Date
    }
);

userSchema.pre('save',async function (next){
    if(!this.isModified("password"))return next();
    if (this.password !== this.confirmPassword) {
        return next(new Error("Passwords do not match"));
      }
    try {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword=undefined;
        next();
    } catch (err) {
        next(err);
    }
    
})

userSchema.methods.correctPassword=async function (candiatePassword,orignalPassword) {
    return await bcrypt.compare(candiatePassword,orignalPassword);
}

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");

    this.passwordResetToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.passwordResetExpires=Date.now()+100*60*1000;

    return resetToken;
}

userSchema.methods.changePasswordAfter=function(){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimeStamp<changedTimestamp
    }
    return false;
}

const User=mongoose.model('User',userSchema);

module.exports=User;