const jwt=require("jsonwebtoken");
const User=require("./../Model/userModel")
const signToken=id=>{
    return jwt.sign({
        id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN}
    
)
}
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    // Ensure JWT_COOKIE_EXPIRES_IN is a number
    const expiryInMillis = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000;
    
    if (isNaN(expiryInMillis)) {
      return res.status(500).json({
        status: 'fail',
        message: 'Invalid JWT_COOKIE_EXPIRES_IN value'
      });
    }
  
    // Log the expiry value to ensure it's valid
    console.log('Expiry in milliseconds:', expiryInMillis);
  
    const cookieOptions = {
      expires: new Date(Date.now() + expiryInMillis),
      httpOnly: true
    };
    console.log(token);

    // Set the JWT token as a cookie
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from the user object before sending to the client
    user.password = undefined;
  
    // Send the response
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

exports.signup=(async (req,res)=>{
    const user=await User.create({
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        name:{firstname:req.body.firstname,lastname:req.body.lastname}
    })
    if(!user){
        return res.status(400).json({
            status:"fail",
            Error:"please write your information for signing up"
        })
    }
    const token=signToken(user._id);
    
    res.status(201).json({
        status:"success",

        token:token,
        data:{
            user:user
        }
    })
})
exports.login=(async (req,res)=>{
    const{email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({
            status:"fail",
            Error:"please write your email and password"
        })
    }
    const user=await User.findOne({email}).select("+password");
    const correct=await user.correctPassword(password,user.password);

    if(!user||!correct){
        return res.status(401).json({
            status:"fail",
            Error:"incorrect email or password"
        })
    }
    const token=signToken(user._id);
    // res.status(201).json({
    //     status:'success',
    //     token: token,
    //     data:{
    //         user:user
    //     }
    // })
    createSendToken(user,200,res);

})